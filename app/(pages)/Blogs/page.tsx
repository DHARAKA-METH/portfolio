"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, useReducedMotion } from "framer-motion";
import { PortfolioLoader } from "@/components/ui/portfolio-loader";

const displayFont =
  "[font-family:var(--font-courier-prime),ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace]";

export default function BlogsPage() {
  const prefersReducedMotion = useReducedMotion();
  const [showLoader, setShowLoader] = useState(true);
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(
      () => setShowLoader(false),
      prefersReducedMotion ? 0 : 500,
    );
    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion]);

  return (
    <>
      <AnimatePresence onExitComplete={() => setContentReady(true)}>
        {showLoader && <PortfolioLoader />}
      </AnimatePresence>
      {contentReady && <main className="mx-auto w-full max-w-[1120px] px-5 pb-32 sm:px-8 lg:px-10">
      <section className="py-14 sm:py-20">
        <p className={`${displayFont} text-[14px] tracking-[0.08em] text-[#898E86] uppercase dark:text-[#7D8279]`}>
          Writing
        </p>
        <h1 className={`${displayFont} mt-3 text-[32px] font-bold tracking-[-0.055em] text-[#20221F] sm:text-[42px] dark:text-[#F2F3EE]`}>
          Blogs
        </h1>
        <p className="mt-5 max-w-[58ch] text-[17px] leading-7 text-[#62675F] dark:text-[#A6ABA1]">
          Notes on backend engineering, DevOps, and the projects I build along the way.
        </p>
      </section>
      </main>}
    </>
  );
}
