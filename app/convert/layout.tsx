import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Morse to Text to Audio",
	description: "Morse to Text to Audio Converter",
	applicationName: "zmorse",
	referrer: "origin-when-cross-origin",
	keywords: [
		"morse to audio",
		"morse code audio",
		"morse code converter",
		"zmorse",
		"morse audio",
	],
	creator: "zsphinx",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
