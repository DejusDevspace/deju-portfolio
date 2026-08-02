"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import SectionHeading from "../layout/section-heading";
import { siteConfig } from "@/data/site-config";

const ContactBackgroundScene = dynamic(
	() => import("./contact-background-scene"),
	{ ssr: false }
);

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const EMAILJS_RESPONSE_TEMPLATE_ID =
	process.env.NEXT_PUBLIC_EMAILJS_RESPONSE_TEMPLATE_ID ?? "";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

interface FormData {
	name: string;
	email: string;
	message: string;
}

type Status = "sending" | "success" | "error" | null;

const emptyForm: FormData = { name: "", email: "", message: "" };

export default function ContactMain() {
	const [formData, setFormData] = useState<FormData>(emptyForm);
	const [status, setStatus] = useState<Status>(null);

	const resetFormData = () => {
		setFormData(emptyForm);
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setStatus("sending");

		const messageTemplateParams = {
			from_name: formData.name,
			from_email: formData.email,
			message: formData.message,
		};

		const responseTemplateParams = {
			from_name: siteConfig.fullName,
			to_name: formData.name,
			from_email: siteConfig.email,
			to_email: formData.email,
			from_site: siteConfig.siteUrl,
		};

		// Message to me
		emailjs
			.send(
				EMAILJS_SERVICE_ID,
				EMAILJS_TEMPLATE_ID,
				messageTemplateParams,
				EMAILJS_PUBLIC_KEY
			)
			.then(
				(response) => {
					console.log("SUCCESS!", response.status, response.text);
					setStatus("success");
					toast.success("🚀 Message sent successfully!");

					resetFormData();
				},
				(error) => {
					console.error("FAILED...", error);
					setStatus("error");
					toast.error("❌ Failed to send message. Please try again.");
				}
			);

		// Message to sender
		emailjs
			.send(
				EMAILJS_SERVICE_ID,
				EMAILJS_RESPONSE_TEMPLATE_ID,
				responseTemplateParams,
				EMAILJS_PUBLIC_KEY
			)
			.then(
				(response) => {
					console.log("SUCCESS!", response.status, response.text);
					setStatus("success");
					resetFormData();
				},
				(error) => {
					console.error("FAILED...", error);
					setStatus("error");
				}
			);
	};

	return (
		<div className="relative min-h-[100vh] w-[100vw] overflow-hidden">
			<ContactBackgroundScene />
			<div className="relative z-10 container mx-auto flex flex-col items-center gap-4 py-12 xl:py-24 px-4">
				<div className="w-full xl:mx-[10%] xl:px-[10%]">
					<motion.div
						initial={{ opacity: 0, y: 60 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, ease: "easeIn" }}
						viewport={{ once: true, amount: 0.1 }}
					>
						<SectionHeading text="contact">
							<span className="text-accent">me</span>
						</SectionHeading>
					</motion.div>
					<motion.div
						className="flex flex-col items-center justify-center mt-6"
						initial={{ opacity: 0, y: 100 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2, duration: 0.6, ease: "easeInOut" }}
						viewport={{ once: true, amount: 0.2 }}
					>
						<form
							className="w-full max-w-2xl mt-12 bg-secondary backdrop-blur-lg rounded-3xl border border-primary/10 p-8 xl:hover:shadow-[0_0_20px_5px_var(--color-neonBlue)] flex flex-col gap-6
              transition-all duration-300"
							onSubmit={handleSubmit}
						>
							<div className="flex flex-col gap-2">
								<h3 className="text-accent">Let&apos;s Connect!</h3>
								<p className="text-sm uppercase text-primary/50">
									I&apos;m always open to discussing new projects, creative ideas, or
									opportunities, feel free to reach out. I would love to hear
									from you!
								</p>
							</div>

							<div>
								<label className="block text-sm uppercase tracking-widest text-[var(--color-neonBlue)] mb-2">
									Name
								</label>
								<input
									name="name"
									type="text"
									placeholder="Your name"
									className="w-full px-4 py-3 bg-secondary/30 text-primary border border-primary/20 rounded-lg placeholder:text-primary/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-neonBlue)]"
									value={formData.name}
									onChange={handleInputChange}
									required
								/>
							</div>

							<div>
								<label className="block text-sm uppercase tracking-widest text-[var(--color-neonBlue)] mb-2">
									Email
								</label>
								<input
									name="email"
									type="email"
									placeholder="Your email address"
									className="w-full px-4 py-3 bg-secondary/30 text-primary border border-primary/20 rounded-lg placeholder:text-primary/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-neonBlue)]"
									value={formData.email}
									onChange={handleInputChange}
									required
								/>
							</div>

							<div>
								<label className="block text-sm uppercase tracking-widest text-[var(--color-neonBlue)] mb-2">
									Message
								</label>
								<textarea
									name="message"
									rows={5}
									placeholder="Tell me something great..."
									className="w-full px-4 py-3 bg-secondary/30 text-primary border border-primary/20 rounded-lg
              placeholder:text-primary/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-neonBlue)] resize-none"
									value={formData.message}
									onChange={handleInputChange}
									required
								></textarea>
							</div>

							<button
								type="submit"
								disabled={status === "sending"}
								className="self-start px-6 py-3 mt-4 bg-[var(--color-neonBlue)] text-secondary font-bold rounded-lg
            cursor-pointer shadow-[var(--shadow-neon)] hover:scale-105 transition-all duration-300"
							>
								{status === "sending" ? "Sending..." : "Send Message 🚀"}
							</button>
						</form>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
