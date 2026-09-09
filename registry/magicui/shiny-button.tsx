import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ShinyButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  className?: string;
  href?: string;
  hover?: boolean;
  shine?: boolean;
};

export function ShinyButton({ children, className = "", hover = true, href, shine = true, ...props }: ShinyButtonProps) {
  const hoverClassName = hover ? "transition duration-200 hover:-translate-y-0.5 hover:border-[#F97316] hover:bg-[#F97316] hover:text-white dark:hover:border-[#FF7043] dark:hover:bg-[#FF7043] dark:hover:text-white" : "";
  const buttonClassName = `group relative inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-full border border-[#D8DAD4] bg-[#FAFAF7] px-5 font-bold text-[#20221F] dark:border-[#363932] dark:bg-[#10110F] dark:text-[#F2F3EE] ${hoverClassName} ${className}`;
  const content = <>{shine && <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-linear-to-r from-transparent via-white/70 to-transparent animate-[shiny-button_3s_ease-in-out_infinite] motion-reduce:animate-none dark:via-white/20" />}<span className="relative z-10 inline-flex items-center gap-2">{children}</span></>;

  if (href) return <Link className={buttonClassName} href={href}>{content}</Link>;
  return <button className={buttonClassName} {...props}>{content}</button>;
}
