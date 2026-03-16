"use client";

import React, { useRef, useEffect, useState } from "react";

interface SectionProps {
  children: React.ReactNode;
  title: string;
  className?: string;
  titleClassName?: string;
  dividerClassName?: string;
}

const Section: React.FC<SectionProps> = ({
  children,
  title,
  className = "",
  titleClassName = "",
  dividerClassName = "",
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`mb-16 ${className}`}>
      <div className="mb-8 flex items-center">
        <h2 className={`text-3xl font-bold ${titleClassName}`}>{title}</h2>
        <div
          className={`ml-4 h-px flex-1 bg-border ${dividerClassName} transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] origin-left ${isVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"} motion-reduce:!scale-x-100 motion-reduce:!opacity-100`}
        ></div>
      </div>
      {children}
    </section>
  );
};

export default Section;
