"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

export function Navbar() {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <nav className={`fixed z-50 flex items-center justify-between left-1/2 -translate-x-1/2 transition-all duration-500 p-4 ${scrolled ? "lg:w-5xl w-[calc(100vw-14px)] bg-white/70 backdrop-blur-2xl rounded-full mt-4 pl-6 shadow-md border border-zinc-200/50" : "md:px-16 lg:px-24 xl:px-32 w-full"}`}>
                <a href="#" className="flex items-center gap-3">
                    <Image width={140} height={36} src="/assets/logo-nav.png" alt="Anayah Associates Logo" className={`transition-all duration-500 h-8 w-auto ${scrolled ? "brightness-0" : "brightness-0 invert"}`} />
                    <span className={`text-base font-bold tracking-tight transition-colors duration-500 ${scrolled ? "text-zinc-900" : "text-white"}`}>Anayah Associates</span>
                </a>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-6 md:gap-8 text-sm font-medium">
                    <a href="#" className={`transition-colors duration-500 ${scrolled ? "text-zinc-700 hover:text-zinc-900" : "text-white/90 hover:text-white"}`}>Home</a>
                    <a href="#stats" className={`transition-colors duration-500 ${scrolled ? "text-zinc-700 hover:text-zinc-900" : "text-white/90 hover:text-white"}`}>Overview</a>
                    <a href="#gallery" className={`transition-colors duration-500 ${scrolled ? "text-zinc-700 hover:text-zinc-900" : "text-white/90 hover:text-white"}`}>Projects</a>
                    <a href="#why-us" className={`transition-colors duration-500 ${scrolled ? "text-zinc-700 hover:text-zinc-900" : "text-white/90 hover:text-white"}`}>Why Us</a>
                    <a href="#reviews" className={`transition-colors duration-500 ${scrolled ? "text-zinc-700 hover:text-zinc-900" : "text-white/90 hover:text-white"}`}>Reviews</a>
                    <a href="#contact" className={`transition-colors duration-500 ${scrolled ? "text-zinc-700 hover:text-zinc-900" : "text-white/90 hover:text-white"}`}>Contact</a>
                </div>

                <a href="#contact" className={`hidden md:block px-5 py-2.5 rounded-[6px] text-xs font-semibold cursor-pointer transition-all duration-500 ${scrolled ? "bg-zinc-900 text-white hover:bg-zinc-800 rounded-full" : "bg-zinc-50 text-zinc-900 hover:bg-zinc-200"}`}>
                    Book Consultation
                </a>

                <button onClick={() => setMobileOpen(true)} className={`md:hidden p-2 rounded-md aspect-square font-medium transition cursor-pointer ${scrolled ? "text-zinc-800" : "text-white"}`} aria-label="Open navigation menu">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 12h16" /><path d="M4 18h16" /><path d="M4 6h16" />
                    </svg>
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`${mobileOpen ? 'max-md:w-full' : 'max-md:w-0'} md:hidden max-md:fixed max-md:top-0 max-md:z-50 max-md:left-0 max-md:transition-all max-md:duration-300 max-md:overflow-hidden max-md:h-full max-md:bg-zinc-950/95 max-md:backdrop-blur-2xl max-md:flex-col max-md:justify-center flex items-center gap-6 text-sm`}>
                <a href="#" onClick={() => setMobileOpen(false)} className="text-white text-lg font-medium">Home</a>
                <a href="#stats" onClick={() => setMobileOpen(false)} className="text-white text-lg font-medium">Overview</a>
                <a href="#gallery" onClick={() => setMobileOpen(false)} className="text-white text-lg font-medium">Projects</a>
                <a href="#why-us" onClick={() => setMobileOpen(false)} className="text-white text-lg font-medium">Why Us</a>
                <a href="#reviews" onClick={() => setMobileOpen(false)} className="text-white text-lg font-medium">Reviews</a>
                <a href="#contact" onClick={() => setMobileOpen(false)} className="text-white text-lg font-medium">Contact</a>

                <button onClick={() => setMobileOpen(false)} className="md:hidden mt-4 bg-white text-zinc-800 p-2.5 rounded-full aspect-square font-medium transition cursor-pointer" aria-label="Close navigation menu">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                    </svg>
                </button>
            </div>
        </>
    );
}
