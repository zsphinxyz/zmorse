import type { Metadata } from "next";
import { RedirectType, redirect } from "next/navigation";
import { type ReactNode, Suspense } from "react";
import GuessAudio from "@/components/guessAudio";
import GuessLetter from "@/components/guessLetter";
import GuessMorse from "@/components/guessMorse";

export const metadata: Metadata = {
	title: "Morse Code Guessr",
	description: "Guess the Morse Code, Letter and Audio",
	keywords: [
		"Morse Code Guesser",
		"guessMorse",
		"guess Morse Code",
		"Morse Code Guessing",
		"Morse Code Guess",
		"Morse Code Guessr",
	],
};

const ParamEnum = ["morse", "letter", "audio"] as const;

export default async function GuessrPage({
	searchParams,
}: {
	searchParams: Promise<{ q: (typeof ParamEnum)[number] | undefined }>;
}) {
	"use server";

	let { q } = await searchParams;
	if (!q || !ParamEnum.includes(q)) q = "morse";

	const PARAMS: Array<{
		id: number;
		param: (typeof ParamEnum)[number];
		component: ReactNode;
	}> = [
		{
			id: 0,
			param: "morse",
			component: <GuessMorse />,
		},
		{
			id: 1,
			param: "letter",
			component: <GuessLetter />,
		},
		{
			id: 2,
			param: "audio",
			component: <GuessAudio />,
		},
	];

	async function handleForm(route: string) {
		"use server";
		redirect(`/guessr?q=${route}`, RedirectType.replace);
	}

	return (
		<section className="flex w-full items-center flex-col text-white bg-slate-700 h-full">
			<div className="flex my-2">
				{PARAMS.map((p) => (
					<form key={p.id} action={handleForm.bind(null, p.param)}>
						<button
							data-active={p.param === q}
							className="bg-slate-800 data-[active=true]:bg-green-700 border border-slate-800 data-[active=true]:border-white/50 px-6 py-2 capitalize data-[active=false]:hover:border-white/50"
							type="submit"
						>
							{p.param}
						</button>
					</form>
				))}
			</div>

			<div>
				{PARAMS.filter((p) => p.param === q).map((i) => (
					<div key={i.id}>
						<Suspense fallback={""}>{i.component}</Suspense>
					</div>
				))}
			</div>
		</section>
	);
}
