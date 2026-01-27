"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";

export interface ScreenshotPage {
  name: string;
  label: string;
  description?: string;
  desktop: StaticImageData;
}

interface TabbedScreenshotGalleryProps {
  pages: ScreenshotPage[];
  defaultPage?: number;
  className?: string;
}

const TabbedScreenshotGallery: React.FC<TabbedScreenshotGalleryProps> = ({
  pages,
  defaultPage = 0,
  className = "",
}) => {
  const [activePage, setActivePage] = useState(defaultPage);
  const [isZoomed, setIsZoomed] = useState(false);

  if (pages.length === 0) {
    return (
      <div className="rounded-lg border border-white/10 bg-gray-900 p-8 text-center">
        <p className="text-white/60">No screenshots available</p>
      </div>
    );
  }

  const currentPage = pages[activePage];
  const currentImage = currentPage.desktop;

  return (
    <div className={className}>
      {/* Page Tabs */}
      <div className="mb-4 overflow-x-auto">
        <div className="flex gap-2 border-b border-white/10 pb-2">
          {pages.map((page, index) => (
            <button
              key={index}
              onClick={() => setActivePage(index)}
              className={`whitespace-nowrap rounded-t-lg px-4 py-2 text-sm font-medium transition-colors ${
                activePage === index
                  ? "bg-gray-800 text-white"
                  : "text-white/60 hover:bg-gray-900 hover:text-white/80"
              }`}
              aria-current={activePage === index ? "page" : undefined}
            >
              {page.label}
            </button>
          ))}
        </div>
      </div>

      {/* Page Description */}
      {currentPage.description && (
        <div className="mb-4">
          <p className="text-sm text-white/60">{currentPage.description}</p>
        </div>
      )}

      {/* Screenshot Display */}
      <div
        className={`relative overflow-hidden rounded-lg border border-white/10 bg-gray-900 ${
          isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
        }`}
        onClick={() => setIsZoomed(!isZoomed)}
      >
        <div
          className={`transition-all duration-300 ${
            isZoomed ? "overflow-auto" : "overflow-hidden"
          }`}
          style={{
            maxHeight: isZoomed ? "80vh" : "600px",
          }}
        >
          <Image
            src={currentImage}
            alt={`${currentPage.label} page screenshot`}
            className={`w-full h-auto transition-transform duration-300 ${
              isZoomed ? "scale-100" : ""
            }`}
            loading="lazy"
            quality={90}
            placeholder="blur"
          />
        </div>

        {/* Zoom Hint */}
        {!isZoomed && (
          <div className="absolute bottom-4 right-4 rounded-lg bg-black/80 px-3 py-2 text-xs text-white/80 backdrop-blur">
            Click to zoom
          </div>
        )}
      </div>

      {/* Image Info */}
      <div className="mt-2 text-center text-xs text-white/40">
        <span>Click image to zoom</span>
      </div>
    </div>
  );
};

export default TabbedScreenshotGallery;
