"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function PortfolioLoader() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.25, ease: "easeOut" } }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      aria-label="Loading Dharaka Meth portfolio"
      role="status"
    >
      <motion.div
        className="relative size-[150px] overflow-hidden rounded-4xl"
        initial={{ opacity: 0, scale: 0.85, y: 8 }}
        animate={{ opacity: 1, scale: [0.85, 1.04, 1], y: 0 }}
        exit={{ opacity: 0, y: -10, transition: { duration: 0.25 } }}
        transition={{
          delay: 0.25,
          duration: 0.75,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <Image
          className="size-full object-cover"
          src="/logo2.png"
          alt="Dharaka logo"
          width={150}
          height={150}
          priority
        />

        <span className="absolute top-[34%] left-[38%] h-[32%] w-[27%] bg-[#0D0826]" />
        <motion.span
          className="absolute inset-0 bg-[url('/logo.png')] bg-cover [clip-path:polygon(38%_34%,66%_34%,66%_66%,38%_66%)]"
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: [0, 1, 0, 1], x: [0, 0, 4, 4] }}
          transition={{ delay: 0.9, duration: 0.55, times: [0, 0.3, 0.65, 1] }}
          aria-hidden="true"
        />
      </motion.div>
    </motion.div>
  );
}
