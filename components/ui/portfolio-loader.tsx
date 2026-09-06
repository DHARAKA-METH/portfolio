"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function PortfolioLoader() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
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
          src="/logo.png"
          alt="Dharaka logo"
          width={150}
          height={150}
          priority
        />

        {/* Hide the original middle symbol. */}
        <span
          className="absolute left-[40%] top-[38%] h-[24%] w-[19%] bg-black"
          aria-hidden="true"
        />

        {/* Rotate only the isolated middle symbol. */}
        <motion.div
          className="absolute inset-0"
          style={{ transformOrigin: "50% 50%" }}
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{
            delay: 0.9,
            duration: 1.2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 0.4,
          }}
          aria-hidden="true"
        >
          <div
            className="absolute inset-0 bg-[url('/logo.png')] bg-cover bg-center"
            style={{
              clipPath: "polygon(40% 38%, 59% 38%, 59% 62%, 40% 62%)",
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}