"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Button from "./ui/Button";

export default function Navbar() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    return (
        <motion.div
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.75, ease: "easeInOut" }}
            className="fixed top-0 left-0 right-0 flex justify-center z-50 pt-8 pointer-events-none"
        >
            <motion.nav
                initial={{ y: -100, opacity: 0, width: "5%" }}
                animate={{ y: 0, opacity: 1, width: "1408px" }}
                transition={{
                    y: { duration: 1.0, ease: "easeOut" },
                    opacity: { duration: 0.5 },
                    width: { delay: 2.0, duration: 0.8, ease: "circOut" }, // Expand after dropping in
                }}
                className="pointer-events-auto flex items-center justify-between px-8 py-3 h-[58px] rounded-[13px] bg-white/5 backdrop-blur-[8.75px] max-w-[90vw]"
            >
                {/* LOGO */}
                <div className="flex items-center">
                    <img src="/Mavik-Black.svg" alt="Mavik" className="h-8 w-auto brightness-0 invert" />
                </div>

                {/* LINKS */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.6, duration: 0.5 }} // Fade in after expansion
                    className="flex items-center gap-8 text-white/80 text-sm font-medium"
                >
                    <motion.a
                        whileHover={{ scale: 1.1, color: "var(--foreground)" }}
                        whileTap={{ scale: 0.9 }}
                        href="#home" className="transition-colors">Home</motion.a>
                    <motion.a
                        whileHover={{ scale: 1.1, color: "var(--foreground)" }}
                        whileTap={{ scale: 0.9 }}
                        href="#precision" className="transition-colors">Precision</motion.a>
                    <motion.a
                        whileHover={{ scale: 1.1, color: "var(--foreground)" }}
                        whileTap={{ scale: 0.9 }}
                        href="#engineering" className="transition-colors">Engineering</motion.a>
                    <Button
                        variant="secondary"
                        href="#cta"
                        className="!px-4 !py-1.5 !text-xs !bg-[var(--text-inverse)] !text-[var(--foreground)]"
                        onClick={() => {
                            const element = document.getElementById('cta');
                            if (element) {
                                element.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                    >
                        Pre-order
                    </Button>
                </motion.div>
            </motion.nav>
        </motion.div>
    );
}
