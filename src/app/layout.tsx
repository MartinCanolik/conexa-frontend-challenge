import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "sonner";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Conexa - Challenge",
	description: "Rick and Morty",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<Toaster />
				<Providers>
					<main>{children}</main>
				</Providers>
			</body>
		</html>
	);
}
