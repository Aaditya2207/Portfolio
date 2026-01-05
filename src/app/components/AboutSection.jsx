"use client";
import React, { useState, useTransition } from "react";
import Image from "next/image";
import TabButton from "./TabButton";

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {[
          { src: "/icons/c.svg", name: "C++" },
          { src: "/icons/javascript-1.svg", name: "JavaScript" },
          { src: "/icons/java.svg", name: "Java" },
          { src: "/icons/typescript.svg", name: "TypeScript" },
          { src: "/icons/nodejs-3.svg", name: "Node.js" },
          { src: "/icons/react-2.svg", name: "React.js" },
          { src: "/icons/mongodb-icon-1.svg", name: "MongoDB" },
          { src: "/icons/python-5.svg", name: "Python" },
        ].map((item) => (
          <div
            key={item.name}
            className="flex flex-col items-center justify-center space-y-2 h-28"
          >
            <div className="flex items-center justify-center h-16 w-16">
              <Image
                src={item.src}
                width={50}
                height={50}
                alt={item.name}
                className="object-contain"
              />
            </div>
            <span className="text-sm text-center">{item.name}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Tools",
    id: "tools",
    content: (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {[
          // { src: "/icons/chrome-modern-.svg", name: "Google Chrome" },
          { src: "/icons/visual-studio-code-1.svg", name: "VS Code" },
          { src: "/icons/giticon.svg", name: "Git" },
          { src: "/icons/postman.svg", name: "Postman" },
          { src: "/icons/wireshark.svg", name: "Wireshark" },
          { src: "/icons/nmap.svg", name: "Nmap" },
          { src: "/icons/Kleopatra.svg", name: "Kleopatra" },
        ].map((item) => (
          <div
            key={item.name}
            className="flex flex-col items-center justify-center space-y-2 h-28"
          >
            <div className="flex items-center justify-center h-16 w-16">
              <Image
                src={item.src}
                width={50}
                height={50}
                alt={item.name}
                className="object-contain"
              />
            </div>
            <span className="text-sm text-center">{item.name}</span>
          </div>
        ))}
      </div>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="text-white" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        {/* <Image
          src="/images/about-image.png"
          width={500}
          height={500}
          alt="About me"
          className="object-contain"
        /> */}
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-base lg:text-lg">
          I’m a technology enthusiast passionate about Cybersecurity, AI, and innovative digital products. Currently pursuing my degree in engineering, I actively engage in solving real-world problems through CTFs, hackathons, and hands-on projects.

As a member of the IEEE Student Branch, I’ve contributed to multiple university-level technical events and coding competitions, most recently volunteering at HackFinity 2025 and participating in the DSCI–EY National Level CTF Hackathon. These experiences strengthened my skills in threat analysis, problem-solving, and working under pressure.

I’m also the Co-Founder of Homebooth, a Web3-powered multilingual learning platform designed to help learners stay consistent through crypto-based incentives and structured AI-assisted learning journeys. Building this startup has taught me product thinking, team collaboration, and user-centric design.

I love exploring the intersection of Cybersecurity, Deep Learning, and Web3, and I’m currently working on a project related to Deepfake Detection using CNNs. Always eager to learn, collaborate, and take on challenging opportunities that help me grow as a future cybersecurity specialist.

Interests: Cybersecurity, CTFs, Machine Learning, Web3, Computer Vision, Product Development, AI-driven Learning Systems

Open to: Internships · Research Projects · Collaborations · Tech Communities · Startup Opportunities
          </p>
          <div className="flex flex-row justify-start mt-8">
            <TabButton
              selectTab={() => handleTabChange("skills")}
              active={tab === "skills"}
            >
              Skills
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("tools")}
              active={tab === "tools"}
            >
              Tools
            </TabButton>
          </div>
          <div className="mt-8">{TAB_DATA.find((t) => t.id === tab).content}</div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
