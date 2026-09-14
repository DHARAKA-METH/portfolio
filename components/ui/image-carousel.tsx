"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type ImageCarouselImage = {
  src: string;
  alt: string;
  title?: string;
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
    <div
      className={`w-full overflow-hidden ${className}`}
      role="region"
      aria-label="Project highlights carousel"
      tabIndex={hasMultipleImages ? 0 : undefined}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative aspect-[4/3] w-full touch-pan-y overflow-hidden rounded-2xl border border-[#D8DAD4] bg-[#F2F2EC] dark:border-[#363932] dark:bg-[#181A17]"
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
              className={`pointer-events-none absolute top-[10%] h-[80%] w-[48%] overflow-hidden rounded-xl border border-[#D8DAD4]/70 bg-[#E5E6E1] dark:border-[#363932] dark:bg-[#282B26] ${position === "left" ? "-left-[18%]" : "-right-[18%]"}`}
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
              className="size-full overflow-hidden rounded-xl border border-[#D8DAD4] bg-[#FAFAF7] shadow-[0_20px_50px_rgba(32,34,31,0.16)] dark:border-[#50544A] dark:bg-[#10110F] dark:shadow-[0_20px_50px_rgba(0,0,0,0.36)]"
              key={`active-${currentIndex}`}
              initial={{ opacity: 0, scale: 0.92, x: direction * 44 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.92, x: direction * -44 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.48, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image className="object-contain" src={activeImage.src} alt={activeImage.alt} fill sizes="(min-width: 1024px) 760px, (min-width: 640px) 78vw, 90vw" priority={currentIndex === 0} />
              {activeImage.title && (
                <figcaption className="absolute right-3 bottom-3 left-3 rounded-md bg-[#10110F]/72 px-3 py-2 text-center text-[13px] font-medium text-white backdrop-blur-sm dark:bg-[#F2F3EE]/82 dark:text-[#10110F]">
                  {activeImage.title}
                </figcaption>
              )}
            </motion.figure>
          </AnimatePresence>
        </div>
      </motion.div>

      {hasMultipleImages && (
        <div className="mt-5 flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
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
    </div>
  );
}
