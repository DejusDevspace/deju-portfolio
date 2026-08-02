import NavMain from "@/components/nav-bar/nav-main";
import HeroMain from "@/components/hero-section/hero-main";
import AboutMain from "@/components/about-section/about-main";
import ExperienceMain from "@/components/experience-section/experience-main";
import ProjectMain from "@/components/project-section/project-main";
import ContactMain from "@/components/contact-section/contact-main";
import Footer from "@/components/layout/footer";

export default function HomePage() {
	return (
		<div className="relative flex flex-col overflow-x-hidden z-0">
			<NavMain />
			<main className="relative z-10 flex-grow flex flex-col justify-center items-center">
				<section id="home">
					<HeroMain />
				</section>
				<section id="about">
					<AboutMain />
				</section>
				<section id="experience">
					<ExperienceMain />
				</section>
				<section id="projects">
					<ProjectMain />
				</section>
				<div id="contact">
					<ContactMain />
				</div>
				<Footer />
			</main>
		</div>
	);
}
