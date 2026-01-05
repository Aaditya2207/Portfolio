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
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 md:px-8 lg:px-12 sm:py-16">
        <div className="text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-white mb-6">About Me</h2>
          <div className="text-base lg:text-lg text-gray-300 leading-relaxed space-y-4">
            <p>
              I&apos;m a technology enthusiast passionate about <span className="text-white font-semibold">Cybersecurity</span>, <span className="text-white font-semibold">AI</span>, and innovative digital products. Currently pursuing my degree in engineering, I actively engage in solving real-world problems through CTFs, hackathons, and hands-on projects.
            </p>
            
            <p>
              As a member of the <span className="text-white font-semibold">IEEE Student Branch</span>, I&apos;ve contributed to multiple university-level technical events and coding competitions, most recently volunteering at <span className="text-white font-semibold">HackFinity 2025</span> and participating in the <span className="text-white font-semibold">DSCI–EY National Level CTF Hackathon</span>. These experiences strengthened my skills in threat analysis, problem-solving, and working under pressure.
            </p>
            
            <p>
              I&apos;m also the <span className="text-white font-semibold">Co-Founder of Homebooth</span>, a Web3-powered multilingual learning platform designed to help learners stay consistent through crypto-based incentives and structured AI-assisted learning journeys. Building this startup has taught me product thinking, team collaboration, and user-centric design.
            </p>
            
            <p>
              I love exploring the intersection of Cybersecurity, Deep Learning, and Web3, and I&apos;m currently working on a project related to <span className="text-white font-semibold">Deepfake Detection using CNNs</span>. Always eager to learn, collaborate, and take on challenging opportunities that help me grow as a future cybersecurity specialist.
            </p>
            
            <div className="pt-2">
              <p className="text-white font-semibold mb-2">Interests:</p>
              <p className="text-gray-300">Cybersecurity, CTFs, Machine Learning, Web3, Computer Vision, Product Development, AI-driven Learning Systems</p>
            </div>
            
            <div className="pt-2">
              <p className="text-white font-semibold mb-2">Open to:</p>
              <p className="text-gray-300">Internships · Research Projects · Collaborations · Tech Communities · Startup Opportunities</p>
            </div>
          </div>
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
