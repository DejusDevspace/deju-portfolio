"use client";

import type { IconType } from "react-icons";

interface SocialIconProps {
	icon: IconType;
	link: string;
	className?: string;
}

export default function SocialIcon({
	icon: Icon,
	link,
	className,
}: SocialIconProps) {
	return (
		<a
			href={link}
			target="_blank"
			rel="noopener noreferrer"
			className="hover:text-accent transition-all duration-300"
		>
			<Icon className={className ? className : "text-[20px]"} />
		</a>
	);
}
