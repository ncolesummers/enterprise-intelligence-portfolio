"use client";

// Intersection Observer utility for scroll animations
export class ScrollAnimations {
  private observer: IntersectionObserver | null = null;
  private prefersReducedMotion: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.initializeObserver();
    }
  }

  private initializeObserver() {
    if (typeof window === 'undefined') return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateElement(entry.target as HTMLElement);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );
  }

  private animateElement(element: HTMLElement) {
    if (this.prefersReducedMotion) {
      // Just make visible without animation for reduced motion
      element.style.opacity = '1';
      element.style.transform = 'none';
      return;
    }

    const animationType = element.dataset.animation || 'fadeInUp';
    
    switch (animationType) {
      case 'fadeInUp':
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        break;
      case 'fadeInLeft':
        element.style.opacity = '1';
        element.style.transform = 'translateX(0)';
        break;
      case 'fadeInRight':
        element.style.opacity = '1';
        element.style.transform = 'translateX(0)';
        break;
      case 'scaleIn':
        element.style.opacity = '1';
        element.style.transform = 'scale(1)';
        break;
      default:
        element.style.opacity = '1';
        element.style.transform = 'none';
    }
  }

  public observe(element: HTMLElement) {
    if (!this.observer) return;

    // Set initial state
    if (!this.prefersReducedMotion) {
      const animationType = element.dataset.animation || 'fadeInUp';
      
      switch (animationType) {
        case 'fadeInUp':
          element.style.opacity = '0';
          element.style.transform = 'translateY(30px)';
          break;
        case 'fadeInLeft':
          element.style.opacity = '0';
          element.style.transform = 'translateX(-30px)';
          break;
        case 'fadeInRight':
          element.style.opacity = '0';
          element.style.transform = 'translateX(30px)';
          break;
        case 'scaleIn':
          element.style.opacity = '0';
          element.style.transform = 'scale(0.8)';
          break;
        default:
          element.style.opacity = '0';
      }

      element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    }

    this.observer.observe(element);
  }

  public unobserve(element: HTMLElement) {
    if (!this.observer) return;
    this.observer.unobserve(element);
  }

  public disconnect() {
    if (!this.observer) return;
    this.observer.disconnect();
  }
}

// React hook for scroll animations
import { useEffect, useRef } from 'react';

export function useScrollAnimation(animation: string = 'fadeInUp') {
  const elementRef = useRef<HTMLElement>(null);
  const observerRef = useRef<ScrollAnimations | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    observerRef.current = new ScrollAnimations();
    const element = elementRef.current;
    element.dataset.animation = animation;
    observerRef.current.observe(element);

    return () => {
      if (observerRef.current && element) {
        observerRef.current.unobserve(element);
        observerRef.current.disconnect();
      }
    };
  }, [animation]);

  return elementRef;
}