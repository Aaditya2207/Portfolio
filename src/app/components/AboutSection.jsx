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
          { src: "/icons/chrome-modern-.svg", name: "Google Chrome" },
          { src: "/icons/visual-studio-code-1.svg", name: "VS Code" },
          { src: "/icons/giticon.svg", name: "Git" },
          { src: "/icons/postman.svg", name: "Postman" },
          { src: "/icons/wireshark.svg", name: "Wireshark" },
          { src: "/icons/nmap.svg", name: "Nmap" },
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
        <Image
          src="/images/about-image.png"
          width={500}
          height={500}
          alt="About me"
          className="object-contain"
        />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-base lg:text-lg">
            I am a full stack web developer with a passion for creating
            interactive and responsive web applications. I have experience
            working with JavaScript, React, Redux, Node.js, Express, PostgreSQL,
            Sequelize, HTML, CSS, and Git. I am a quick learner and I am always
            looking to expand my knowledge and skill set. I am a team player and
            I am excited to work with others to create amazing applications.
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
