"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Footer() {
    return (
        <footer className="bg-black text-white pt-16 pb-8 mt-32 px-4 md:px-16 lg:px-24 xl:px-32 w-full overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-16">

                    {/* Left Brand Details */}
                    <div className="lg:col-span-7 flex flex-col items-start gap-4">
                        <div className="flex items-center gap-3">
                            <Image width={140} height={36} src="/assets/logo-nav.png" alt="Anayah Associates Logo" className="brightness-0 invert h-9 w-auto" />
                            <span className="text-xl font-bold tracking-tight text-white">Anayah Associates</span>
                        </div>
                        <p className="text-zinc-400 text-sm/5.5 max-w-md">
                            Architects &amp; Structural Consultants led by Er. Sameer Subhedar Shaikh since 2018 in Shrirampur, Ahilyanagar and across Maharashtra.
                        </p>
                        <p className="text-xs text-zinc-500 max-w-md">
                            Sai Super Market, Main Road, Shrirampur, Tal-Shrirampur, Dist-Ahilyanagar, Maharashtra 413709
                        </p>
                    </div>

                    {/* Right Link Columns */}
                    <div className="lg:col-span-5 flex justify-between gap-8 flex-wrap">
                        {/* Explore */}
                        <div className="flex flex-col gap-5">
                            <span className="text-white font-semibold text-sm">Navigation</span>
                            <div className="flex flex-col gap-3 text-xs text-zinc-300">
                                <a href="#" className="hover:text-white transition-colors duration-200">Home</a>
                                <a href="#stats" className="hover:text-white transition-colors duration-200">Overview</a>
                                <a href="#gallery" className="hover:text-white transition-colors duration-200">Projects</a>
                                <a href="#why-us" className="hover:text-white transition-colors duration-200">Why Us</a>
                                <a href="#reviews" className="hover:text-white transition-colors duration-200">Reviews</a>
                                <a href="#contact" className="hover:text-white transition-colors duration-200">Contact</a>
                            </div>
                        </div>

                        {/* Direct Contacts */}
                        <div className="flex flex-col gap-5">
                            <span className="text-white font-semibold text-sm">Connect</span>
                            <div className="flex flex-col gap-3 text-xs text-zinc-300">
                                <a href="tel:+918788731650" className="hover:text-white transition-colors duration-200">+91 87887 31650</a>
                                <a href="https://wa.me/918788731650" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">WhatsApp Er. Sameer</a>
                                <a href="mailto:anayahassociates1@gmail.com" className="hover:text-white transition-colors duration-200">anayahassociates1@gmail.com</a>
                                <a href="https://www.google.com/maps/search/?api=1&query=Anayah+Associates+Sai+Super+Market+Main+Road+Shrirampur+Ahilyanagar" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">Google Maps</a>
                            </div>
                        </div>

                        {/* Engineering Compliance */}
                        <div className="flex flex-col gap-5">
                            <span className="text-white font-semibold text-sm">Standards</span>
                            <div className="flex flex-col gap-3 text-xs text-zinc-300">
                                <span>IS-456:2000 Plain &amp; RC</span>
                                <span>IS-1893:2016 Seismic Code</span>
                                <span>MahaBPMS Town Planning</span>
                                <span>AutoDCR Compliance</span>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="w-full h-px bg-zinc-800"></div>
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-5 text-xs text-zinc-400">
                    <p>&copy; 2026 Anayah Associates. Principal: Er. Sameer Subhedar Shaikh. All rights reserved.</p>
                    <a href="#" className="hover:text-white transition-colors duration-200">&uarr; Back to top</a>
                </div>
            </div>
        </footer>
    );
}
