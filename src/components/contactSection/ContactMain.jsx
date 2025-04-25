import React, { useState } from "react";
import SectionHeading from "../common/SectionHeading";
import ContactBackgroundScene from "./ContactBackgroundScene";

function ContactMain() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    resetFormData();
    console.log("Form submitted:", formData);
  };
  const resetFormData = () => {
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="relative min-h-[100vh] w-[100vw] overflow-hidden">
      {/* 3D background */}
      <ContactBackgroundScene />
      {/* Content */}
      <div className="relative z-10 container mx-auto flex flex-col items-center gap-4 py-12 xl:py-24 px-4">
        <SectionHeading text="Contact">
          <span className="text-accent">Me</span>
        </SectionHeading>
        <form
          className="w-full max-w-2xl mt-12 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8 shadow-[0_0_20px_5px_var(--color-neonBlue)] flex flex-col gap-6"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2">
            <h3 className="text-accent">Let's Connect!</h3>
            <p className="text-sm uppercase text-primary/50">
              I'm always open to discussing new projects, creative ideas, or
              opportunities, feel free to reach out. I would love to hear from
              you!
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
              className="w-full px-4 py-3 bg-black/30 text-white border border-white/20 rounded-lg placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-neonBlue)]"
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
              className="w-full px-4 py-3 bg-black/30 text-white border border-white/20 rounded-lg placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-neonBlue)]"
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
              className="w-full px-4 py-3 bg-black/30 text-white border border-white/20 rounded-lg placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-neonBlue)] resize-none"
              value={formData.message}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="self-start px-6 py-3 mt-4 bg-[var(--color-neonBlue)] text-black font-bold rounded-lg shadow-[var(--shadow-neon)] hover:scale-105 transition-all duration-300"
          >
            Send Message 🚀
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactMain;
