"use client";

import { motion } from "framer-motion";
import Button from "./ui/Button";

export default function CTASection() {
    return (
        <div id="cta" className="relative z-10 w-full min-h-screen flex flex-col md:flex-row bg-[#F5F5F0] pt-32">

            {/* Left: Content & Golfer Image */}
            <motion.div
                className="w-full md:w-[45%] flex flex-col justify-between relative overflow-hidden group"
                initial="initial"
                whileHover="hover"
            >
                <div className="absolute inset-0 bg-white/5 z-0" />

                {/* Image Background for Left Side */}
                <div className="absolute inset-0 z-0 opacity-100 overflow-hidden">
                    <motion.img
                        src="/Images/image5.jpg"
                        alt="Golfer Portrait"
                        className="w-full h-full object-cover"
                        variants={{
                            initial: { scale: 1, filter: "grayscale(100%)" },
                            hover: { scale: 1.1, filter: "grayscale(0%)" }
                        }}
                        transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                </div>

                <div className="relative z-10 px-8 py-16 h-full flex flex-col justify-end">
                    <h2
                        className="text-5xl md:text-7xl font-medium tracking-tight text-white leading-[1] mb-8"
                        style={{ fontFamily: '"Clash Display", sans-serif' }}
                    >
                        Ready to Elevate <br />
                        Your Game?
                    </h2>

                    <Button variant="secondary">
                        Shop Now
                    </Button>
                </div>
            </motion.div>

            {/* Right: Storefront/Lifestyle Image */}
            <motion.div
                className="w-full md:w-[55%] h-[50vh] md:h-auto relative overflow-hidden"
                initial="initial"
                whileHover="hover"
            >
                <motion.img
                    src="/Images/Image6.jpg"
                    alt="Mavik Storefront"
                    className="w-full h-full object-cover"
                    variants={{
                        initial: { scale: 1, filter: "grayscale(100%)" },
                        hover: { scale: 1.1, filter: "grayscale(0%)" }
                    }}
                    transition={{ duration: 0.5 }}
                />

                {/* Circular Logo Sign Overlay Effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#0A0F0D] rounded-full flex items-center justify-center shadow-2xl border-4 border-[#1A1F1D] z-10 pointer-events-none">
                    <img src="/Mavik-Black.svg" alt="Mavik" className="w-32 h-auto brightness-0 invert" />
                </div>
            </motion.div>
        </div>
    );
}
