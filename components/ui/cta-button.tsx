"use client";

import Link from "next/link";
import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";

interface CtaButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  children: ReactNode;
  variant?: "default" | "secondary";
  shimmer?: boolean;
}

export function CtaButton({
  href,
  children,
  className = "",
  variant = "default",
  shimmer = false,
  ...props
}: CtaButtonProps) {
  const isDefault = variant === "default";
  const buttonClassName = `relative z-10 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full px-5 font-semibold transition-all ${
    isDefault
      ? "bg-[#FAFAF7] text-[#20221F] hover:bg-[#F2F2EC] dark:bg-[#10110F] dark:text-[#F2F3EE] dark:hover:bg-[#232520]"
      : "bg-transparent text-white hover:bg-white/10"
  } ${className}`;

  const content = href ? (
    <Link className={buttonClassName} href={href}>
      {children}
    </Link>
  ) : (
    <button className={buttonClassName} {...props}>
      {children}
    </button>
  );

  return (
    <div className="relative inline-flex w-fit">
      <div
        className="group relative w-full overflow-hidden rounded-full p-1 transition-colors"
        style={
          shimmer
            ? ({
                "--spread": "90deg",
                "--shimmer-color": "#dbbe45",
              } as CSSProperties)
            : undefined
        }
      >
        <div className="absolute -inset-px rounded-full bg-linear-to-b from-slate-500 to-slate-900" />
        <div className="absolute inset-0 rounded-full bg-linear-to-r from-slate-300/10 via-transparent to-slate-300/10" />

        {shimmer && (
          <div className="absolute inset-0 z-0 overflow-hidden rounded-full blur-[1px]">
            <div className="animate-shimmer-slide absolute inset-0 aspect-square h-full">
              <div className="animate-spin-around absolute -inset-full [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))]" />
            </div>
          </div>
        )}

        {content}
      </div>

      {isDefault && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-1 left-1/2 z-20 h-[66px] w-[187px] -translate-x-1/2 bg-linear-to-b from-transparent to-yellow-400/20 opacity-40 mix-blend-plus-lighter blur-3xl"
        />
      )}
    </div>
  );
}
