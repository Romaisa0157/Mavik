"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Button from "./ui/Button";

export default function ExperienceSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <section ref={containerRef} className="relative z-10 w-full min-h-screen flex flex-col md:flex-row overflow-hidden">
            {/* Left: Image with Parallax */}
            <div className="w-full md:w-1/2 h-[60vh] md:h-auto relative overflow-hidden">
                <motion.img
                    src="/Images/Image1.jpg"
                    alt="Golfer finishing swing"
                    style={{ y, scale: 1.2 }}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>

            {/* Right: Content */}
            <div className="w-full md:w-1/2 min-h-[50vh] md:h-auto bg-[#0A0F0D] flex items-center justify-center px-8 py-24 relative overflow-hidden">
                {/* Background Texture */}
                <div
                    className="absolute inset-0 opacity-40 mix-blend-soft-light pointer-events-none"
                    style={{
                        backgroundImage: "url('/dark_aurora_texture.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    }}
                />

                <div className="relative z-10 max-w-md text-center md:text-left">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl font-medium tracking-tight text-white mb-6"
                        style={{ fontFamily: '"Clash Display", sans-serif' }}
                    >
                        The Experience
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-[var(--accent)] text-sm md:text-lg mb-6 tracking-[0.2em]"
                    >
                        More Than Apparel
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-[var(--accent)] text-base md:text-lg leading-relaxed mb-12 font-light"
                    >
                        We're not just selling clothes. We're selling the experience of the beautiful game—that feeling when everything clicks, when your gear works with you, when you're ready for whatever the course throws at you. Mavik is for golfers who love the game and want apparel that loves it back.
                    </motion.p>

                    <Button variant="secondary">
                        Join the Movement
                    </Button>
                </div>
            </div>
        </section>
    );
}
