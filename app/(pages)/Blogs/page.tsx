"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FaLinkedin } from "react-icons/fa6";
import { SiMedium } from "react-icons/si";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PortfolioLoader } from "@/components/ui/portfolio-loader";
import { blogs } from "@/data/blogs";

const displayFont =
  "[font-family:var(--font-geist-sans),ui-sans-serif,system-ui,sans-serif]";

export default function BlogsPage() {
  const prefersReducedMotion = useReducedMotion();
  const [showLoader, setShowLoader] = useState(true);
  const [contentReady, setContentReady] = useState(false);
  const pageRef = useRef<HTMLElement>(null);
  const newestFirst = [...blogs].sort(
    (first, second) =>
      new Date(second.publishedAt).getTime() - new Date(first.publishedAt).getTime(),
  );

  useEffect(() => {
    const timer = window.setTimeout(
      () => setShowLoader(false),
      prefersReducedMotion ? 0 : 300,
    );
    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!contentReady || prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.fromTo(
        "[data-blog-heading]",
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" },
      );

      gsap.utils.toArray<HTMLElement>("[data-blog-reveal]").forEach((article) => {
        gsap.fromTo(
          article,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
            scrollTrigger: { trigger: article, start: "top 86%", once: true },
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
      {contentReady && <main ref={pageRef} className="mx-auto mt-[-20px] w-full max-w-[1120px] px-5 pb-32 sm:px-8 lg:px-10">
      <section className="py-14 sm:py-20">
        <h1 data-blog-heading className={`${displayFont} text-[32px] font-bold tracking-[-0.055em] text-[#20221F] sm:text-[42px] dark:text-[#F2F3EE]`}>
          My Blogs
        </h1>
        <p className="mt-1 max-w-[58ch] text-[17px] leading-7 text-[#62675F] dark:text-[#A6ABA1]">
          Sharing what I learn through the blogs I write, with insights, experiences, and lessons from the topics I explore along the way.
        </p>
      </section>
      <section className="mt-[-15px] divide-y divide-[#E5E6E1] border-t border-[#E5E6E1] dark:divide-[#282B26] dark:border-[#282B26]">
        {newestFirst.map((blog) => (
          <article data-blog-reveal className="group grid gap-5 py-8 sm:grid-cols-[240px_minmax(0,1fr)] sm:items-start sm:gap-7 sm:py-10" key={blog.title}>
            <div className={`relative w-[220px] max-w-full aspect-[16/10] overflow-hidden rounded-xl bg-gradient-to-br ${blog.accent} p-5 text-white sm:w-auto`}>
              {blog.image && <Image className="object-cover transition-transform duration-300 group-hover:scale-[1.04]" src={blog.image} alt={`${blog.title} cover`} fill sizes="(min-width: 640px) 240px, 100vw" />}
              <div className="absolute inset-0 bg-black/35" aria-hidden="true" />
              <span className={`${displayFont} relative text-[12px] tracking-[0.12em] text-white/75 uppercase`}>{blog.platform} article</span>
              <span className={`${displayFont} absolute right-5 bottom-4 text-[15px] text-white/80`}>{blog.date}</span>
            </div>
            <div className="sm:pt-1">
              <h2 className={`${displayFont} text-[22px] leading-7 font-bold tracking-[-0.035em] text-[#292C28] dark:text-[#E8EAE5]`}>{blog.title}</h2>
              <p className="mt-3 max-w-[68ch] text-[16px] leading-7 text-[#62675F] dark:text-[#A6ABA1]">{blog.excerpt}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {blog.tags.map((tag) => <span className={`${displayFont} rounded-md border border-[#D8DAD4] px-2 py-1 text-[12px] text-[#62675F] dark:border-[#363932] dark:text-[#A6ABA1]`} key={tag}>{tag}</span>)}
              </div>
              <a className={`${displayFont} mt-5 inline-flex items-center gap-1.5 text-[14px] font-bold text-[#62675F] transition-colors hover:text-[#20221F] dark:text-[#A6ABA1] dark:hover:text-[#F2F3EE]`} href={blog.url} target="_blank" rel="noreferrer">
                {blog.platform === "Medium" ? <SiMedium className="size-3.5" /> : <FaLinkedin className="size-3.5" />}
                Read on {blog.platform}
                <ArrowUpRight className="size-3.5 stroke-[1.75]" />
              </a>
            </div>
          </article>
        ))}
      </section>
      </main>}
    </>
  );
}
