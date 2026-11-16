"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const houseImage = "/assets/house.png";

export function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [projectType, setProjectType] = useState("Residential Villa");
    const [location, setLocation] = useState("");
    const [message, setMessage] = useState("");

    const handleWhatsAppSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const text = `Hello Er. Sameer Shaikh,\n\nI want to enquire about architectural & engineering services:\n• Name: ${name}\n• Phone: ${phone}\n${email ? `• Email: ${email}\n` : ''}• Project Type: ${projectType}\n${location ? `• Location: ${location}\n` : ''}${message ? `• Requirements: ${message}\n` : ''}\nPlease let me know your availability.`;
        window.open(`https://wa.me/918788731650?text=${encodeURIComponent(text)}`, "_blank");
    };

    return (
        <section id="contact" className="py-20 w-full flex items-center justify-center">
            <div className="max-w-5xl w-full mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

                {/* Left Column: Contact Form */}
                <div className="flex flex-col">
                    <motion.div className="flex items-center gap-1.5"
                        initial={{ y: -20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                    >
                        <span className="size-1.5 bg-zinc-900"></span>
                        <span className="text-sm text-zinc-900 font-semibold tracking-wider">
                            CONTACT US
                        </span>
                    </motion.div>

                    <motion.h2 className="text-3xl md:text-[40px]/11 text-zinc-900 mt-5 leading-tight font-medium max-w-[400px]"
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 240, damping: 70, mass: 1 }}
                    >
                        Connect with us <br />to plan your project
                    </motion.h2>

                    {/* Form */}
                    <form className="mt-10 flex flex-col gap-6" onSubmit={handleWhatsAppSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="flex flex-col">
                                <label className="text-xs font-semibold text-zinc-600 mb-2 tracking-wider">YOUR NAME *</label>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Rahul Sharma" required className="w-full border border-zinc-200 rounded-sm px-4 py-2.5 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-300 transition-colors" />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-xs font-semibold text-zinc-600 mb-2 tracking-wider">PHONE NUMBER *</label>
                                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g. 9876543210" required className="w-full border border-zinc-200 rounded-sm px-4 py-2.5 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-300 transition-colors" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="flex flex-col">
                                <label className="text-xs font-semibold text-zinc-600 mb-2 tracking-wider">EMAIL ADDRESS</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="yourname@gmail.com" className="w-full border border-zinc-200 rounded-sm px-4 py-2.5 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-300 transition-colors" />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-xs font-semibold text-zinc-600 mb-2 tracking-wider">TYPE OF PROJECT</label>
                                <select value={projectType} onChange={(e) => setProjectType(e.target.value)} className="w-full border border-zinc-200 rounded-sm px-4 py-2.5 text-xs text-zinc-800 bg-white focus:outline-none focus:border-zinc-300 transition-colors">
                                    <option value="Residential Villa">Home / Bungalow / Villa</option>
                                    <option value="Commercial Complex">Commercial Hotel / Shopping Complex</option>
                                    <option value="Industrial PEB Plant">Industrial PEB Plant</option>
                                    <option value="BPMS Sanction Only">MahaBPMS Sanction Only</option>
                                    <option value="3D Elevation & Structure">3D Front View &amp; Concrete Design</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-xs font-semibold text-zinc-600 mb-2 tracking-wider">PLOT LOCATION / AREA</label>
                            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Shrirampur / Rahuri / 2,500 sq.ft." className="w-full border border-zinc-200 rounded-sm px-4 py-2.5 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-300 transition-colors" />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-xs font-semibold text-zinc-600 mb-2 tracking-wider">MESSAGE / SPECIAL REQUIREMENTS</label>
                            <textarea rows={3} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us about your requirements, floors, budget, or preferred meeting date..." className="w-full border border-zinc-200 rounded-sm px-4 py-2.5 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-300 transition-colors" />
                        </div>

                        <div className="flex gap-4 mt-2">
                            <button type="submit" className="bg-zinc-950 hover:bg-zinc-900 text-white px-7 py-3 rounded-md text-xs font-semibold transition cursor-pointer">
                                Send on WhatsApp
                            </button>
                            <a href="mailto:anayahassociates1@gmail.com" className="border border-zinc-300 text-zinc-800 px-6 py-3 rounded-md text-xs font-semibold hover:border-zinc-800 transition">
                                Email Directly
                            </a>
                        </div>
                    </form>
                </div>

                {/* Right Column: Office & Engineer Info */}
                <div className="flex flex-col gap-6 lg:mt-16">
                    <div className="bg-zinc-50 border border-zinc-200/80 p-6 rounded-xl flex flex-col gap-3">
                        <span className="text-xs font-semibold text-amber-700 tracking-wider uppercase">Head Structural Consultant</span>
                        <h3 className="text-lg font-bold text-zinc-900">Er. Sameer Subhedar Shaikh</h3>
                        <p className="text-xs text-zinc-600 leading-relaxed">
                            Founder &amp; Principal Consultant at Anayah Associates since 2018 with 60+ delivered residential, commercial and industrial landmarks across Maharashtra.
                        </p>
                    </div>

                    <div className="bg-zinc-50 border border-zinc-200/80 p-6 rounded-xl flex flex-col gap-3">
                        <span className="text-xs font-semibold text-zinc-800 tracking-wider uppercase">Head Office</span>
                        <p className="text-xs text-zinc-600 leading-relaxed">
                            Anayah Associates, Sai Super Market, Main Road, Shrirampur, Tal-Shrirampur, Dist-Ahilyanagar, Maharashtra 413709
                        </p>
                        <div className="flex flex-col gap-1.5 mt-2 text-xs font-medium text-zinc-800">
                            <a href="tel:+918788731650" className="hover:text-amber-700">Phone: +91 87887 31650</a>
                            <a href="mailto:anayahassociates1@gmail.com" className="hover:text-amber-700">Email: anayahassociates1@gmail.com</a>
                            <a href="https://www.google.com/maps/search/?api=1&query=Anayah+Associates+Sai+Super+Market+Main+Road+Shrirampur+Ahilyanagar" target="_blank" rel="noopener noreferrer" className="text-amber-800 font-semibold mt-1 hover:underline">
                                View on Google Maps &rarr;
                            </a>
                        </div>
                    </div>

                    <div className="relative h-48 rounded-xl overflow-hidden shadow-sm">
                        <Image src={houseImage} alt="Anayah Landmark Project" fill className="object-cover" />
                    </div>
                </div>

            </div>
        </section>
    );
}
