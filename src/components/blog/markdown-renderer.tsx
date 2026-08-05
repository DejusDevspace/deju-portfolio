"use client";

import { useRef, useState } from "react";
import type { ComponentPropsWithoutRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import { Check, Copy } from "lucide-react";
// Use a dark highlight.js theme that matches Cyber-Luxury well
import "highlight.js/styles/atom-one-dark.css";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Pre = ({ children, ...props }: any) => {
	const [copied, setCopied] = useState(false);
	const preRef = useRef<HTMLPreElement>(null);

	let language = "text";
	if (children?.props?.className) {
		const match = /language-(\w+)/.exec(children.props.className || "");
		if (match) {
			language = match[1];
		}
	}

	const handleCopy = () => {
		if (preRef.current) {
			navigator.clipboard.writeText(preRef.current.innerText);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}
	};

	return (
		<div className="group relative my-6 overflow-hidden rounded-md border border-border-subtle bg-bg-subtle">
			<div className="flex items-center justify-between border-b border-border-subtle bg-bg-surface px-4 py-2">
				<span className="font-mono text-xs text-text-tertiary">{language}</span>
				<button
					onClick={handleCopy}
					className="text-text-tertiary transition-colors hover:text-accent"
					aria-label="Copy code"
				>
					{copied ? (
						<Check className="h-4 w-4 text-success" />
					) : (
						<Copy className="h-4 w-4" />
					)}
				</button>
			</div>
			{/* We reset globals.css prose pre styles inside this custom block so they don't double up borders */}
			<pre
				ref={preRef}
				className="overflow-x-auto p-4 font-mono text-caption leading-relaxed bg-transparent border-none"
				{...props}
			>
				{children}
			</pre>
		</div>
	);
};

interface MarkdownRendererProps {
	content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
	return (
		<div className="prose max-w-none">
			<ReactMarkdown
				remarkPlugins={[remarkGfm]}
				rehypePlugins={[rehypeSlug, rehypeHighlight]}
				components={{
					pre: Pre,
					ul: ({ children, ...props }: ComponentPropsWithoutRef<"ul">) => (
						<ul className="list-outside list-disc pl-6" {...props}>
							{children}
						</ul>
					),
					ol: ({ children, ...props }: ComponentPropsWithoutRef<"ol">) => (
						<ol className="list-outside list-decimal pl-6" {...props}>
							{children}
						</ol>
					),
					li: ({ children, ...props }: ComponentPropsWithoutRef<"li">) => (
						<li className="pl-1 marker:text-accent" {...props}>
							{children}
						</li>
					),
				}}
			>
				{content}
			</ReactMarkdown>
		</div>
	);
}
