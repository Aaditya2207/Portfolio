"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import GithubIcon from "../../../public/github-icon.svg";

const EmailSection = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // 🔄 new state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // start loading

    const data = {
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
    };

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("✅ Message sent successfully!");
        setEmailSubmitted(true);
        e.target.reset();
      } else {
        console.error("❌ Failed to send message");
        alert("Failed to send email. Please try again later.");
      }
    } catch (error) {
      console.error("⚠️ Error:", error);
      alert("Something went wrong!");
    } finally {
      setIsLoading(false); // stop loading
    }
  };

  return (
    <section
      id="contact"
      className="grid md:grid-cols-2 my-12 md:my-12 py-24 gap-4 relative"
    >
      {/* background blur effect */}
      <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] 
        from-primary-900 to-transparent rounded-full h-80 w-80 z-0 blur-lg 
        absolute top-3/4 -left-4 transform -translate-x-1/2 -translate-1/2">
      </div>

      {/* Left side content */}
      <div className="z-10">
        <h5 className="text-xl font-bold text-white my-2">Let&apos;s Connect</h5>
        <p className="text-[#ADB7BE] mb-4 max-w-md">
          I&apos;m currently looking for new opportunities — my inbox is always open.
          Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
        </p>

        {/* Social Icons */}
        <div className="socials flex flex-row gap-3 mt-4">
          <Link href="https://github.com/Aaditya2207" target="_blank">
            <Image src={GithubIcon} alt="Github Icon" width={32} height={32} />
          </Link>
          <Link href="https://www.linkedin.com/in/aaditya-kaushik2207/" target="_blank">
            <Image
              src="/icons/linkedin-icon-2.svg"
              alt="Linkedin Icon"
              width={32}
              height={32}
            />
          </Link>
        </div>
      </div>

      {/* Right side form */}
      <div>
        {emailSubmitted ? (
          <p className="text-green-500 text-sm mt-2">✅ Email sent successfully!</p>
        ) : (
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="text-white block mb-2 text-sm font-medium"
              >
                Your email
              </label>
              <input
                name="email"
                type="email"
                id="email"
                required
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] 
                  text-gray-100 text-sm rounded-lg block w-full p-2.5"
                placeholder="jacob@google.com"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="subject"
                className="text-white block text-sm mb-2 font-medium"
              >
                Subject
              </label>
              <input
                name="subject"
                type="text"
                id="subject"
                required
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] 
                  text-gray-100 text-sm rounded-lg block w-full p-2.5"
                placeholder="Just saying hi"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="message"
                className="text-white block text-sm mb-2 font-medium"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                required
                rows="4"
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] 
                  text-gray-100 text-sm rounded-lg block w-full p-2.5"
                placeholder="Let's talk about..."
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`${
                isLoading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-primary-500 hover:bg-primary-600"
              } text-white font-medium py-2.5 px-5 rounded-lg w-full flex items-center justify-center gap-2`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default EmailSection;
