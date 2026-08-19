import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, AlertTriangle, RefreshCw } from "lucide-react";
import CareersHero from "../components/careers/CareersHero";
import JobCard from "../components/careers/JobCard";
import JobDetailsModal from "../components/careers/JobDetailsModal";
import WhyJoin from "../components/careers/WhyJoin";
import Benefits from "../components/careers/Benefits";
import HiringProcess from "../components/careers/HiringProcess";
import CareersCTA from "../components/careers/CareersCTA";
import ApplicationModal from "../components/careers/ApplicationModal";
import SectionHeading from "../components/SectionHeading";
import { fetchActiveJobs } from "../services/jobsService";
import { stagger, VIEWPORT, EASE } from "../animations/variants";

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [error, setError] = useState("");
  const [viewJob, setViewJob] = useState(null);
  const [applyJob, setApplyJob] = useState(null);

  const loadJobs = useCallback(async () => {
    setStatus("loading");
    setError("");
    try {
      const data = await fetchActiveJobs();
      setJobs(data);
      setStatus("ready");
    } catch {
      setError("We could not load the open positions right now. Please try again.");
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    fetchActiveJobs()
      .then((data) => {
        if (!mounted) return;
        setJobs(data);
        setStatus("ready");
      })
      .catch(() => {
        if (!mounted) return;
        setError("We could not load the open positions right now. Please try again.");
        setStatus("error");
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <CareersHero />

      <section id="positions" className="relative overflow-hidden bg-ink py-24 text-paper sm:py-28">
        <div
          className="absolute inset-0 bg-[radial-gradient(42rem_26rem_at_80%_-10%,rgb(91_91_239/0.22),transparent_60%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 opacity-40 [background-image:radial-gradient(rgb(255_255_255/0.08)_1px,transparent_1px)] [background-size:28px_28px]"
          aria-hidden="true"
        />
        <div className="container-x relative">
          <SectionHeading
            dark
            eyebrow="Open positions"
            title="Open Positions"
            description="Find your next opportunity at OKLUT."
          />

          {status === "loading" && (
            <div
              className="mt-12 grid min-h-64 place-items-center rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
              role="status"
              aria-label="Loading opportunities"
            >
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="size-8 animate-spin text-accent" aria-hidden="true" />
                <p className="text-sm font-semibold tracking-[0.18em] text-paper/50">
                  LOADING OPPORTUNITIES…
                </p>
              </div>
            </div>
          )}

          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              role="alert"
              className="mt-12 flex flex-col items-center gap-4 rounded-3xl border border-red-400/25 bg-red-400/5 px-6 py-14 text-center backdrop-blur-xl"
            >
              <AlertTriangle className="size-8 text-red-300" aria-hidden="true" />
              <p className="max-w-md text-sm leading-relaxed text-paper/65">{error}</p>
              <button
                type="button"
                onClick={loadJobs}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/20 px-6 py-2.5 text-sm font-semibold text-paper transition-colors duration-300 hover:border-accent/60 hover:bg-accent/10"
              >
                <RefreshCw className="size-4" aria-hidden="true" />
                Try again
              </button>
            </motion.div>
          )}

          {status === "ready" && (
            <motion.ul
              variants={stagger(0.08)}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
            >
              {jobs.map((j) => (
                <JobCard key={j.id} job={j} onView={setViewJob} onApply={setApplyJob} />
              ))}
            </motion.ul>
          )}
        </div>
      </section>

      <WhyJoin />
      <Benefits />
      <HiringProcess />
      <CareersCTA />

      <AnimatePresence>
        {viewJob && (
          <JobDetailsModal
            job={viewJob}
            onClose={() => setViewJob(null)}
            onApply={(job) => {
              setViewJob(null);
              setApplyJob(job);
            }}
          />
        )}
        {applyJob && (
          <ApplicationModal
            key={applyJob.id}
            job={applyJob}
            jobs={jobs}
            onClose={() => setApplyJob(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}