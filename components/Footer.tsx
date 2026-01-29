"use client";

import { motion } from "framer-motion";
import Button from "./ui/Button";

export default function Footer() {
    return (
        <footer className="relative w-full overflow-hidden flex flex-col">

            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/Images/Footer.png"
                    alt="Footer Background"
                    className="w-full h-full object-cover"
                />
                {/* Overlay to ensure text readability */}
                <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Glassmorphism Content Box */}
            <div className="relative z-10 w-full mx-auto backdrop-blur-[29px] bg-white/5 p-12 md:p-16 mb-16 rounded-b-[32px]">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-20">

                    {/* Column 1: Logo */}
                    <div className="flex items-start">
                        <img src="/Mavik-Black.svg" alt="Mavik" className="h-14 w-auto brightness-0 invert" />
                    </div>

                    {/* Column 2: Discover */}
                    <div>
                        <h4 className="text-xl font-medium mb-8 text-white" style={{ fontFamily: '"Clash Display", sans-serif' }}>Discover</h4>
                        <ul className="flex flex-col gap-4 text-white/80 text-[15px]">
                            <li><a href="#" className="hover:text-white transition-all underline-offset-4 hover:underline">Home</a></li>
                            <li><a href="#" className="hover:text-white transition-all underline-offset-4 hover:underline">Shop All</a></li>
                            <li><a href="#" className="hover:text-white transition-all underline-offset-4 hover:underline">Contact</a></li>
                            <li><a href="#" className="hover:text-white transition-all underline-offset-4 hover:underline">Shipping & Returns</a></li>
                            <li><a href="#" className="hover:text-white transition-all underline-offset-4 hover:underline">Terms & Conditions</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Questions? */}
                    <div>
                        <h4 className="text-xl font-medium mb-8 text-white" style={{ fontFamily: '"Clash Display", sans-serif' }}>Questions?</h4>
                        <ul className="flex flex-col gap-4 text-white/80 text-[15px]">
                            <li><a href="#" className="hover:text-white transition-all underline-offset-4 hover:underline">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Our Mission & Newsletter */}
                    <div>
                        <h4 className="text-xl font-medium mb-6 text-white" style={{ fontFamily: '"Clash Display", sans-serif' }}>Our Mission</h4>
                        <p className="text-white/70 text-[14px] leading-relaxed mb-10 max-w-sm">
                            Bringing real innovation and consistency back to golf apparel. We engineer performance-first gear with magnetic innovation, giving every golfer a helping hand on the course—because you deserve apparel that functions as well as it looks.
                        </p>

                        <h4 className="text-xl font-medium mb-6 text-white" style={{ fontFamily: '"Clash Display", sans-serif' }}>Subscribe to our Newsletter</h4>
                        <div className="relative max-w-md group">
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full bg-white/10 border border-white/40 rounded-[12px] px-5 py-4 text-sm text-white focus:outline-none focus:border-white transition-colors"
                            />
                            <Button
                                variant="secondary"
                                className="absolute right-1.5 top-1/2 -translate-y-1/2 !py-2.5 !px-6 !rounded-[10px] text-[10px]"
                            >
                                Submit
                            </Button>
                        </div>

                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-white/60 text-sm">© MAVIK. All rights reserved..</p>

                    <div className="flex items-center gap-6">
                        {/* X (Twitter) */}
                        <a href="#" className="text-white hover:opacity-70 transition-opacity">
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                        </a>
                        {/* LinkedIn */}
                        <a href="#" className="text-white hover:opacity-70 transition-opacity">
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 448 512"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" /></svg>
                        </a>
                        {/* Facebook */}
                        <a href="#" className="text-white hover:opacity-70 transition-opacity">
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 320 512"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" /></svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
