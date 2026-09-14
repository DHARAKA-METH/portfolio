"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  BadgeCheck,
  Boxes,
  Braces,
  Cpu,
  Database,
  DatabaseBackup,
  KeyRound,
  LockKeyhole,
  MapPin,
  Shield,
  ShieldCheck,
  Smartphone,
  TableProperties,
  Users,
  Waypoints,
} from "lucide-react";
import {
  SiCloudinary,
  SiDart,
  SiDocker,
  SiExpo,
  SiExpress,
  SiFirebase,
  SiFlutter,
  SiHuggingface,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiReact,
  SiSharp,
  SiSpringboot,
  SiTailwindcss,
  SiTypescript,
  SiUpstash,
  SiYoutube,
} from "react-icons/si";
import { AnimatePresence, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PortfolioLoader } from "@/components/ui/portfolio-loader";
import { projects } from "@/data/projects";

const displayFont =
  "[font-family:var(--font-geist-sans),ui-sans-serif,system-ui,sans-serif]";

const technologyIcons = {
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  Firebase: SiFirebase,
  Zod: BadgeCheck,
  Teamwork: Users,
  "React Native": SiReact,
  Expo: SiExpo,
  "Tailwind CSS": SiTailwindcss,
  "Firebase Auth": ShieldCheck,
  "Cloud Firestore": Database,
  "Cloud Functions": Braces,
  "Hugging Face": SiHuggingface,
  Flutter: SiFlutter,
  Dart: SiDart,
  IoT: Cpu,
  GPS: MapPin,
  "Mobile Development": Smartphone,
  "Spring Boot": SiSpringboot,
  JWT: KeyRound,
  MySQL: SiMysql,
  Docker: SiDocker,
  NGINX: SiNginx,
  Cloudinary: SiCloudinary,
  Microservices: Boxes,
  MongoDB: SiMongodb,
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  "REST APIs": Waypoints,
  Authentication: LockKeyhole,
  "Database Design": DatabaseBackup,
  Arcjet: Shield,
  Upstash: SiUpstash,
  "C#": SiSharp,
  SQL: TableProperties,
} as const;

const technologyIconColors: Record<keyof typeof technologyIcons, string> = {
  "Next.js": "text-[#111111] dark:text-[#F2F3EE]",
  TypeScript: "text-[#3178C6]",
  Firebase: "text-[#FFCA28]",
  Zod: "text-[#3E67B1]",
  Teamwork: "text-[#7C3AED]",
  "React Native": "text-[#61DAFB]",
  Expo: "text-[#111111] dark:text-[#F2F3EE]",
  "Tailwind CSS": "text-[#06B6D4]",
  "Firebase Auth": "text-[#F59E0B]",
  "Cloud Firestore": "text-[#F97316]",
  "Cloud Functions": "text-[#A855F7]",
  "Hugging Face": "text-[#EAB308]",
  Flutter: "text-[#54C5F8]",
  Dart: "text-[#0175C2]",
  IoT: "text-[#14B8A6]",
  GPS: "text-[#EF4444]",
  "Mobile Development": "text-[#8B5CF6]",
  "Spring Boot": "text-[#6DB33F]",
  JWT: "text-[#CA8A04]",
  MySQL: "text-[#4479A1]",
  Docker: "text-[#2496ED]",
  NGINX: "text-[#009639]",
  Cloudinary: "text-[#3448C5]",
  Microservices: "text-[#EA580C]",
  MongoDB: "text-[#47A248]",
  "Node.js": "text-[#5FA04E]",
  "Express.js": "text-[#20232A] dark:text-[#E8EAE5]",
  "REST APIs": "text-[#0EA5E9]",
  Authentication: "text-[#EC4899]",
  "Database Design": "text-[#6366F1]",
  Arcjet: "text-[#EA580C]",
  Upstash: "text-[#00A67E]",
  "C#": "text-[#512BD4]",
  SQL: "text-[#2563EB]",
};

