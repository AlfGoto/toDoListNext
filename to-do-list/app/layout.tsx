import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "In Progress",
    description: "a to do App made by AlfGoto. This webapp is in constant developpment so feel free to use it as you please !",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <section>{children}</section>
            </body>
        </html>
    );
}
