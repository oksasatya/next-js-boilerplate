"use client";

import { useLoadingStore } from "@/lib/loading-store";
import { motion, AnimatePresence } from "framer-motion";

export function GlobalLoading() {
  const { isLoading } = useLoadingStore();

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm dark:bg-gray-900/80"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="dark:bg-gray-9 flex flex-col items-center gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-800"
          >
            {/* Animated Loading Spinner */}
            <div className="relative">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[#00c6ff]/20 to-[#0072ff]/20 dark:from-blue-500/20 dark:to-cyan-500/20"></div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="bg-r absolute inset-0 h-12 w-12 rounded-full border-2 border-transparent border-t-[#00c6ff] dark:border-t-blue-400"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-1 h-10 w-10 rounded-full border-2 border-transparent border-b-[#0072ff] dark:border-b-cyan-400"
              />
            </div>

            {/* Loading Text */}
            <div className="text-center">
              <p className="bg-gradient-to-r from-[#00c6ff] to-[#0072ff] bg-clip-text text-lg font-semibold text-transparent dark:from-blue-400 dark:to-cyan-400">
                Loading...
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Please wait while we prepare your content
              </p>
            </div>

            {/* Animated Dots */}
            <div className="flex space-x-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -8, 0],
                    backgroundColor: ["#00c6ff", "#0072ff", "#00c6ff"],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  className="h-2 w-2 rounded-full bg-[#00c6ff] dark:bg-blue-400"
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
