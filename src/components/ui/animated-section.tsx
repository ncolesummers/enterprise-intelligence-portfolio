"use client";

import { useScrollAnimation } from "@/lib/scroll-animations";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: "fadeInUp" | "fadeInLeft" | "fadeInRight" | "scaleIn";
  className?: string;
  delay?: number;
}

export function AnimatedSection({
  children,
  animation = "fadeInUp",
  className,
  delay = 0,
}: AnimatedSectionProps) {
  const ref = useScrollAnimation(animation);

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        animationDelay: delay ? `${delay}ms` : undefined,
      }}
    >
      {children}
    </div>
  );
}

export function AnimatedCard({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <AnimatedSection animation="scaleIn" className={className} delay={delay}>
      {children}
    </AnimatedSection>
  );
}

export function AnimatedText({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <AnimatedSection animation="fadeInUp" className={className} delay={delay}>
      {children}
    </AnimatedSection>
  );
}
