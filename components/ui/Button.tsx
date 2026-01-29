"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
    children: ReactNode;
    variant?: "primary" | "secondary" | "outline";
    className?: string;
    href?: string;
    onClick?: () => void;
}

export default function Button({ children, variant = "primary", className = "", href, onClick, ...props }: ButtonProps) {
    const baseStyles = "px-10 py-4 rounded-[14px] text-sm tracking-widest transition-all duration-300 shadow-lg flex items-center justify-center w-fit cursor-pointer";

    const variants = {
        primary: "bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90",
        secondary: "bg-[var(--secondary)] text-black hover:bg-[var(--secondary)]/80",
        outline: "bg-transparent border border-white/20 text-white hover:bg-white hover:text-black",
    };

    const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

    if (href) {
        return (
            <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={href}
                className={combinedClassName}
                onClick={onClick}
                {...(props as any)}
            >
                {children}
            </motion.a>
        );
    }

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={combinedClassName}
            onClick={onClick}
            {...props}
        >
            {children}
        </motion.button>
    );
}
