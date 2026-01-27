"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";

interface EmbeddedSitePreviewProps {
  url: string;
  title: string;
  height?: string;
  className?: string;
  allowFullscreen?: boolean;
}

const EmbeddedSitePreview: React.FC<EmbeddedSitePreviewProps> = ({
  url,
  title,
  height = "600px",
  className = "",
  allowFullscreen = false,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div
      className={`relative w-full overflow-hidden rounded-lg border border-white/10 bg-gray-900 ${className}`}
    >
      {isLoading && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-gray-900"
          style={{ minHeight: height }}
        >
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-white/60" />
            <p className="text-sm text-white/60">Loading preview...</p>
          </div>
        </div>
      )}

      {hasError ? (
        <div
          className="flex items-center justify-center bg-gray-900 p-8"
          style={{ minHeight: height }}
        >
          <div className="text-center">
            <p className="mb-2 text-white/80">Unable to load preview</p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-400 hover:text-blue-300 underline"
            >
              Visit site directly →
            </a>
          </div>
        </div>
      ) : (
        <iframe
          src={url}
          title={title}
          onLoad={handleLoad}
          onError={handleError}
          className="w-full border-0"
          style={{ height, display: isLoading ? "none" : "block" }}
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          referrerPolicy="no-referrer-when-downgrade"
          loading="lazy"
          allowFullScreen={allowFullscreen}
        />
      )}
    </div>
  );
};

export default EmbeddedSitePreview;
