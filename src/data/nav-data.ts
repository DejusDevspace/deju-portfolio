import { TbBrandLinkedinFilled } from "react-icons/tb";
import { RiTwitterXFill } from "react-icons/ri";
import { FaGithub } from "react-icons/fa";
import { MdOutgoingMail } from "react-icons/md";
import { siteConfig } from "./site-config";
import type { SocialLink } from "@/types";

export const BLOG_URL = siteConfig.blogUrl;

export const navList: string[] = [
	"Home",
	"About",
	"Experience",
	"Projects",
	"Contact",
];

export const socialLinks: SocialLink[] = [
	{
		icon: TbBrandLinkedinFilled,
		link: siteConfig.social.linkedin,
	},
	{ icon: FaGithub, link: siteConfig.social.github },
	{ icon: RiTwitterXFill, link: siteConfig.social.twitter },
	{ icon: MdOutgoingMail, link: siteConfig.social.email },
];
