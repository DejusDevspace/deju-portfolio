import React, { useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import {
  NavMain,
  HeroMain,
  AboutMain,
  ProjectMain,
  ContactMain,
  ExperienceMain,
} from "./components";
import Footer from "./components/layout/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
        toastClassName="rounded-lg shadow-md"
        bodyClassName="text-sm"
        hideProgressBar={false}
      />
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
        <Analytics />
      </div>
    </>
  );
}

export default App;
