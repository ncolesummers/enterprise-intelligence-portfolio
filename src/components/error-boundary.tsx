"use client";

import { ErrorInfo, ReactNode } from "react";
import { Component } from "react";
import { Button } from "@/components/ui/button";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error Boundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Stated, not apologized for. The emoji this replaced was the one glyph
      // on the sheet that could not be lettered in Saira, and "something went
      // wrong" told a reader nothing they could act on.
      return (
        <div className="rule-object mx-auto max-w-md p-6" role="alert">
          <p className="type-label text-line-soft">Sheet incomplete</p>
          <h2 className="type-title mt-3">
            This section did not finish drawing.
          </h2>
          <p className="type-body text-line-soft mt-3 text-[0.9375rem]">
            The rest of the page is unaffected. Drawing it again usually works;
            if it does not, reloading will.
          </p>
          <Button
            onClick={() => this.setState({ hasError: false })}
            variant="outline"
            className="mt-6"
          >
            Draw it again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook-based error boundary for functional components
export function withErrorBoundary<T extends object>(
  Component: React.ComponentType<T>,
  fallback?: ReactNode,
) {
  return function WrappedComponent(props: T) {
    return (
      <ErrorBoundary fallback={fallback}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}
