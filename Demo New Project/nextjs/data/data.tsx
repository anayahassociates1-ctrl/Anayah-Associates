import React from "react";
import { ShieldCheck, MapPin, Handshake, Landmark, Headset } from "lucide-react";

export interface WhyChooseUsItem {
    icon: React.ReactNode;
    title: string;
    description: string;
    image: string;
}

export const whyChooseUsData: WhyChooseUsItem[] = [
    {
        icon: <ShieldCheck className="size-5 text-zinc-600" />,
        title: "Transparent Itemized Estimation",
        description: "Clear item-by-item estimates with zero hidden margins. Every kilogram of steel, bag of UltraTech cement, and labour hour is counted to the rupee.",
        image: "/assets/house.png"
    },
    {
        icon: <MapPin className="size-5 text-zinc-600" />,
        title: "Qualified Civil Engineer on Site",
        description: "A qualified civil engineer directly inspects foundation excavation, column layout, plinth beams, and slab casting before every concrete pour.",
        image: "/assets/galleryImage1.png"
    },
    {
        icon: <Handshake className="size-5 text-zinc-600" />,
        title: "Guaranteed On-Time Project Handover",
        description: "We follow structured milestone schedules and proactive material procurement, ensuring keys are handed over strictly as committed.",
        image: "/assets/galleryImage2.png"
    },
    {
        icon: <Landmark className="size-5 text-zinc-600" />,
        title: "Statewide MahaBPMS & Town Planning",
        description: "In-depth expertise in Maharashtra Town Planning regulations, AutoDCR digital municipal filings, and seamless approvals across Ahilyanagar district.",
        image: "/assets/galleryImage3.png"
    },
    {
        icon: <Headset className="size-5 text-zinc-600" />,
        title: "IS-Code Earthquake-Resistant Design",
        description: "Structural engineering calculated to IS 456:2000 and IS 1893:2016 for seismic Zone-III soil safety, safeguarding your family for generations.",
        image: "/assets/galleryImage4.png"
    }
];

export interface TestimonialItem {
    name: string;
    location: string;
    avatar: string;
    text: string;
}

export const testimonialsCol1: TestimonialItem[] = [
    {
        name: "Mr. Aasif Bhai Shaikh",
        location: "Islampura, Shrirampur",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=120&h=120&q=80",
        text: "Er. Sameer Shaikh designed our bungalow with incredible attention to detail. The 3D elevation looked identical to the finished house. Highly recommended!"
    },
    {
        name: "Dr. Anand Kulkarni",
        location: "Ahilyanagar District",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&w=120&h=120&q=80",
        text: "From town planning MahaBPMS sanction to RC structural design, everything was handled transparently and without delays. Top quality engineering."
    },
    {
        name: "Mr. Ganesh Patel",
        location: "Shrirampur (Industry Owner)",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=crop&w=120&h=120&q=80",
        text: "Our seed oil industrial plant required heavy structural analysis and PEB drawings. Anayah Associates delivered with 100% precision."
    }
];

export const testimonialsCol2: TestimonialItem[] = [
    {
        name: "Er. Nitin Jadhav",
        location: "Rahuri, Maharashtra",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?fit=crop&w=120&h=120&q=80",
        text: "The structural drawings and beam-column reinforcement detailing for our residential complex were flawless according to IS 456."
    },
    {
        name: "Mrs. Sujata Patil",
        location: "Pune / Shrirampur",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=120&h=120&q=80",
        text: "Vastu-compliant floor plan and wonderful natural lighting throughout our villa. The on-site engineer was present during every slab casting."
    },
    {
        name: "Mr. Irfan Pathan",
        location: "Deolali Pravara",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?fit=crop&w=120&h=120&q=80",
        text: "Clear pricing with no hidden surprises. The project was completed right on the promised schedule. Very trustworthy team!"
    }
];
