"use client";

import { useEffect, useState } from "react";
import { BlockNoteSchema, createCodeBlockSpec } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import {
	BlockNoteView,
	darkDefaultTheme,
	lightDefaultTheme,
	Theme,
} from "@blocknote/mantine";
import { codeBlockOptions } from "@blocknote/code-block";
import { useTheme } from "next-themes";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { adminUploadImage } from "@/services/api";

const cyberDarkTheme: Theme = {
	...darkDefaultTheme,
	colors: {
		...darkDefaultTheme.colors,
		editor: {
			text: "var(--color-text-primary)",
			background: "transparent",
		},
		menu: {
			text: "var(--color-text-primary)",
			background: "var(--color-bg-elevated)",
		},
		tooltip: {
			text: "var(--color-text-primary)",
			background: "var(--color-bg-elevated)",
		},
		hovered: {
			text: "var(--color-text-primary)",
			background: "var(--color-bg-surface)",
		},
		selected: {
			text: "var(--color-text-primary)",
			background: "var(--color-accent-muted)",
		},
		disabled: {
			text: "var(--color-text-tertiary)",
			background: "var(--color-bg-elevated)",
		},
		shadow: "var(--shadow-lg)",
		border: "var(--color-border-subtle)",
		sideMenu: "var(--color-text-secondary)",
	},
	borderRadius: 6,
	fontFamily: "var(--font-body)",
};

const cyberLightTheme: Theme = {
	...lightDefaultTheme,
	colors: {
		...lightDefaultTheme.colors,
		editor: {
			text: "var(--color-text-primary)",
			background: "transparent",
		},
		sideMenu: "var(--color-text-secondary)",
		menu: {
			text: "var(--color-text-primary)",
			background: "var(--color-bg-elevated)",
		},
		tooltip: {
			text: "var(--color-text-primary)",
			background: "var(--color-bg-elevated)",
		},
		hovered: {
			text: "var(--color-text-primary)",
			background: "var(--color-bg-surface)",
		},
		selected: {
			text: "var(--color-text-primary)",
			background: "var(--color-accent-muted)",
		},
		disabled: {
			text: "var(--color-text-tertiary)",
			background: "var(--color-bg-elevated)",
		},
		shadow: "var(--shadow-lg)",
		border: "var(--color-border-subtle)",
	},
	borderRadius: 6,
	fontFamily: "var(--font-body)",
};

const cyberTheme = {
	light: cyberLightTheme,
	dark: cyberDarkTheme,
};

interface BlockNoteEditorProps {
	initialMarkdown?: string;
	onChange: (markdown: string) => void;
	editable?: boolean;
}

export default function BlockNoteEditor({
	initialMarkdown = "",
	onChange,
	editable = true,
}: BlockNoteEditorProps) {
	const [initialContentLoaded, setInitialContentLoaded] = useState(false);

	// Upload images to Cloudinary via the backend.
	const handleUpload = async (file: File) => {
		const { url } = await adminUploadImage(file);
		return url;
	};

	// Create the editor instance.
	const editor = useCreateBlockNote({
		uploadFile: handleUpload,
		schema: BlockNoteSchema.create().extend({
			blockSpecs: {
				codeBlock: createCodeBlockSpec(codeBlockOptions),
			},
		}),
	});

	const { resolvedTheme } = useTheme();

	// Load initial markdown into the editor.
	useEffect(() => {
		async function loadMarkdown() {
			if (initialMarkdown) {
				const blocks = await editor.tryParseMarkdownToBlocks(initialMarkdown);
				editor.replaceBlocks(editor.document, blocks);
			}
			setInitialContentLoaded(true);
		}

		if (!initialContentLoaded && editor) {
			loadMarkdown();
		}
	}, [editor, initialMarkdown, initialContentLoaded]);

	// Listen for changes and convert back to markdown.
	const handleChange = async () => {
		const markdown = await editor.blocksToMarkdownLossy(editor.document);
		onChange(markdown);
	};

	if (!initialContentLoaded) {
		return (
			<div className="flex h-32 items-center justify-center text-text-tertiary">
				<span className="font-mono text-sm animate-pulse">
					Loading editor...
				</span>
			</div>
		);
	}

	return (
		<div className="blocknote-wrapper relative min-h-125">
			<BlockNoteView
				editor={editor}
				editable={editable}
				onChange={handleChange}
				theme={resolvedTheme === "light" ? cyberLightTheme : cyberDarkTheme}
				className="min-h-full"
			/>
		</div>
	);
}
