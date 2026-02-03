"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent, useTransform, motion } from "framer-motion";
import Button from "./ui/Button";
import IntroAnimation from "./IntroAnimation";

const FRAME_COUNT = 214;
const LOADING_THRESHOLD = 0.5; // Show content after 50% frames loaded

export default function KeyboardScroll() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loadedCount, setLoadedCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    // Scroll progress 0 to 1
    const { scrollYProgress } = useScroll();

    // Preload images
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let count = 0;

        for (let i = 1; i <= FRAME_COUNT; i++) {
            const img = new Image();
            // Mavik sequence: 00001.jpg to 00192.jpg
            const filename = String(i).padStart(5, '0') + ".jpg";
            img.src = `/Mavik_Final/${filename}`;
            img.onload = () => {
                count++;
                setLoadedCount(prev => prev + 1);
                if (count === FRAME_COUNT) {
                    setIsLoading(false);
                }
            };
            loadedImages.push(img);
        }
        setImages(loadedImages);
    }, []);

    // Draw frame on canvas
    const drawFrame = (index: number) => {
        // Adjust index to be 0-based for array access
        const imgIndex = index;
        const canvas = canvasRef.current;
        if (!canvas || !images[imgIndex] || !images[imgIndex].complete) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = images[imgIndex];

        // Handle high DPI displays
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;

        ctx.fillStyle = "var(--background)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Calculate scaling to "cover" (fill screen)
        const scale = Math.max(
            canvas.width / img.width,
            canvas.height / img.height
        );

        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;

        // Use high quality image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    // Sync scroll to frame
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        // Map 0 -> 0.7 progress to 0 -> FRAME_COUNT-1
        // From 0.7 -> 1.0, it stays at last frame
        const frameProgress = Math.min(1, latest / 0.7);
        const frameIndex = Math.min(
            FRAME_COUNT - 1,
            Math.floor(frameProgress * FRAME_COUNT)
        );
        requestAnimationFrame(() => drawFrame(frameIndex));
    });

    // Initial draw when loading done
    useEffect(() => {
        if (!isLoading) {
            drawFrame(0);
        }
    }, [isLoading]);

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            // Re-draw current frame (we can approximate or track current frame in ref)
            // For simplicity in this step, we'll let next scroll event fix it or user can just scroll
            // ideally we track current index in a ref.
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Text Overlay Components
    const TextOverlay = ({ children, range, className = "" }: { children: React.ReactNode, range: [number, number], className?: string }) => {
        // Define transition buffer
        const buffer = 0.05;

        // Opacity: fade in and out
        const opacity = useTransform(
            scrollYProgress,
            [Math.max(0, range[0] - buffer), range[0], range[1], range[1] + buffer],
            [0, 1, 1, 0]
        );

        // Y positioning: Continuous movement from bottom to top
        const y = useTransform(
            scrollYProgress,
            [Math.max(0, range[0] - buffer), range[1] + buffer],
            [800, -1200]
        );

        // Scale: slight pop effect
        const scale = useTransform(
            scrollYProgress,
            [Math.max(0, range[0] - buffer), range[0], range[1], range[1] + buffer],
            [0.9, 1, 1, 0.9]
        );

        return (
            <motion.div
                className={`fixed inset-0 pointer-events-none flex items-center ${className}`}
                style={{ opacity, y, scale }}
            >
                <div className="container mx-auto px-6">
                    <div className="pointer-events-auto inline-block">
                        {children}
                    </div>
                </div>
            </motion.div>
        );
    }

    if (isLoading) {
        return (
            <div className="h-screen w-full flex flex-col items-center justify-center bg-[var(--background)]">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center"
                >
                    <motion.img
                        src="/Mavik-Black.svg"
                        alt="Mavik"
                        className="h-12 w-auto brightness-0 invert"
                        animate={{
                            scale: [1, 1.05, 1],
                            opacity: [0.6, 1, 0.6]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </motion.div>
            </div>
        );
    }



    return (
        <div ref={containerRef} className="relative h-[800vh] bg-[var(--background)]">
            <IntroAnimation />
            {/* Scroll Targets for Navbar */}
            <div id="home" className="absolute top-0" />
            <div id="precision" className="absolute top-[25%]" />
            <div id="engineering" className="absolute top-[60%]" />
            <div id="cta" className="absolute top-[90%]" />

            <div className="sticky top-0 w-full h-screen">
                <canvas
                    ref={canvasRef}
                    className="w-full h-screen object-contain"
                />
                {/* Black overlay with 15% opacity */}
                <div className="absolute inset-0 bg-black/15 pointer-events-none" />
            </div>

            {/* 0% Scroll - Centered */}
            <TextOverlay range={[0, 0.10]} className="justify-center text-center">
                <div>
                    <h1
                        className="tracking-tighter mb-4 text-center"
                        style={{
                            color: "var(--Secondary, #EDEDE5)",
                            fontFamily: '"Clash Display", sans-serif',
                            fontSize: "128px",
                            fontStyle: "normal",
                            fontWeight: 500,
                            lineHeight: "100%",
                            textAlign: "center",
                        }}
                    >
                        Engineered for the Modern Golfer
                    </h1>
                    <p className="text-white text-xl text-black/60 text-shadow: 0px 2px 17.1px 0px rgba(0, 0, 0, 0.85)">Engineered clarity.</p>
                </div>
            </TextOverlay>

            {/* Hero Bottom Product Showcase */}
            <TextOverlay range={[0.13, 0.23]}>
                <div className="flex flex-col max-w-[500px] mx-auto">
                    {/* Styled Heading */}
                    <h3 className="mb-6 text-left">
                        <span style={{
                            color: 'var(--Secondary, #EDEDE5)',
                            fontFamily: '"Clash Display", sans-serif',
                            fontSize: '48px',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.02em',
                        }}>
                            Quietly{' '}
                        </span>
                        <span style={{
                            fontFamily: '"Birthstone", cursive',
                            fontSize: '56px',
                            fontWeight: 400,
                            color: 'var(--Secondary, #EDEDE5)',
                        }}>
                            powerful
                        </span>
                        <br />
                        <span style={{
                            color: 'var(--Secondary, #EDEDE5)',
                            fontFamily: '"Clash Display", sans-serif',
                            fontSize: '48px',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.02em',
                        }}>
                            Performance
                        </span>
                    </h3>

                    {/* Body Text */}
                    <p style={{
                        color: 'var(--Secondary, #EDEDE5)',
                        fontFamily: '"JetBrains Mono", monospace',
                        fontSize: '16px',
                        fontWeight: 500,
                        lineHeight: '165%',
                        textAlign: 'left',
                        marginBottom: '32px',
                        textShadow: '0px 2px 17.1px rgba(0, 0, 0, 0.45)',
                    }}>
                        This isn't just another golf cap. Built with premium breathable fabric and structured design, the Mavik Performance Cap keeps you comfortable and focused from the first tee to the final putt. Integrated magnetic functionality means your essentials stay within reach without the bulk.
                    </p>

                    {/* CTA Button */}
                    <div className="flex justify-start">
                        <Button
                            variant="secondary"
                            className="w-[256px] h-[50px] !rounded-[14px] uppercase tracking-wider font-semibold"
                        >
                            Shop Collection
                        </Button>
                    </div>
                </div>
            </TextOverlay>

            {/* 25% Scroll - The Mavik Difference */}
            <TextOverlay range={[0.27, 0.37]} className="items-center justify-center">
                <div className="w-full px-16">
                    <div className="grid grid-cols-2 gap-16 items-center">
                        {/* Left Column - Heading & Product */}
                        <div className="flex flex-col">
                            {/* Eyebrow */}
                            <p className="text-white/60 tracking-[0.15em] text-[11px] font-semibold mb-6 uppercase">
                                The Mavik Difference
                            </p>

                            {/* Main Heading */}
                            <h2 className="mb-12" style={{
                                color: "var(--Secondary, #EDEDE5)",
                                fontFamily: '"Clash Display", sans-serif',
                                fontSize: "72px",
                                fontStyle: "normal",
                                fontWeight: 600,
                                lineHeight: "100%",
                                letterSpacing: '-0.02em',
                            }}>
                                Golf Apparel<br />That Actually<br />Does<br />Something
                            </h2>

                            {/* Product Image - Smaller size at bottom */}
                            <div className="mt-auto relative">
                                <div className="relative p-4 w-fit rounded-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl">
                                    <p className="text-white/70 text-1xl font-semibold uppercase tracking-wider">
                                        Premium Performance Fabrics
                                    </p>

                                </div>
                            </div>
                        </div>

                        {/* Right Column - Body Text & CTA */}
                        <div className="flex flex-col p-10 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl">
                            {/* Body Text */}
                            <div className="mb-10" style={{
                                color: 'var(--Secondary, #EDEDE5)',
                                fontFamily: '"JetBrains Mono", monospace',
                                fontSize: '15px',
                                fontWeight: 600,
                                lineHeight: '175%',
                                textShadow: '0px 2px 17.1px rgba(0, 0, 0, 0.45)',
                            }}>
                                <p className="mb-4">Golf clothing hasn't meaningfully evolved in years. Most brands offer the same products with different logos—prioritizing streetwear aesthetics over what actually matters on the course.</p>
                                <p>Mavik was built different. Every piece is engineered with a performance-first mindset, combining premium fabrics with innovative magnetic functionality that gives you effortless access to everything you need during your round.</p>
                            </div>

                            {/* CTA Button - Aligned to right */}
                            <div className="flex justify-end">
                                <Button
                                    variant="secondary"
                                    className="w-[200px] h-[48px] uppercase tracking-wider font-semibold text-sm"
                                >
                                    Learn More
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </TextOverlay>

            {/* 60% Scroll - Right aligned
            <TextOverlay range={[0.37, 0.50]} className="justify-end text-right">
                <div className="max-w-xl ml-auto">
                    <h2 className="tracking-tighter mb-4" style={{
                        color: "var(--Secondary, #EDEDE5)",
                        fontFamily: '"Clash Display", sans-serif',
                        fontSize: "64px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "100%",
                    }}>Layered Engineering.</h2>
                    <p className="text-white text-xl text-black/60">See what's inside.</p>
                </div>
            </TextOverlay> */}

            {/* 90% Scroll - Centered CTA
            <TextOverlay range={[0.57, 0.70]} className="justify-center text-center">
                <div className="flex flex-col items-center">
                    <h2 className="tracking-tighter mb-8"
                        style={{
                            color: "var(--foreground)",
                            fontFamily: '"Clash Display", sans-serif',
                            fontSize: "64px",
                            fontStyle: "normal",
                            fontWeight: 600,
                            lineHeight: "100%",
                            textAlign: "center",
                        }}>
                        Assembled for the Elite.
                    </h2> */}
            {/* <div className="flex gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                display: 'flex',
                                width: '240px',
                                height: '56px',
                                padding: '16px 32px',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '14px',
                                background: 'black',
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '15px'
                            }} className="transition-transform duration-300">
                            Pre-order Now
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                display: 'flex',
                                width: '240px',
                                height: '56px',
                                padding: '16px 32px',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '14px',
                                background: 'white',
                                border: '1px solid black',
                                color: 'black',
                                fontWeight: 600,
                                fontSize: '15px'
                            }} className="transition-colors duration-300">
                            View Specs
                        </motion.button>
                    </div>
                    <p className="mt-12 text-black/40 font-medium uppercase tracking-[0.2em] text-[10px]">Mavik Engineering Lab • v1.0</p>
                </div>
            </TextOverlay> */}
        </div >
    );
}
