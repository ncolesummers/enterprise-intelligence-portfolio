import React from "react";

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
  return (
    <section className={`mb-16 ${className}`}>
      <div className="mb-8 flex items-center">
        <h2 className={`text-3xl font-bold ${titleClassName}`}>{title}</h2>
        <div
          className={`ml-4 h-px flex-1 bg-white/10 ${dividerClassName}`}
        ></div>
      </div>
      {children}
    </section>
  );
};

export default Section;
