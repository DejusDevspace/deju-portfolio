import React, { useState } from "react";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import SectionHeading from "../layout/SectionHeading";
import ContactBackgroundScene from "./ContactBackgroundScene";

const ContactMain = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  const resetFormData = () => {
    setFormData({ name: "", email: "", message: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");

    const messageTemplateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    };

    const responseTemplateParams = {
      from_name: "Ojomideju Adejo",
      to_name: formData.name,
      from_email: "ojomideju2003@gmail.com",
      to_email: formData.email,
      from_site: "https://dejuadejo.vercel.app/",
    };

    // Message to me
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        messageTemplateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
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
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_RESPONSE_TEMPLATE_ID,
        responseTemplateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
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
              className="w-full max-w-2xl mt-12 bg-secondary backdrop-blur-lg rounded-2xl border border-primary/10 p-8 xl:shadow-[0_0_20px_5px_var(--color-neonBlue)] flex flex-col gap-6"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col gap-2">
                <h3 className="text-accent">Let's Connect!</h3>
                <p className="text-sm uppercase text-primary/50">
                  I'm always open to discussing new projects, creative ideas, or
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
                  rows="5"
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

              {/* {status === "success" && (
            <p className="text-green-400 text-sm xl:text-md mt-2">
              Thanks for reaching out! I'll get back to you soon. ✅
            </p>
          )}
          {status === "error" && (
            <p className="text-red-500 text-sm xl:text-md mt-2">
              Something went wrong. Please try again. ❌
            </p>
          )} */}
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactMain;
