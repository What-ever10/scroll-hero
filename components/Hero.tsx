"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const carRef = useRef<HTMLImageElement | null>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);
  const statsRef = useRef<HTMLDivElement[]>([]);

 useEffect(() => {
  if (!heroRef.current) return;

  const ctx = gsap.context(() => {

    // Headline intro animation
    gsap.from(lettersRef.current, {
      y: 80,
      opacity: 0,
      duration: 1,
      stagger: 0.04,
      ease: "power3.out",
    });

    // 🔹 Set initial hidden state for stats
    gsap.set(statsRef.current, {
      opacity: 0,
      y: -20,
    });

    //  Scroll Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "+=2000",
        scrub: 1.5,
        pin: true,
      },
    });

    // Car movement
    tl.to(carRef.current, {
      x: "130vw",
      scale: 1.05,
      ease: "none",
    });

    // Stats reveal during scroll
    // Stats reveal earlier in scroll
tl.to(
  statsRef.current[0],
  {
    opacity: 1,
    y: -30,        // move slightly upward
    duration: 0.6,
    ease: "power2.out",
  },
  0.10            // earlier trigger
);

tl.to(
  statsRef.current[1],
  {
    opacity: 1,
    y: -30,
    duration: 0.6,
    ease: "power2.out",
  },
  0.20
);

tl.to(
  statsRef.current[2],
  {
    opacity: 1,
    y: -30,
    duration: 0.6,
    ease: "power2.out",
  },
  0.30
);

  }, heroRef);

  return () => ctx.revert();
}, []);
  const headline = "WELCOME ITZFIZZ".split("");

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden"
    >
        {/* Stats */}
        <div className="flex gap-16 text-center">
        {[
          { value: "98%", label: "Performance Boost" },
          { value: "4.9★", label: "User Rating" },
          { value: "120K+", label: "Active Users" },
        ].map((stat, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) statsRef.current[i] = el;
            }}
            className="opacity-0"
          >
            <p className="text-3xl font-semibold">{stat.value}</p>
            <p className="text-sm tracking-widest text-gray-400">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
      {/* Headline */}
      <h1 className="text-5xl md:text-7xl font-light tracking-[0.6em] mb-12 text-center">
        {headline.map((char, i) => (
          <span
            key={i}
            ref={(el) => {
              if (el) lettersRef.current[i] = el;
            }}
            className="inline-block"
          >
            {char}
          </span>
        ))}
      </h1>

      
      

      {/* Car */}
      <img
        ref={carRef}
        src="/car.png"
        alt="car"
        className="absolute bottom-20 left-[-40vw] w-[500px] pointer-events-none select-none"
      />
    </section>
  );
};

export default Hero;