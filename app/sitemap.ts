import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: "https://zmorse.vercel.app",
			lastModified: new Date("11,Jul,2025"),
			changeFrequency: "yearly",
			priority: 1,
		},
		{
			url: "https://zmorse.vercel.app/guessMorse",
			lastModified: new Date("11,Jul,2025"),
			changeFrequency: "monthly",
			priority: 0.5,
		},
		{
			url: "https://zmorse.vercel.app/guessLetter",
			lastModified: new Date("11,Jul,2025"),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: "https://zmorse.vercel.app/guessWord",
			lastModified: new Date("11,Jul,2025"),
			changeFrequency: "monthly",
			priority: 0.5,
		},
		{
			url: "https://zmorse.vercel.app/convert",
			lastModified: new Date("11,Jul,2025"),
			changeFrequency: "monthly",
			priority: 0.9,
		},
		{
			url: "https://zmorse.vercel.app/guessr",
			lastModified: new Date("15,Mar,2025"),
			priority: 0.9,
		},
	];
}
