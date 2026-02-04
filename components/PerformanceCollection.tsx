"use client";

import { motion } from "framer-motion";

const products = [
    {
        id: 1,
        name: "Classic Golf Cap",
        price: "USD 25.00",
        image: "/nav_blue_cap.png",
        isNew: true,
        colors: ["#E7E5D8", "#1A2238"], // Cream and Navy
    },
    {
        id: 2,
        name: "Classic Golf Cap",
        price: "USD 25.00",
        image: "/golf_outfit_layflat.png",
        isNew: true,
        colors: ["#E7E5D8", "#1A2238"],
    },
    {
        id: 3,
        name: "Classic Golf Cap",
        price: "USD 25.00",
        image: "/white_golf_cap.png",
        isNew: true,
        colors: ["#E7E5D8", "#1A2238"],
    },
];

export default function PerformanceCollection() {
    return (
        <div className="relative z-10 bg-[var(--surface)] min-h-screen py-16 md:py-24 px-4 md:px-8">
            <div className="max-w-[1400px] mx-auto w-full">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
                    <h2
                        className="text-4xl md:text-6xl font-medium tracking-tight text-[var(--foreground)]"
                        style={{ fontFamily: '"Clash Display", sans-serif' }}
                    >
                        The Performance Collection
                    </h2>
                    <motion.a
                        href="#"
                        className="flex items-center gap-2 text-sm font-medium border-b border-black/30 pb-1 hover:border-black transition-colors"
                        whileHover={{ x: 5 }}
                        style={{ color: 'var(--foreground)' }}
                    >
                        Shop All
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M4.5 9L7.5 6L4.5 3"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </motion.a>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <div key={product.id} className="group cursor-pointer">
                            {/* Image Container */}
                            <div className="relative aspect-square bg-[#F5F5F0] mb-6 overflow-hidden rounded-lg">
                                {product.isNew && (
                                    <span className="absolute top-4 right-4 bg-[var(--surface)] px-3 py-1 text-xs font-medium rounded-full z-10 shadow-sm text-[var(--foreground)]">
                                        New
                                    </span>
                                )}
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            {/* Product Info */}
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-medium mb-1 text-[var(--foreground)]">{product.name}</h3>
                                    <p className="text-[var(--foreground-muted)] text-sm font-medium">
                                        {product.price}
                                    </p>
                                </div>

                                {/* Right Side: Colors & Action */}
                                <div className="flex flex-col items-end gap-4">
                                    <div className="flex gap-2">
                                        {product.colors.map((color, idx) => (
                                            <div
                                                key={idx}
                                                className="w-4 h-4 rounded-full border border-black/10"
                                                style={{ backgroundColor: color }}
                                            />
                                        ))}
                                    </div>

                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center gap-2 bg-[var(--primary)] text-[var(--text-inverse)] px-5 py-2.5 rounded-md text-xs font-medium uppercase tracking-wide opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all transform translate-y-0 md:translate-y-2 md:group-hover:translate-y-0"
                                    >
                                        Add to Cart
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="14"
                                            height="14"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                            <line x1="3" y1="6" x2="21" y2="6" />
                                            <path d="M16 10a4 4 0 0 1-8 0" />
                                        </svg>
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
