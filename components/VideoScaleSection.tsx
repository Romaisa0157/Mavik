"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export default function VideoScaleSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Track scroll progress within this section only
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // We want a sequential Arrival -> Scale up
    // 0.0 -> 0.3: Entrance (Opacity 0 to 1, Scale static at 0.4)
    // 0.3 -> 0.7: Scale up (0.4 to 1.0, Rounded to Sharp)
    // 0.7 -> 1.0: Exit / Hold

    const scale = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0, 0, 1, 1]);

    // Border radius from rounded (48px) to sharp (0px)
    const borderRadius = useTransform(scrollYProgress, [0.4, 0.8], [48, 0]);

    // Opacity fade in during arrival
    const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

    return (
        <div
            ref={containerRef}
            className="relative h-[400vh] bg-[var(--surface)] flex items-start justify-center"
        >
            <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden">
                <motion.div
                    style={{
                        scale,
                        borderRadius,
                        opacity,
                    }}
                    className="relative w-full h-full overflow-hidden"
                >
                    <video
                        src="/Video.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    />

                    {/* Optional overlay gradient for better text visibility if needed */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </motion.div>
            </div>
        </div>
    );
}
