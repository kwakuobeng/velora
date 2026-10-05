import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter=Inter({subsets:["latin"],variable:"--font-inter",display:"swap"});
export const metadata:Metadata={title:"Velora",description:"Velora M0 application scaffold"};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en" className={inter.variable}><body>{children}</body></html>;}
