"use client";

import { useEffect, useState } from "react";

const text = "Open to internship opportunities";

export function InternshipStatus() {
    const [visibleCount, setVisibleCount] = useState(0);

    useEffect(() => {
        const timer = setTimeout(
            () => {
                setVisibleCount((count) =>
                    count === text.length ? 0 : count + 1
                );
            },
            visibleCount === text.length ? 1800 : visibleCount === 0 ? 600 : 65
        );

        return () => clearTimeout(timer);
    }, [visibleCount]);

    return (
        <span className="inline-flex items-center gap-2">
            <span className="status-dot size-1.5 shrink-0 rounded-full bg-[#4E8A63] dark:bg-[#78BE8F]" />

            <span className="sr-only">{text}</span>

            <span
                className="relative inline-block whitespace-nowrap text-left"
                dir="ltr"
                aria-hidden="true"
            >
                <span className="invisible">{text}</span>

                <span className="absolute left-0 top-0">
                    {text.slice(0, visibleCount)}
                </span>
            </span>

            <style jsx>{`
  .status-dot {
    animation: greenBlink 3s ease-in-out infinite;
  }

  @keyframes greenBlink {
    0%, 100% {
      opacity: 1;
      box-shadow: none;
    }

    12% {
      opacity: 0.4;
      box-shadow: none;
    }

    24%, 90% {
      opacity: 1;
      background-color: #a3e6b5;
      box-shadow: 0 0 6px rgba(163, 230, 181, 0.55);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .status-dot {
      animation: none;
    }
  }
`}</style>
        </span>
    );
}