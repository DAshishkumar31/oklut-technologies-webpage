import { lazy } from "react";
import Hero from "../components/Hero";
import IndustryStrip from "../components/IndustryStrip";
import LazySection from "../components/LazySection";

const BentoGrid = lazy(() => import("../components/BentoGrid"));
const ProductShowcase = lazy(() => import("../components/ProductShowcase"));
const WhyUs = lazy(() => import("../components/WhyUs"));
const Stats = lazy(() => import("../components/Stats"));
const Process = lazy(() => import("../components/Process"));
const Testimonials = lazy(() => import("../components/Testimonials"));
const CTA = lazy(() => import("../components/CTA"));

export default function Home() {
  return (
    <>
      <Hero />
      <IndustryStrip />
      <LazySection>
        <BentoGrid />
      </LazySection>
      <LazySection>
        <ProductShowcase />
      </LazySection>
      <LazySection>
        <WhyUs />
      </LazySection>
      <LazySection>
        <Stats />
      </LazySection>
      <LazySection>
        <Process />
      </LazySection>
      <LazySection>
        <Testimonials />
      </LazySection>
      <LazySection>
        <CTA />
      </LazySection>
    </>
  );
}