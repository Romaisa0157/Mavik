"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Button from "./ui/Button";

const images = [
    "/Images/Image1.jpg",
    "/Images/Image2.jpg",
    "/Images/Image3.jpg",
    "/Images/Image4.jpg",
];

export default function ImageGridSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // We need to control width, height, x, y for each image
    // Initial State (Entrance): Right side, approx 50vw
    // Middle State (Row): 4 in a row, shrunk
    // Final State (Cover Grid): 
    // - Img 1: 100vw width, 50vh height, Top
    // - Img 2,3,4: 33.33vw width, 50vh height, Bottom

    // 0.0-0.2: Scroll in
    // 0.2-0.4: Entrance (Slide from right)
    // 0.4-0.6: Align in Row
    // 0.6-0.8: Transition to Cover Layout
    // 0.8-1.0: Hold

    // ------ Widths ------
    // Start: 40vw
    // Row: ~20vw (to fit 4)
    // End: Varied (1 = 100vw, others = 33.3vw)

    // Image 1 Width
    const w1 = useTransform(scrollYProgress, [0.3, 0.5, 0.7, 0.8], ["40vw", "20vw", "100vw", "100vw"]);
    // Image 2,3,4 Width
    const wOthers = useTransform(scrollYProgress, [0.3, 0.5, 0.7, 0.8], ["40vw", "20vw", "33.33vw", "33.33vw"]);

    // ------ Heights ------
    // Start: 40vw (~square)
    // Row: 20vw
    // End: 50vh (half screen)
    const h1 = useTransform(scrollYProgress, [0.3, 0.5, 0.7, 0.8], ["40vw", "20vw", "50vh", "50vh"]);
    const hOthers = useTransform(scrollYProgress, [0.3, 0.5, 0.7, 0.8], ["40vw", "20vw", "50vh", "50vh"]);

    // ------ X Positions ------
    // Phase 1 (Right Enter): Handled by a parent container usually, but let's do individual
    // 0.2 -> 0.3: Enter from 100vw

    // Image 1 X
    // Enter -> Center -> Left in Row -> Center of Screen (0)
    const x1 = useTransform(scrollYProgress,
        [0.1, 0.2, 0.5, 0.7, 0.8],
        ["100vw", "0vw", "-30vw", "0vw", "0vw"]
    );

    // Image 2 X
    // Enter -> Center -> Center-Left in row -> Left (-33.33vw)
    const x2 = useTransform(scrollYProgress,
        [0.1, 0.2, 0.5, 0.7, 0.8],
        ["100vw", "0vw", "-10vw", "-33.33vw", "-33.33vw"]
    );

    // Image 3 X
    // Enter -> Center -> Center-Right in row -> Center of Bottom Row (0)
    const x3 = useTransform(scrollYProgress,
        [0.1, 0.2, 0.5, 0.7, 0.8],
        ["100vw", "0vw", "10vw", "0vw", "0vw"]
    );

    // Image 4 X
    // Enter -> Center -> Right in row -> Right (+33.33vw)
    const x4 = useTransform(scrollYProgress,
        [0.1, 0.2, 0.5, 0.7, 0.8],
        ["100vw", "0vw", "30vw", "33.33vw", "33.33vw"]
    );

    // ------ Y Positions ------
    // Image 1 Y
    // Center -> Center -> Top (-25vh)
    const y1 = useTransform(scrollYProgress,
        [0.5, 0.7, 0.8],
        ["0vh", "-25vh", "-25vh"]
    );

    // Others Y
    // Center -> Center -> Bottom (+25vh)
    const yOthers = useTransform(scrollYProgress,
        [0.5, 0.7, 0.8],
        ["0vh", "25vh", "25vh"]
    );

    // Text Opacity
    const textOpacity = useTransform(scrollYProgress, [0.75, 0.85], [0, 1]);

    // Text Animations
    // Top Image: Slide Up
    const yTextTop = useTransform(scrollYProgress, [0.75, 0.85], ["20%", "0%"]);

    // Left Image: Slide In from Left
    const xTextLeft = useTransform(scrollYProgress, [0.75, 0.85], ["-20%", "0%"]);

    // Right Image: Slide In from Right
    const xTextRight = useTransform(scrollYProgress, [0.75, 0.85], ["20%", "0%"]);

    return (
        <div ref={containerRef} className="h-[400vh] relative bg-white">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                <div className="relative flex items-center justify-center w-full h-full">

                    {/* Image 1 (Top) */}
                    <motion.div
                        style={{ x: x1, y: y1, width: w1, height: h1 }}
                        className="absolute flex items-center justify-center overflow-hidden"
                    >
                        <div className="relative w-full h-full">
                            <img src={images[0]} className="w-full h-full object-cover" />
                            {/* Increased opacity for better text visibility */}
                            <div className="absolute inset-0 bg-black/20" />
                            <motion.div
                                style={{ opacity: textOpacity }}
                                className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
                            >
                                <h2 className="text-[var(--text-inverse)] text-4xl md:text-6xl font-medium tracking-tight mb-6" style={{ fontFamily: '"Clash Display", sans-serif' }}>
                                    Innovation That Moves With You
                                </h2>
                                <Button
                                    variant="secondary"
                                    className="!py-3"
                                >
                                    Shop the Collection
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Image 2 (Bottom Left) */}
                    <motion.div
                        style={{ x: x2, y: yOthers, width: wOthers, height: hOthers }}
                        className="absolute flex items-center justify-center overflow-hidden"
                    >
                        <div className="relative w-full h-full">
                            <img src={images[1]} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-[var(--overlay-medium)]" />
                            <motion.div
                                style={{ opacity: textOpacity, x: xTextLeft }}
                                className="absolute inset-0 flex items-center justify-center p-8"
                            >
                                <p className="text-[var(--text-inverse)] text-sm md:text-base font-medium leading-relaxed max-w-xs">
                                    Golf apparel hasn't meaningfully evolved in years. Too many brands chase streetwear aesthetics at the expense of what actually matters on the course: performance, comfort, and function.
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Image 3 (Bottom Center) */}
                    <motion.div
                        style={{ x: x3, y: yOthers, width: wOthers, height: hOthers }}
                        className="absolute flex items-center justify-center overflow-hidden"
                    >
                        <div className="relative w-full h-full">
                            <img src={images[2]} className="w-full h-full object-cover" />
                            {/* No text for center image as per request */}
                        </div>
                    </motion.div>

                    {/* Image 4 (Bottom Right) */}
                    <motion.div
                        style={{ x: x4, y: yOthers, width: wOthers, height: hOthers }}
                        className="absolute flex items-center justify-center overflow-hidden"
                    >
                        <div className="relative w-full h-full">
                            <img src={images[3]} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-[var(--overlay-medium)]" />
                            <motion.div
                                style={{ opacity: textOpacity, x: xTextRight }}
                                className="absolute inset-0 flex items-center justify-center p-8"
                            >
                                <p className="text-[var(--text-inverse)] text-sm md:text-base font-medium leading-relaxed max-w-xs">
                                    Mavik was built differently. Every piece is engineered with a performance-first mindset, combining premium fabrics with thoughtfully integrated magnetic innovation. No more stuffing your pockets or running back to the cart. Everything you need is built into what you're wearing, easily accessible throughout your entire round.
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
