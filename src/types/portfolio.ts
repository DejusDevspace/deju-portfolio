import type { IconType } from "react-icons";

export type Theme = "dark" | "light";

export interface SocialLink {
  icon: IconType;
  link: string;
}

export interface Tool {
  name: string;
  icon: IconType;
}

export interface StackItem {
  name: string;
}

export interface ProjectLinks {
  live: string;
  github: string;
}

export interface Project {
  id: number;
  name: string;
  category: string;
  description: string;
  stack: StackItem[];
  links: ProjectLinks;
  image: string;
  docImages?: string[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  description: string;
  locationType: string;
}
