"use client";

import Button from "./ui/Button";

export default function RealGolfersSection() {
    return (
        <div className="relative z-10 bg-[var(--surface)] min-h-screen px-1">
            <div className="max-w-[1400px] mx-auto py-12 px-4 md:px-0">
                {/* Top Section: Text Content */}
                <div className="flex flex-col md:flex-row md:gap--12 mb-12">
                    <div className="flex-1">
                        <h2
                            className="text-5xl md:text-6xl font-medium tracking-tight leading-tight text-[var(--foreground)]"
                            style={{ fontFamily: '"Clash Display", sans-serif' }}
                        >
                            Built for Real <br />
                            <span className="text-[var(--primary)]">Golfers</span>
                        </h2>
                        <Button variant="primary" className="mt-8">
                            Read Our Full Story
                        </Button>
                    </div>

                    <div className="flex-1 pt-4">
                        <h3 className="text-xl font-medium mb-6 text-[var(--foreground)]">
                            Made for the Course, Not the Runway
                        </h3>
                        <p className="text-[var(--foreground-muted)] text-lg leading-relaxed mb-12">
                            Mavik isn't about looking good off the course; it's about performing on it. While other brands chase trends, we focus on what golfers actually need: apparel that breathes, moves, and functions during every round.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            {["Premium fabrics", "Thoughtful details", "Innovation that makes a difference"].map((tag, idx) => (
                                <div key={idx} className="bg-[var(--secondary)] px-4 py-2 rounded-md text-sm font-medium text-[var(--foreground)]">
                                    {tag}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Hero Image */}
                <div className="relative h-full width-full">
                    <img
                        src="/Images/image 26.png"
                        alt="Mavik Golf Balls"
                        className="object-fill width-full"
                    />

                </div>
            </div>
        </div>
    );
}
