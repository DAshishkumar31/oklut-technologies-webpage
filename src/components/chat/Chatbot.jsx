import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import ChatbotButton from "./ChatbotButton";
import ChatWindow from "./ChatWindow";
import { sendChatMessage, validateMessage, MESSAGE_LIMIT, AI_ERRORS } from "../../services/aiService";
import { ensureChatSession, persistChatMessage } from "../../services/chatStorage";
import { CHAT_GREETING } from "../../data/chatKnowledge";

const STORAGE_KEY = "oklut-chat-v1";
const RETRY_DELAY_MS = 2000;

const GREETING = { id: "greeting", sender: "assistant", text: CHAT_GREETING, time: "" };

function makeId() {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function makeMessage(sender, text, extra = {}) {
  return {
    id: makeId(),
    sender,
    text,
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    ...extra,
  };
}

function loadSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.messages || !parsed?.sessionId) return null;
    return { messages: parsed.messages, sessionId: parsed.sessionId };
  } catch {
    return null;
  }
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState(() => loadSession()?.messages ?? []);
  const sessionIdRef = useRef(loadSession()?.sessionId ?? makeId());
  const [lastSentAt, setLastSentAt] = useState(0);
  const pendingRetryRef = useRef(null);
  const messageCount = messages.length;

  const hasInteraction = messages.some((m) => m.sender === "user");
  const showSuggestions = open && !hasInteraction && !isTyping;
  const limitReached = messageCount >= MESSAGE_LIMIT;

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ messages, sessionId: sessionIdRef.current }));
    } catch {
      // storage unavailable (private mode) — chat still works in-memory
    }
  }, [messages]);

  useEffect(() => {
    ensureChatSession(sessionIdRef.current);
  }, []);

  const appendMessage = useCallback((message) => {
    setMessages((prev) => [...prev, message]);
    if (message.sender === "user" || message.error) {
      persistChatMessage(sessionIdRef.current, message.sender, message.text);
    }
    return message;
  }, []);

  const sendText = useCallback(
    async (text, { preserveLastUser = false } = {}) => {
      const now = Date.now();
      if (now - lastSentAt < RETRY_DELAY_MS) return;
      setLastSentAt(now);

      const validation = validateMessage(text);
      if (!validation.ok) return;

      if (messageCount >= MESSAGE_LIMIT) return;

      if (!preserveLastUser) {
        appendMessage(makeMessage("user", validation.text));
      }

      const history = messages.map((m) => ({ sender: m.sender, text: m.text }));

      setIsTyping(true);
      try {
        const reply = await sendChatMessage({ messages: history, sessionId: sessionIdRef.current });
        appendMessage(makeMessage("assistant", reply));
        pendingRetryRef.current = null;
      } catch (error) {
        const code = error?.code ?? AI_ERRORS.UNKNOWN;
        const text =
          code === AI_ERRORS.NETWORK || code === AI_ERRORS.MALFORMED
            ? "I couldn't reach the assistant service. Please try again in a moment."
            : code === AI_ERRORS.RATE_LIMIT
              ? "I'm getting too many requests right now. Please wait a few seconds and try again."
              : "Something went wrong on my side. Please try again.";
        appendMessage(makeMessage("assistant", text, { error: true, errorCode: code }));
        pendingRetryRef.current = validation.text;
      } finally {
        setIsTyping(false);
      }
    },
    [appendMessage, lastSentAt, messageCount, messages],
  );

  const handleSend = useCallback(
    (text) => {
      sendText(text);
    },
    [sendText],
  );

  const handleRetry = useCallback(
    (message) => {
      if (!message.error || !pendingRetryRef.current || isTyping) return;
      const failed = messages.find((m) => m.id === message.id);
      if (!failed) return;
      setMessages((prev) => prev.filter((m) => m.id !== failed.id));
      persistChatMessage(sessionIdRef.current, "assistant", failed.text);
      sendText(pendingRetryRef.current, { preserveLastUser: true });
    },
    [messages, isTyping, sendText],
  );

  const handleClear = useCallback(() => {
    pendingRetryRef.current = null;
    setMessages([]);
  }, []);

  const handleMinimize = useCallback(() => setOpen(false), []);

  const handleClose = useCallback(() => {
    setOpen(false);
    pendingRetryRef.current = null;
  }, []);

  return (
    <>
      <ChatbotButton
        isOpen={open}
        onClick={() => setOpen((v) => !v)}
      />
      <AnimatePresence>
        {open && (
          <ChatWindow
            messages={messages.length === 0 ? [GREETING] : messages}
            isTyping={isTyping}
            showSuggestions={showSuggestions}
            limitReached={limitReached}
            onSend={handleSend}
            onSuggest={handleSend}
            onRetry={handleRetry}
            onMinimize={handleMinimize}
            onClose={handleClose}
            onClear={handleClear}
          />
        )}
      </AnimatePresence>
    </>
  );
}