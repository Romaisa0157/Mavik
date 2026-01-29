"use client";

import { motion } from "framer-motion";

export default function IntroAnimation() {
    return (
        <div className="fixed inset-0 z-50 flex pointer-events-none">
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ y: "0%" }}
                    animate={{ y: "-100%" }}
                    transition={{
                        duration: 1,
                        ease: [0.76, 0, 0.24, 1], // easeInOutQuart-ish
                        delay: 0.2 + i * 0.1, // Staggered delay
                    }}
                    className="w-full h-full bg-[var(--secondary)] relative"
                />
            ))}
        </div>
    );
}
