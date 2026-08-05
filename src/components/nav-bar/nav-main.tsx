"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DesktopNav from "./desktop-nav";
import MobileNav from "./mobile-nav";
import { navList, socialLinks } from "@/data/nav-data";
import ThemeToggle from "./theme-toggle";

export default function NavMain() {
	const [isSelected, setSelected] = useState(0);

	const handleSelect = (id: number) => {
		setSelected(id);
	};

	useEffect(() => {
		const sectionIds = navList.map((item) => item.toLowerCase());
		const sections = sectionIds.map((id) => document.getElementById(id));

		const observerOptions = {
			root: null,
			rootMargin: "0px",
			threshold: 0.6,
		};

		const observerCallback: IntersectionObserverCallback = (entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const index = sectionIds.indexOf(entry.target.id);
					setSelected(index);
				}
			});
		};

		const observer = new IntersectionObserver(
			observerCallback,
			observerOptions
		);

		sections.forEach((section) => {
			if (section) observer.observe(section);
		});

		return () => {
			sections.forEach((section) => {
				if (section) observer.unobserve(section);
			});
		};
	}, []);

	return (
		<header className="fixed w-full py-4 z-20 bg-background">
			<div className="container mx-auto flex justify-between items-center px-6 xl:px-4">
				<motion.h1
					className="text-xl xl:text-2xl font-bold"
					initial={{ opacity: 0, x: -100 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6, ease: "easeInOut" }}
					viewport={{ once: true }}
				>
					Deju
				</motion.h1>
				<div className="hidden lg:flex">
					<DesktopNav
						navList={navList}
						socialList={socialLinks}
						active={isSelected}
						onClick={handleSelect}
						ThemeToggle={<ThemeToggle />}
					/>
				</div>
				<div className="lg:hidden">
					<MobileNav
						navList={navList}
						socialList={socialLinks}
						active={isSelected}
						onClick={handleSelect}
						ThemeToggle={<ThemeToggle />}
					/>
				</div>
			</div>
		</header>
	);
}
