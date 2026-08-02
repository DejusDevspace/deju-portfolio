"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

interface Option {
	value: string;
	label: string;
}

interface CustomSelectProps {
	options: Option[];
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	className?: string;
	label?: string;
}

export default function CustomSelect({
	options,
	value,
	onChange,
	placeholder = "Select an option",
	className = "",
	label,
}: CustomSelectProps) {
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const selectedOption = options.find((opt) => opt.value === value);

	// Handle click outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleSelect = (val: string) => {
		onChange(val);
		setIsOpen(false);
	};

	return (
		<div
			className={`relative flex flex-col gap-1.5 ${className}`}
			ref={containerRef}
		>
			{label && (
				<label className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-text-tertiary">
					{label}
				</label>
			)}

			<div className="relative">
				<button
					type="button"
					onClick={() => setIsOpen(!isOpen)}
					className={`flex h-10 w-full cursor-pointer items-center justify-between rounded-md border border-border-default bg-bg-subtle px-3 py-2 text-left font-mono text-xs transition-all hover:border-accent/50 ${
						isOpen ? "border-accent ring-1 ring-accent/20" : ""
					}`}
				>
					<span
						className={
							selectedOption ? "text-text-primary" : "text-text-tertiary"
						}
					>
						{selectedOption ? selectedOption.label : placeholder}
					</span>
					<ChevronDown
						size={14}
						className={`text-text-tertiary transition-transform duration-200 ${
							isOpen ? "rotate-180 text-accent" : ""
						}`}
					/>
				</button>

				{/* Dropdown Menu */}
				{isOpen && (
					<div className="absolute top-full left-0 right-0 z-50 mt-2 max-h-60 overflow-y-auto rounded-lg border border-border-default bg-bg-surface p-1 shadow-xl shadow-black/50 animate-in fade-in zoom-in duration-200 hide-scrollbar">
						{options.length === 0 ? (
							<div className="p-3 text-center font-mono text-[0.65rem] italic text-text-tertiary">
								No options available
							</div>
						) : (
							options.map((option) => (
								<button
									key={option.value}
									type="button"
									onClick={() => handleSelect(option.value)}
									className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left transition-colors ${
										value === option.value
											? "bg-accent-muted text-accent"
											: "text-text-secondary hover:bg-bg-elevated hover:text-text-primary"
									}`}
								>
									<span className="font-mono text-xs">{option.label}</span>
									{value === option.value && (
										<Check size={12} className="text-accent" />
									)}
								</button>
							))
						)}
					</div>
				)}
			</div>
		</div>
	);
}
