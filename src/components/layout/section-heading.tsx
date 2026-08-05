"use client";

interface SectionHeadingProps {
	text: string;
	children?: React.ReactNode;
}

export default function SectionHeading({ text, children }: SectionHeadingProps) {
	return (
		<div className="flex items-center mb-8">
			<div className="flex-grow border-b border-gray-600"></div>
			<span className="text-3xl xl:text-4xl text-accent m-4">
				{text} {children}
			</span>
			<div className="flex-grow border-b border-gray-600"></div>
		</div>
	);
}
