import { BsGithub } from "react-icons/bs";

export default function Footer() {
	return (
		<div className="py-1 text-center w-full text-sm">
			<span className="opacity-50">&copy;{new Date().getFullYear()}; by </span>
			<a
				href="https://github.com/zsphinxyz/zmorse"
				target="_blank"
				className="text-blue-400 underline"
				rel="noopener"
			>
				z sphinx <BsGithub className="inline" />
			</a>
		</div>
	);
}
