"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

export type ImageCarouselImage = {
  src: string;
  alt: string;
  title?: string;
  description?: string;
  technologies?: {
    name: string;
    icon: ReactNode;
  }[];
  href?: string;
  external?: boolean;
  linkLabel?: string;
};

type ImageCarouselProps = {
  images: ImageCarouselImage[];
  autoPlay?: boolean;
  interval?: number;
  showIndicators?: boolean;
  className?: string;
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAFAF7] dark:focus-visible:ring-[#FF8A65] dark:focus-visible:ring-offset-[#10110F]";

function getIndex(index: number, count: number) {
  return (index + count) % count;
}

export function ImageCarousel({
  images,
  autoPlay = true,
  interval = 4000,
  showIndicators = true,
  className = "",
}: ImageCarouselProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const resumeTimerRef = useRef<number | null>(null);
  const hasMultipleImages = images.length > 1;

  useEffect(() => {
    const updateVisibility = () => setIsDocumentVisible(document.visibilityState === "visible");

    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => () => {
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsInViewport(true);
        observer.disconnect();
      },
      { threshold: 0.15 },
    );

    observer.observe(carousel);
    return () => observer.disconnect();
  }, []);

  const pauseAfterManualInteraction = () => {
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    setIsManuallyPaused(true);
    resumeTimerRef.current = window.setTimeout(() => setIsManuallyPaused(false), 2000);
  };

  const navigate = (nextIndex: number, manual = false) => {
    if (!hasMultipleImages) return;

    setDirection(nextIndex === getIndex(activeIndex - 1, images.length) ? -1 : 1);
    setActiveIndex(getIndex(nextIndex, images.length));
    if (manual) pauseAfterManualInteraction();
  };

  useEffect(() => {
    if (!autoPlay || !hasMultipleImages || prefersReducedMotion || isHovered || !isDocumentVisible || isManuallyPaused) return;

    const timer = window.setTimeout(() => {
      setDirection(1);
      setActiveIndex((currentIndex) => getIndex(currentIndex + 1, images.length));
    }, interval);

    return () => window.clearTimeout(timer);
  }, [activeIndex, autoPlay, hasMultipleImages, images.length, interval, isDocumentVisible, isHovered, isManuallyPaused, prefersReducedMotion]);

  if (images.length === 0) return null;

  const currentIndex = Math.min(activeIndex, images.length - 1);
  const previousIndex = getIndex(currentIndex - 1, images.length);
  const nextIndex = getIndex(currentIndex + 1, images.length);
  const sideSlides = images.length > 2
    ? [{ index: previousIndex, position: "left" }, { index: nextIndex, position: "right" }]
    : images.length === 2
      ? [{ index: nextIndex, position: "right" }]
      : [];
  const activeImage = images[currentIndex];

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      navigate(currentIndex - 1, true);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      navigate(currentIndex + 1, true);
    }
  };

  return (
    <motion.div
      className={`w-full overflow-hidden ${className}`}
      ref={carouselRef}
      role="region"
      aria-label="Project highlights carousel"
      tabIndex={hasMultipleImages ? 0 : undefined}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 28 }}
      animate={isInViewport || prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReducedMotion ? 0 : 28 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="relative aspect-[4/3] w-full touch-pan-y overflow-hidden rounded-2xl"
        drag={hasMultipleImages && !prefersReducedMotion ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        onDragEnd={(_, info) => {
          if (Math.abs(info.offset.x) < 48) return;
          navigate(currentIndex + (info.offset.x > 0 ? -1 : 1), true);
        }}
      >
        <AnimatePresence initial={false}>
          {sideSlides.map(({ index, position }) => (
            <motion.div
              className={`pointer-events-none absolute top-[10%] h-[80%] w-[48%] overflow-hidden rounded-xl ${position === "left" ? "-left-[18%]" : "-right-[18%]"}`}
              key={`${position}-${index}`}
              initial={{ opacity: 0, scale: 0.72, x: position === "left" ? -36 : 36 }}
              animate={{ opacity: 0.38, scale: 0.82, x: 0 }}
              exit={{ opacity: 0, scale: 0.72, x: position === "left" ? -36 : 36 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden="true"
            >
              <Image className="object-contain opacity-80 blur-[1px]" src={images[index].src} alt="" fill sizes="(min-width: 768px) 45vw, 60vw" />
            </motion.div>
          ))}
        </AnimatePresence>

        <div className="absolute inset-y-[5%] left-1/2 z-10 w-[78%] -translate-x-1/2">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.figure
              className="size-full cursor-pointer overflow-hidden rounded-xl shadow-[0_20px_50px_rgba(32,34,31,0.16)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.36)]"
              key={`active-${currentIndex}`}
              initial={{ opacity: 0, scale: 0.92, x: direction * 44 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
              exit={{ opacity: 0, scale: 0.92, x: direction * -44 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.48, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image className="object-contain" src={activeImage.src} alt={activeImage.alt} fill loading="lazy" sizes="(min-width: 1024px) 760px, (min-width: 640px) 78vw, 90vw" />
            </motion.figure>
          </AnimatePresence>
        </div>

        {hasMultipleImages && (
          <div className="pointer-events-none absolute inset-y-0 right-4 left-4 z-20 hidden items-center justify-between lg:flex">
            <button className={`${focusRing} pointer-events-auto grid size-11 place-items-center rounded-full border border-[#D8DAD4]/80 bg-[#FAFAF7]/85 text-[#40443E] shadow-sm backdrop-blur-sm transition-[transform,background-color] hover:scale-105 hover:bg-[#FAFAF7] dark:border-[#50544A] dark:bg-[#10110F]/85 dark:text-[#C5C9C0] dark:hover:bg-[#10110F]`} type="button" onClick={() => navigate(currentIndex - 1, true)} aria-label="Show previous image">
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button className={`${focusRing} pointer-events-auto grid size-11 place-items-center rounded-full border border-[#D8DAD4]/80 bg-[#FAFAF7]/85 text-[#40443E] shadow-sm backdrop-blur-sm transition-[transform,background-color] hover:scale-105 hover:bg-[#FAFAF7] dark:border-[#50544A] dark:bg-[#10110F]/85 dark:text-[#C5C9C0] dark:hover:bg-[#10110F]`} type="button" onClick={() => navigate(currentIndex + 1, true)} aria-label="Show next image">
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </div>
        )}
      </motion.div>

      {(activeImage.title || activeImage.description || activeImage.technologies?.length || activeImage.href) && (
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            className="mt-5"
            key={`slide-content-${currentIndex}`}
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -8 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {activeImage.title && <h3 className="text-[22px] leading-7 font-bold tracking-[-0.04em] text-[#292C28] sm:text-[26px] dark:text-[#E8EAE5]">{activeImage.title}</h3>}
            {activeImage.description && <p className="mt-1.5 max-w-[60ch] text-[15px] leading-6 text-[#62675F] sm:text-[16px] dark:text-[#A6ABA1]">{activeImage.description}</p>}
            {activeImage.technologies?.length && (
              <div className="mt-3 flex items-center gap-3" aria-label="Technology stack">
                {activeImage.technologies.map((technology) => (
                  <span className="group relative grid size-7 place-items-center text-[#40443E] dark:text-[#C5C9C0]" key={technology.name} role="img" aria-label={technology.name}>
                    {technology.icon}
                    <span className="pointer-events-none absolute top-full left-1/2 z-20 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#20221F] px-2 py-1 text-[12px] font-medium text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100 dark:bg-[#F2F3EE] dark:text-[#10110F]" aria-hidden="true">
                      {technology.name}
                    </span>
                  </span>
                ))}
              </div>
            )}
            {activeImage.href && (
              activeImage.external ? (
                <a className={`${focusRing} mt-4 inline-flex items-center gap-1.5 rounded-sm text-[14px] font-semibold text-[#62675F] transition-colors hover:text-[#20221F] dark:text-[#A6ABA1] dark:hover:text-[#F2F3EE]`} href={activeImage.href} target="_blank" rel="noreferrer">
                  {activeImage.linkLabel ?? "View highlight"}
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </a>
              ) : (
                <Link className={`${focusRing} mt-4 inline-flex items-center gap-1.5 rounded-sm text-[14px] font-semibold text-[#62675F] transition-colors hover:text-[#20221F] dark:text-[#A6ABA1] dark:hover:text-[#F2F3EE]`} href={activeImage.href}>
                  {activeImage.linkLabel ?? "View project"}
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </Link>
              )
            )}
          </motion.div>
        </AnimatePresence>
      )}

      {hasMultipleImages && (
        <div className="mt-5 flex flex-col items-center gap-4">
          <div className="flex items-center gap-3 lg:hidden">
            <button className={`${focusRing} grid size-10 place-items-center rounded-full border border-[#D8DAD4] text-[#40443E] transition-colors hover:bg-[#F2F2EC] dark:border-[#363932] dark:text-[#C5C9C0] dark:hover:bg-[#232520]`} type="button" onClick={() => navigate(currentIndex - 1, true)} aria-label="Show previous image">
              <ChevronLeft className="size-4" aria-hidden="true" />
            </button>
            <button className={`${focusRing} grid size-10 place-items-center rounded-full border border-[#D8DAD4] text-[#40443E] transition-colors hover:bg-[#F2F2EC] dark:border-[#363932] dark:text-[#C5C9C0] dark:hover:bg-[#232520]`} type="button" onClick={() => navigate(currentIndex + 1, true)} aria-label="Show next image">
              <ChevronRight className="size-4" aria-hidden="true" />
            </button>
          </div>

          {showIndicators && (
            <div className="flex items-center gap-2" aria-label="Choose carousel slide">
              {images.map((image, index) => (
                <button
                  className={`${focusRing} h-2 rounded-full transition-[width,background-color] duration-300 ${index === currentIndex ? "w-6 bg-[#20221F] dark:bg-[#F2F3EE]" : "w-2 bg-[#BFC2BA] hover:bg-[#898E86] dark:bg-[#50544A] dark:hover:bg-[#7D8279]"}`}
                  key={`${image.src}-${index}`}
                  type="button"
                  onClick={() => navigate(index, true)}
                  aria-label={`Show image ${index + 1}: ${image.title ?? image.alt}`}
                  aria-current={index === currentIndex ? "true" : undefined}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
