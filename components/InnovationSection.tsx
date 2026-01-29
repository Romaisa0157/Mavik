"use client";

import { motion } from "framer-motion";

const features = [
    {
        title: "Premium Performance Fabrics",
        description: "Moisture-wicking, 4-way stretch, lightweight, and breathable. Engineered to keep you comfortable even in hot summers—without sacrificing durability or style. Every detail matters, from stitching to sizing."
    },
    {
        title: "Durable Build",
        description: "Engineered to withstand sun, sweat, and every condition the course throws at you"
    },
    {
        title: "Function-First Design",
        description: "Structured and supportive without movement restrictions. Built for the everyday golfer who needs their apparel to do more than just look good, it needs to perform, move, and help on every shot."
    }
];

export default function InnovationSection() {
    return (
        <section className="relative z-10 w-full min-h-screen flex items-center justify-center p-8 overflow-hidden bg-[var(--surface)]">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/Images/Image4.jpg"
                    alt="Golfer on course"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40" />
            </div>

            <div className="relative z-10 max-w-[1400px] w-full mx-auto h-full flex flex-col justify-center py-24">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 md:mb-32"
                >
                    <h2
                        className="text-5xl md:text-8xl font-medium tracking-tight text-white leading-[0.9] max-w-4xl"
                        style={{ fontFamily: '"Clash Display", sans-serif' }}
                    >
                        Performance <br />
                        <span className="text-white/80">Meets Innovation</span>
                    </h2>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full">

                    {/* Card 1 */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="md:col-span-5 md:col-start-1 bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl hover:bg-white/10 transition-colors duration-500"
                    >
                        <span className="text-[var(--primary)] font-bold text-xs uppercase tracking-widest mb-4 block">01 / Fabrics</span>
                        <h3 className="text-2xl md:text-3xl font-medium text-white mb-4">{features[0].title}</h3>
                        <p className="text-white/60 text-base leading-relaxed">{features[0].description}</p>
                    </motion.div>

                    {/* Card 2 */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="md:col-span-4 md:col-start-8 md:mt-12 bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl hover:bg-white/10 transition-colors duration-500"
                    >
                        <span className="text-[var(--primary)] font-bold text-xs uppercase tracking-widest mb-4 block">02 / Durability</span>
                        <h3 className="text-2xl md:text-3xl font-medium text-white mb-4">{features[1].title}</h3>
                        <p className="text-white/60 text-base leading-relaxed">{features[1].description}</p>
                    </motion.div>

                    {/* Card 3 */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="md:col-span-4 md:col-start-3 md:-mt-12 bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl hover:bg-white/10 transition-colors duration-500"
                    >
                        <span className="text-[var(--primary)] font-bold text-xs uppercase tracking-widest mb-4 block">03 / Engineering</span>
                        <h3 className="text-2xl md:text-3xl font-medium text-white mb-4">{features[2].title}</h3>
                        <p className="text-white/60 text-base leading-relaxed">{features[2].description}</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
