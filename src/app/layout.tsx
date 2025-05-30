import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import Header from '@/components/layout/Header';
import React from "react";
import { getCurrentSession } from "@/actions/auth";
import { SanityLive } from "@/sanity/lib/live";
import HeaderCategorySelector from "@/components/layout/HeaderCategorySelector";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const RootLayout = async ({
  children, 
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { user } = await getCurrentSession();

 
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-white min-h-[125vh]`}> 
        <Header 
        user={user}
        categorySelector={<HeaderCategorySelector/>}
        />
        {children}

        <SanityLive />
      </body>
    </html>
  );
}

export default RootLayout;

