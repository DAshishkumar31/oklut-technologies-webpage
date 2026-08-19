// ============================================================================
// OKLUT AI Assistant — Supabase Edge Function (ai-chat)
// ----------------------------------------------------------------------------
// The ONLY place an AI provider API key lives. The browser never sees it.
//
// Secrets (configure in Supabase Dashboard → Edge Functions → Secrets):
//   AI_API_KEY   — required. API key for your AI provider.
//   AI_PROVIDER  — optional. "openai" (default, OpenAI-compatible) | "anthropic"
//   AI_BASE_URL  — optional. Defaults: https://api.openai.com/v1 (openai)
//                             https://api.anthropic.com    (anthropic)
//   AI_MODEL     — optional. Defaults: gpt-4o-mini (openai)
//                             claude-3-5-haiku-latest (anthropic)
//
// Deploy:
//   supabase functions deploy ai-chat --no-verify-jwt
//
// Request:
//   { "message": "hello", "history": [{ "sender": "user", "text": "..." }] }
//
// Response:
//   { "reply": "Hello! 👋 Welcome to OKLUT Technologies..." }
// ============================================================================

const SYSTEM_PROMPT = `You are the official OKLUT Technologies AI Assistant.

Your job is to help website visitors understand OKLUT Technologies,
its services, careers, employee portal, and general company information.

Be professional, friendly, concise and helpful.

Answer questions about:
- OKLUT Technologies
- Web development
- Mobile app development
- Cloud solutions
- DevOps
- UI/UX
- Software development
- Digital solutions
- Careers
- Job opportunities
- Employee portal
- Contacting OKLUT

Never invent confidential company information.

If the requested information is not available,
politely tell the user that they can contact the OKLUT team.

Do not claim to be a human employee.

Keep normal responses concise and easy to read.

Company context: OKLUT Technologies is a Hyderabad-based IT solutions
company. Key services include web development, software development,
mobile apps (iOS/Android), digital & cloud solutions (AWS, Azure, GCP,
IoT, ML), IT consulting, digital marketing, cyber security and data
analytics. Keep answers short (2-4 sentences where possible) and offer
one natural follow-up question when appropriate.`;

const MAX_MESSAGE_LENGTH = 1500;
const MAX_HISTORY_MESSAGES = 20;
const AI_REQUEST_TIMEOUT_MS = 30_000;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

class ProviderError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function cleanHistory(history) {
  if (!Array.isArray(history)) return [];
  return history
    .filter(
      (m) =>
        m &&
        typeof m === "object" &&
        (m.sender === "user" || m.sender === "assistant") &&
        typeof m.text === "string" &&
        m.text.trim().length > 0,
    )
    .slice(-MAX_HISTORY_MESSAGES)
    .map((m) => ({ sender: m.sender, text: m.text.trim().slice(0, MAX_MESSAGE_LENGTH) }));
}

function providerErrorFor(status) {
  if (status === 401 || status === 403)
    return new ProviderError("AI provider rejected the API key.", 502);
  if (status === 404) return new ProviderError("AI model not found.", 502);
  if (status === 429) return new ProviderError("AI provider rate limit exceeded.", 429);
  return new ProviderError("AI provider error.", 502);
}

async function callOpenAICompatible(messages) {
  const key = Deno.env.get("AI_API_KEY");
  if (!key) {
    console.error("[ai-chat] AI_API_KEY secret is missing");
    throw new ProviderError("AI_API_KEY secret is not configured.", 500);
  }
  const base = (Deno.env.get("AI_BASE_URL") ?? "https://api.openai.com/v1").replace(/\/+$/, "");
  const model = Deno.env.get("AI_MODEL") ?? "gpt-4o-mini";
  const url = `${base}/chat/completions`;

  let response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.6,
        max_tokens: 500,
      }),
      signal: AbortSignal.timeout(AI_REQUEST_TIMEOUT_MS),
    });
  } catch (err) {
    if (err?.name === "TimeoutError") {
      console.error(`[ai-chat] AI provider timed out after ${AI_REQUEST_TIMEOUT_MS}ms`);
      throw new ProviderError("AI provider timed out.", 504);
    }
    console.error("[ai-chat] AI provider unreachable:", err?.message ?? err);
    throw new ProviderError("AI provider unreachable.", 502);
  }

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    console.error(
      `[ai-chat] AI provider HTTP ${response.status}: ${data?.error?.message ?? data?.message ?? "no body"}`,
    );
    throw providerErrorFor(response.status);
  }
  return data?.choices?.[0]?.message?.content ?? "";
}

async function callAnthropic(message, history) {
  const key = Deno.env.get("AI_API_KEY");
  if (!key) throw new ProviderError("AI_API_KEY secret is not configured.", 500);
  const base = (Deno.env.get("AI_BASE_URL") ?? "https://api.anthropic.com").replace(/\/+$/, "");
  const model = Deno.env.get("AI_MODEL") ?? "claude-3-5-haiku-latest";

  const messages = [
    ...history.map((m) => ({
      role: m.sender === "assistant" ? "assistant" : "user",
      content: m.text,
    })),
    { role: "user", content: message },
  ];

  let response;
  try {
    response = await fetch(`${base}/v1/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model,
        max_tokens: 500,
        temperature: 0.6,
        system: SYSTEM_PROMPT,
        messages,
      }),
      signal: AbortSignal.timeout(AI_REQUEST_TIMEOUT_MS),
    });
  } catch (err) {
    if (err?.name === "TimeoutError") throw new ProviderError("AI provider timed out.", 504);
    throw new ProviderError("AI provider unreachable.", 502);
  }

  const data = await response.json().catch(() => null);
  if (!response.ok) throw providerErrorFor(response.status);
  return data?.content?.[0]?.text ?? "";
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200, headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return json({ error: "Method not allowed." }, 405);
  }

  let payload;
  try {
    payload = await req.json();
  } catch {
    return json({ error: "Invalid JSON body." }, 400);
  }

  const message = typeof payload?.message === "string" ? payload.message.trim() : "";
  if (!message) return json({ error: "Message is required." }, 400);
  if (message.length > MAX_MESSAGE_LENGTH) {
    return json({ error: `Message is too long (max ${MAX_MESSAGE_LENGTH} characters).` }, 400);
  }

  const history = cleanHistory(payload?.history);
  const provider = (Deno.env.get("AI_PROVIDER") ?? "openai").toLowerCase();
  const model = Deno.env.get("AI_MODEL") ?? (provider === "anthropic" ? "claude-3-5-haiku-latest" : "gpt-4o-mini");

  console.log(
    `[ai-chat] request received: provider=${provider} model=${model} messageLength=${message.length} history=${history.length}`,
  );

  try {
    let reply;
    if (provider === "anthropic") {
      reply = await callAnthropic(message, history);
    } else {
      const messages = [
        { role: "system", content: SYSTEM_PROMPT },
        ...history.map((m) => ({
          role: m.sender === "assistant" ? "assistant" : "user",
          content: m.text,
        })),
        { role: "user", content: message },
      ];
      reply = await callOpenAICompatible(messages);
    }

    if (!reply.trim()) return json({ error: "Empty reply from AI provider." }, 502);
    console.log(`[ai-chat] reply ok: replyLength=${reply.trim().length} provider=${provider}`);
    return json({ reply: reply.trim() });
  } catch (err) {
    if (err instanceof ProviderError) {
      console.error(`[ai-chat] provider error: status=${err.status} message=${err.message}`);
      return json({ error: err.message }, err.status);
    }
    console.error("[ai-chat] unexpected error:", err?.message ?? err);
    return json({ error: "AI service unavailable." }, 502);
  }
});