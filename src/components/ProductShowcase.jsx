import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { PRODUCTS } from "../data/content";
import { EASE, VIEWPORT, fadeUp } from "../animations/variants";
import TechShapes3D from "./effects/TechShapes3D";
import ParticleField from "./effects/ParticleField";

export default function ProductShowcase() {
  const [activeId, setActiveId] = useState(PRODUCTS[0].id);
  const active = PRODUCTS.find((p) => p.id === activeId) ?? PRODUCTS[0];

  return (
    <section className="relative overflow-hidden bg-ink py-24 text-paper sm:py-28">
      <TechShapes3D beam />
      <ParticleField className="absolute inset-0 size-full" density={30} />
      <div className="container-x relative">
        <SectionHeading
          dark
          eyebrow="Product portfolio"
          title="Built products, real outcomes"
          description="Explore platforms we designed, engineered and shipped — and the value they created for the businesses behind them."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          {/* Tab list */}
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            role="tablist"
            aria-label="Our products"
            aria-orientation="vertical"
            className="flex flex-col gap-2.5 lg:col-span-5"
          >
            {PRODUCTS.map((product, i) => {
              const isActive = product.id === activeId;
              return (
                <motion.button
                  key={product.id}
                  variants={fadeUp}
                  role="tab"
                  id={`product-tab-${product.id}`}
                  aria-selected={isActive}
                  aria-controls={`product-panel-${product.id}`}
                  onClick={() => setActiveId(product.id)}
                  className={`cursor-pointer flex items-center gap-4 rounded-2xl border p-5 text-left transition-all duration-300 ${
                    isActive
                      ? "border-accent/50 bg-accent/10 shadow-glow"
                      : "border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10"
                  }`}
                >
                  <span
                    className={`grid size-11 shrink-0 place-items-center rounded-xl transition-colors ${
                      isActive ? "bg-accent text-paper" : "bg-white/10 text-paper/60"
                    }`}
                  >
                    <product.icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold">
                      <span className="mr-2 font-display text-xs text-paper/40">{String(i + 1).padStart(2, "0")}</span>
                      {product.title}
                    </span>
                    <span className="mt-0.5 block text-xs text-paper/50">{product.tags.join(" · ")}</span>
                  </span>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Detail panel */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                role="tabpanel"
                id={`product-panel-${active.id}`}
                aria-labelledby={`product-tab-${active.id}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="glass flex h-full flex-col justify-between rounded-3xl p-8 shadow-float sm:p-10"
              >
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-mint/15 px-3 py-1 text-xs font-semibold text-mint">
                    <span className="size-1.5 rounded-full bg-mint" aria-hidden="true" />
                    Shipped product
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                    {active.title}
                  </h3>
                  <p className="mt-4 max-w-xl leading-relaxed text-paper/65">{active.description}</p>
                </div>

                <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
                  <ul className="flex flex-wrap gap-2">
                    {active.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-medium text-paper/70"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-violet"
                  >
                    Discuss a similar build
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
                  {["Dedicated team", "Agile sprints", "24/7 support"].map((item) => (
                    <p key={item} className="flex items-center gap-2 text-xs font-medium text-paper/60">
                      <Check className="size-4 text-mint" aria-hidden="true" />
                      {item}
                    </p>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

const staggerChildren = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};