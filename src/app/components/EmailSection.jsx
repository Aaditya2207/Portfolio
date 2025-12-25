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

    const email = e.target.email.value.trim();
    const subject = e.target.subject.value.trim();
    const message = e.target.message.value.trim();

    // Client-side validation
    if (!email || !subject || !message) {
      alert("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    // Length validation
    if (email.length > 254 || subject.length > 200 || message.length > 5000) {
      alert("Input is too long. Please shorten your message.");
      setIsLoading(false);
      return;
    }

    const data = {
      email,
      subject,
      message,
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
        const errorData = await response.json().catch(() => ({}));
        console.error("❌ Failed to send message:", errorData);
        alert(`Failed to send email: ${errorData.error || "Please try again later."}`);
      }
    } catch (error) {
      console.error("⚠️ Error:", error);
      alert("Something went wrong! Please try again later.");
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
              className={`relative overflow-hidden ${
                isLoading
                  ? "bg-gradient-to-r from-primary-500 to-secondary-500 cursor-not-allowed"
                  : "bg-primary-500 hover:bg-primary-600"
              } text-white font-medium py-2.5 px-5 rounded-lg w-full flex items-center justify-center gap-2 transition-all duration-300`}
            >
              {isLoading ? (
                <>
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-400 via-secondary-500 to-primary-400 animate-shimmer bg-[length:200%_100%]"></div>
                  
                  {/* Techy loading spinner */}
                  <div className="relative z-10 flex items-center gap-3">
                    <div className="relative w-6 h-6">
                      {/* Outer rotating ring */}
                      <div className="absolute inset-0 border-2 border-transparent border-t-white border-r-white rounded-full animate-spin"></div>
                      {/* Inner pulsing ring */}
                      <div className="absolute inset-1 border-2 border-transparent border-b-primary-300 border-l-primary-300 rounded-full animate-spin [animation-direction:reverse] [animation-duration:0.8s]"></div>
                      {/* Center dot */}
                      <div className="absolute inset-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                    
                    {/* Animated text with dots */}
                    <span className="relative z-10 font-semibold">
                      Sending
                      <span className="inline-block w-1.5 h-1.5 ml-1 bg-white rounded-full animate-bounce"></span>
                      <span className="inline-block w-1.5 h-1.5 ml-1 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></span>
                      <span className="inline-block w-1.5 h-1.5 ml-1 bg-white rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </span>
                  </div>
                  
                  {/* Progress bar effect */}
                  <div className="absolute bottom-0 left-0 h-1 bg-white/30 w-full overflow-hidden rounded-b-lg">
                    <div className="h-full bg-white animate-progress w-1/3"></div>
                  </div>
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

