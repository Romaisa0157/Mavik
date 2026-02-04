"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";

// Icons
const SearchIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);

const CartIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <path d="M16 10a4 4 0 0 1-8 0"></path>
    </svg>
);

const ChevronDown = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m6 9 6 6 6-6" />
    </svg>
);

const CloseIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

const MenuIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="12" x2="20" y2="12"></line>
        <line x1="4" y1="6" x2="20" y2="6"></line>
        <line x1="4" y1="18" x2="20" y2="18"></line>
    </svg>
);

export default function Navbar() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [isShopOpen, setIsShopOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150 && !isShopOpen && !isSearchOpen && !isMobileMenuOpen) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    useEffect(() => {
        if (isSearchOpen || isMobileMenuOpen) {
            if (isSearchOpen) searchInputRef.current?.focus();
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isSearchOpen, isMobileMenuOpen]);

    const shopCategories = [
        { title: "Featured", links: ["Best Sellers", "Shop All"] },
        { title: "Categories", links: ["Pants", "Shorts", "Caps", "Accessories"] }
    ];

    const popularSearches = ["Caps", "Shorts", "Pants"];

    return (
        <>
            {/* Main Navbar */}
            <motion.div
                variants={{
                    visible: { y: 0 },
                    hidden: { y: "-100%" },
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.75, ease: "easeInOut" }}
                className="fixed top-0 left-0 right-0 flex justify-center z-50 pt-4 md:pt-8 pointer-events-none px-4 md:px-0"
            >
                <motion.nav
                    initial={{ y: -100, opacity: 0, width: "50%" }}
                    animate={{ y: 0, opacity: 1, width: "100%" }}
                    transition={{
                        y: { duration: 1.0, ease: "easeOut" },
                        opacity: { duration: 0.5 },
                        width: { delay: 0.5, duration: 0.8, ease: "circOut" },
                    }}
                    className="pointer-events-auto flex items-center justify-between px-6 md:px-8 py-3 h-[58px] rounded-[13px] bg-[#24471D]/90 md:bg-[#24471D]/65 backdrop-blur-[45px] w-full max-w-[95vw] md:max-w-7xl relative"
                >
                    {/* LOGO */}
                    <div className="flex items-center">
                        <img src="/Mavik-Black.svg" alt="Mavik" className="h-6 md:h-8 w-auto brightness-0 invert" />
                    </div>

                    {/* MOBILE ACTIONS */}
                    <div className="flex md:hidden items-center gap-4 text-white">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="hover:text-white/70 transition-colors"
                        >
                            <SearchIcon />
                        </button>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-white focus:outline-none"
                        >
                            {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                        </button>
                    </div>

                    {/* DESKTOP ACTIONS (Right Aligned) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                        className="hidden md:flex items-center gap-10"
                    >
                        <div
                            className="relative"
                            onMouseEnter={() => setIsShopOpen(true)}
                            onMouseLeave={() => setIsShopOpen(false)}
                        >
                            <button className="flex items-center gap-2 text-white text-sm font-medium transition-colors hover:text-white/70">
                                Shop <ChevronDown />
                            </button>

                            {/* Mega Menu Dropdown */}
                            <AnimatePresence>
                                {isShopOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                        className="absolute top-[calc(100%+30px)] right-0 w-[800px] bg-white rounded-[20px] shadow-2xl overflow-hidden p-8 flex gap-12 text-black"
                                    >
                                        <div className="flex gap-16 flex-grow pt-4">
                                            {shopCategories.map((cat, i) => (
                                                <div key={i} className="flex flex-col gap-6">
                                                    <h4 className="text-[#6B6B6B] text-lg font-medium tracking-tight mb-2">{cat.title}</h4>
                                                    <div className="flex flex-col gap-4">
                                                        {cat.links.map((link, j) => (
                                                            <a
                                                                key={j}
                                                                href="#"
                                                                className="text-base font-medium transition-colors text-[#1B3022] hover:text-[#1B3022]/70"
                                                            >
                                                                {link}
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="w-[180px] h-[240px] rounded-xl overflow-hidden shadow-lg">
                                                <img src="/Images/image1.jpg" alt="Featured 1" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="w-[180px] h-[240px] rounded-xl overflow-hidden shadow-lg">
                                                <img src="/Images/image2.jpg" alt="Featured 2" className="w-full h-full object-cover" />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* ICONS */}
                        <div className="flex items-center gap-6 text-white">
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="hover:text-white/70 transition-colors"
                            >
                                <SearchIcon />
                            </button>
                            <button className="hover:text-white/70 transition-colors">
                                <CartIcon />
                            </button>
                        </div>
                    </motion.div>
                </motion.nav>
            </motion.div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-[#24471D] pt-24 px-6 md:hidden"
                    >
                        <div className="flex flex-col gap-8">
                            {/* Mobile Navigation Links */}
                            {shopCategories.map((cat, i) => (
                                <div key={i} className="flex flex-col gap-4">
                                    <h4 className="text-white/60 text-sm font-medium tracking-widest uppercase">{cat.title}</h4>
                                    <div className="flex flex-col gap-3 pl-2">
                                        {cat.links.map((link, j) => (
                                            <a
                                                key={j}
                                                href="#"
                                                className="text-2xl font-medium text-white hover:text-white/70 transition-colors"
                                            >
                                                {link}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <div className="mt-8 pt-8 border-t border-white/20">
                                <a href="#" className="flex items-center gap-3 text-white text-xl font-medium">
                                    <CartIcon /> Cart
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>


            {/* Search Overlay */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-xl flex items-start justify-center pt-32 px-4"
                    >
                        <motion.div
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -50, opacity: 0 }}
                            className="w-full max-w-5xl px-0 md:px-8"
                        >
                            <div className="relative flex items-center border-b-[0.5px] border-white/80 pb-4 mb-8">
                                <span className="text-white/80 mr-4">
                                    <SearchIcon />
                                </span>
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    placeholder="Search..."
                                    className="bg-transparent border-none text-white text-2xl md:text-4xl font-medium outline-none w-full placeholder:text-white/80"
                                />
                                <button
                                    onClick={() => setIsSearchOpen(false)}
                                    className="text-white/80 hover:text-white transition-colors ml-4"
                                >
                                    <CloseIcon />
                                </button>
                            </div>

                            <div>
                                <h5 className="text-white/80 text-xs uppercase tracking-widest mb-6 font-medium">Popular Searches</h5>
                                <div className="flex flex-wrap gap-3">
                                    {popularSearches.map((tag, i) => (
                                        <button
                                            key={i}
                                            className="px-6 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-all"
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
