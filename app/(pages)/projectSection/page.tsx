"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SiYoutube } from "react-icons/si";
import { AnimatePresence, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PortfolioLoader } from "@/components/ui/portfolio-loader";
import { projects } from "@/data/projects";

const displayFont =
  "[font-family:var(--font-courier-prime),ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace]";

export default function ProjectSectionPage() {
  const prefersReducedMotion = useReducedMotion();
  const [showLoader, setShowLoader] = useState(true);
  const [contentReady, setContentReady] = useState(false);
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(
      () => setShowLoader(false),
      prefersReducedMotion ? 0 : 500,
    );
    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!contentReady || prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.fromTo(
        "[data-project-heading]",
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" },
      );

      gsap.utils.toArray<HTMLElement>("[data-project-reveal]").forEach((project) => {
        gsap.fromTo(
          project,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
            scrollTrigger: {
              trigger: project,
              start: "top 86%",
              once: true,
            },
          },
        );
      });
    }, pageRef);

    return () => context.revert();
  }, [contentReady, prefersReducedMotion]);

  return (
    <>
      <AnimatePresence onExitComplete={() => setContentReady(true)}>
        {showLoader && <PortfolioLoader />}
      </AnimatePresence>
      {contentReady && <main ref={pageRef} className="mx-auto w-full max-w-[1120px] px-5 pb-20 sm:px-8 sm:pb-28 lg:px-10">
      <section className="py-14 sm:py-20">
        <h1 data-project-heading className={`${displayFont} text-[32px] font-bold tracking-[-0.055em] text-[#20221F] sm:text-[42px] dark:text-[#F2F3EE]`}>
          Projects
        </h1>
      </section>

      <div className="divide-y divide-[#E5E6E1] border-t border-[#E5E6E1] dark:divide-[#282B26] dark:border-[#282B26]">
        {projects.map((project) => (
          <article data-project-reveal className={`grid gap-7 py-10 lg:gap-12 lg:py-14 ${project.imageUrls.length > 0 ? "lg:grid-cols-[minmax(0,1fr)_560px]" : ""}`} key={project.title}>
            <div className="max-w-[62ch]">
              <p className={`${displayFont} text-[14px] text-[#898E86] dark:text-[#7D8279]`}>
                {project.period.join(" - ")}
              </p>
              <h2 className={`${displayFont} mt-3 text-[24px] leading-tight font-bold tracking-[-0.04em] text-[#292C28] sm:text-[28px] dark:text-[#E8EAE5]`}>
                {project.title}
              </h2>
              <p className={`${displayFont} mt-2 text-[15px] text-[#62675F] dark:text-[#A6ABA1]`}>
                {project.role}
              </p>
              <p className="mt-4 text-[16px] leading-7 text-[#62675F] sm:text-[17px] dark:text-[#A6ABA1]">
                {project.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <span className={`${displayFont} rounded-md border border-[#D8DAD4] px-2.5 py-1.5 text-[14px] text-[#40443E] dark:border-[#363932] dark:text-[#C5C9C0]`} key={technology}>
                    {technology}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                <a className={`${displayFont} inline-flex items-center gap-1.5 text-[15px] font-bold text-[#62675F] transition-colors hover:text-[#20221F] dark:text-[#A6ABA1] dark:hover:text-[#F2F3EE]`} href={project.url} target="_blank" rel="noreferrer">
                  {project.linkLabel}
                  <ArrowUpRight className="size-3.5 stroke-[1.75]" />
                </a>
                {project.demoUrl && (
                  <a className={`${displayFont} inline-flex items-center gap-1.5 text-[15px] font-bold text-[#62675F] transition-colors hover:text-[#20221F] dark:text-[#A6ABA1] dark:hover:text-[#F2F3EE]`} href={project.demoUrl} target="_blank" rel="noreferrer">
                    <SiYoutube className="size-3.5" />
                    Demo video
                    <ArrowUpRight className="size-3.5 stroke-[1.75]" />
                  </a>
                )}
              </div>
            </div>

            {project.imageUrls.length > 0 && <div className={`grid self-start ${project.screenType === "mobile" && project.imageUrls.length === 4 ? "grid-cols-4" : project.imageUrls.length <= 2 || project.imageUrls.length === 4 ? "grid-cols-2" : "grid-cols-3"} ${project.screenType === "mobile" ? "gap-2 sm:gap-3" : "gap-3"}`}>
              {project.imageUrls.map((imageUrl, index) => (
                <div className="relative rounded-2xl cursor-pointer bg-[#F2F2EC] p-1.5 transition-transform duration-300 ease-out hover:z-10 hover:scale-[1.08] motion-reduce:transform-none dark:bg-[#181A17] sm:p-2" key={imageUrl}>
                  <div className={`relative w-full h-auto rounded-xl ${project.screenType === "mobile" ? "aspect-[9/19]" : "aspect-[4/3]"}`}>
                    <Image className="object-fill object-center" src={imageUrl} alt={`${project.title} screenshot ${index + 1}`} fill sizes="(min-width: 1024px) 120px, 45vw" />
                  </div>
                </div>
              ))}
            </div>}
          </article>
        ))}
      </div>
      </main>}
    </>
  );
}
