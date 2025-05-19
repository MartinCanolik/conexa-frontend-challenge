import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "sonner";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	display: "swap",
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
			<body className={`${jetBrainsMono.className} ${geistSans.variable}`}>
				<Toaster />
				<Providers>
					<main>{children}</main>
				</Providers>
			</body>
		</html>
	);
}
