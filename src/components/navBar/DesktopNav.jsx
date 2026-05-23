import React from "react";
import { motion } from "framer-motion";
import SocialIcon from "../common/SocialIcon";
import { BLOG_URL } from "./navData";
import { FiExternalLink } from "react-icons/fi";

const DesktopNav = ({ navList, socialList, active, onClick, ThemeToggle }) => {
	return (
		<motion.div
			className="hidden lg:flex items-center justify-between w-full"
			initial={{ opacity: 0, x: 100 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: 100 }}
			transition={{ duration: 0.6, ease: "easeInOut" }}
			viewport={{ once: true }}
		>
			<nav className="flex gap-6 items-center list-none">
				{navList.map((item, index) => (
					<li key={index} onClick={() => onClick(index)}>
						<a
							href={`#${item.toLowerCase()}`}
							className={`${
								active === index ? "text-accent" : "text-primary"
							} capitalize text-md hover:text-accent/70 transition-all duration-300`}
						>
							{item}
						</a>
					</li>
				))}
				<div className="flex items-center gap-4 ml-2">
					<a
						href={BLOG_URL}
						target="_blank"
						rel="noopener noreferrer"
						className="border border-accent/50 text-accent px-4 py-1.5 rounded-md flex items-center gap-2 text-sm font-medium hover:bg-accent/10 transition-colors duration-300"
					>
						Blog
						<FiExternalLink className="text-xs" />
					</a>
					{socialList.map((social, index) => (
						<SocialIcon key={index} icon={social.icon} link={social.link} />
					))}
					{ThemeToggle}
				</div>
			</nav>
		</motion.div>
	);
};

export default DesktopNav;