export default function ProjectSectionPage() {
  const prefersReducedMotion = useReducedMotion();
  const [showLoader, setShowLoader] = useState(true);
  const [contentReady, setContentReady] = useState(false);
  const [loadedImageUrls, setLoadedImageUrls] = useState<Set<string>>(() => new Set());
  const pageRef = useRef<HTMLElement>(null);

  const markImageLoaded = (imageUrl: string) => {
    setLoadedImageUrls((current) => {
      if (current.has(imageUrl)) return current;
      const next = new Set(current);
      next.add(imageUrl);
      return next;
    });
  };

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

      gsap.utils.toArray<HTMLElement>("[data-project-gallery]").forEach((gallery) => {
        gsap.fromTo(
          gallery.querySelectorAll<HTMLElement>("[data-project-image]"),
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gallery,
              start: "top 88%",
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
        <p className="mt-3 text-[16px] leading-6 font-medium tracking-[-0.04em] text-[#929292]">
          My work, my experiments, and my journey of continuous improvement.
        </p>
      </section>

      <div className="mt-[-60px] divide-y divide-[#E5E6E1] border-t border-[#E5E6E1] dark:divide-[#282B26] dark:border-[#282B26]">
        {projects.map((project) => (
          <article data-project-reveal className="py-20 lg:py-32" key={project.title}>
            <div className="w-full">
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
                  (() => {
                    const TechnologyIcon = technologyIcons[technology as keyof typeof technologyIcons];
                    const iconColor = technologyIconColors[technology as keyof typeof technologyIconColors];

                    return (
                      <span className={`${displayFont} inline-flex items-center gap-1.5 rounded-md border border-[#D8DAD4] px-2.5 py-1.5 text-[14px] text-[#40443E] dark:border-[#363932] dark:text-[#C5C9C0]`} key={technology}>
                        {TechnologyIcon && <TechnologyIcon className={`size-4 shrink-0 ${iconColor}`} aria-hidden="true" />}
                        {technology}
                      </span>
                    );
                  })()
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

             {project.imageUrls.length > 0 && <div data-project-gallery className={`mt-8 grid grid-cols-2 gap-3 lg:mt-10 ${project.imageUrls.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-2"} sm:gap-4`}>
              {project.imageUrls.map((imageUrl, index) => {
                const imageLoaded = loadedImageUrls.has(imageUrl);

                return (
                <div data-project-image className="rounded-2xl bg-[#F2F2EC] p-2 dark:bg-[#181A17] sm:p-3" key={imageUrl}>
                  <div className={`relative w-full overflow-hidden rounded-xl ${project.screenType === "mobile" ? "aspect-[9/19]" : "aspect-[4/3]"}`}>
                    <div className={`absolute inset-0 bg-[#E5E6E1] transition-opacity duration-200 motion-reduce:animate-none motion-reduce:transition-none dark:bg-[#282B26] ${imageLoaded ? "opacity-0" : "animate-pulse"}`} aria-hidden="true" />
                    <Image className={`object-contain object-center transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${imageLoaded ? "scale-100 opacity-100" : "scale-[1.015] opacity-0"}`} src={imageUrl} alt={`${project.title} screenshot ${index + 1}`} fill sizes={project.imageUrls.length === 4 ? "(min-width: 1024px) 260px, 50vw" : "(min-width: 1024px) 520px, 50vw"} style={prefersReducedMotion ? undefined : { transitionDelay: `${index * 60}ms` }} onLoad={() => markImageLoaded(imageUrl)} onError={() => markImageLoaded(imageUrl)} />
                  </div>
                </div>
                );
               })}
             </div>}

             {project.extraImageUrls.length > 0 && (
               <section className="mt-10 lg:mt-14">
                 <h3 className={`${displayFont} mb-5 text-[18px] font-bold tracking-[-0.03em] text-[#292C28] dark:text-[#E8EAE5]`}>
                   Architecture &amp; supporting visuals
                 </h3>
                 <div data-project-gallery className={`grid grid-cols-1 gap-1 ${project.extraImageUrls.length === 2 ? "md:flex md:aspect-[8/3]" : project.extraImageUrls.length > 1 ? "md:grid-cols-2" : ""}`}>
                   {project.extraImageUrls.map((imageUrl, index) => {
                     const imageLoaded = loadedImageUrls.has(imageUrl);

                     return (
                       <div data-project-image className={`rounded-2xl ${project.extraImageUrls.length === 2 ? "cursor-pointer md:min-w-0 md:flex-1 md:transition-[flex] md:duration-500 md:hover:delay-150 md:hover:flex-[2.5] motion-reduce:md:transition-none" : ""}`} key={`${imageUrl}-${index}`}>
                         <div className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl ${project.extraImageUrls.length === 2 ? "md:h-full md:aspect-auto" : ""}`}>
                           <div className={`absolute inset-0 bg-[#E5E6E1] transition-opacity duration-200 motion-reduce:animate-none motion-reduce:transition-none dark:bg-[#282B26] ${imageLoaded ? "opacity-0" : "animate-pulse"}`} aria-hidden="true" />
                           <Image className={`object-contain object-center transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${imageLoaded ? "scale-100 opacity-100" : "scale-[1.015] opacity-0"}`} src={imageUrl} alt={`${project.title} supporting visual ${index + 1}`} fill sizes={project.extraImageUrls.length === 2 ? "(min-width: 1024px) 700px, (min-width: 768px) 65vw, 100vw" : project.extraImageUrls.length > 1 ? "(min-width: 768px) 520px, 100vw" : "(min-width: 1024px) 1040px, 100vw"} style={prefersReducedMotion ? undefined : { transitionDelay: `${index * 60}ms` }} onLoad={() => markImageLoaded(imageUrl)} onError={() => markImageLoaded(imageUrl)} />
                         </div>
                       </div>
                     );
                   })}
                 </div>
               </section>
             )}
           </article>
        ))}
      </div>
      </main>}
    </>
  );
}
