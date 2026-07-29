"use client";

import React, { useId, useRef, useState } from "react";
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
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const panelId = `${useId()}-tabpanel`;

  if (pages.length === 0) {
    return (
      <div className="rule-leader p-8 text-center">
        <p className="type-body text-line-soft">No screenshots available</p>
      </div>
    );
  }

  const currentPage = pages[activePage];
  const currentImage = currentPage.desktop;

  return (
    <div className={className}>
      <div className="mb-4 overflow-x-auto">
        <div
          className="flex gap-2 border-b border-rule-leader pb-2"
          role="tablist"
          aria-label="University website pages"
        >
          {pages.map((page, index) => (
            <button
              key={page.name}
              ref={element => {
                tabRefs.current[index] = element;
              }}
              role="tab"
              id={`tab-${page.name}`}
              aria-selected={activePage === index}
              aria-controls={panelId}
              tabIndex={activePage === index ? 0 : -1}
              onClick={() => {
                setActivePage(index);
                setIsZoomed(false);
              }}
              onKeyDown={event => {
                let nextIndex: number | undefined;

                if (event.key === "ArrowRight") {
                  nextIndex = (index + 1) % pages.length;
                } else if (event.key === "ArrowLeft") {
                  nextIndex = (index - 1 + pages.length) % pages.length;
                } else if (event.key === "Home") {
                  nextIndex = 0;
                } else if (event.key === "End") {
                  nextIndex = pages.length - 1;
                }

                if (nextIndex === undefined) return;

                event.preventDefault();
                setActivePage(nextIndex);
                setIsZoomed(false);
                tabRefs.current[nextIndex]?.focus();
              }}
              className={`type-label min-h-11 whitespace-nowrap border-b-2 px-4 py-2.5 transition-colors ${
                activePage === index
                  ? "border-annotation text-annotation"
                  : "text-line-soft hover:text-annotation border-transparent"
              }`}
            >
              {page.label}
            </button>
          ))}
        </div>
      </div>

      <div
        role="tabpanel"
        id={panelId}
        aria-labelledby={`tab-${currentPage.name}`}
      >
        {currentPage.description && (
          <div className="mb-4">
            <p className="type-body text-line-soft text-sm">
              {currentPage.description}
            </p>
          </div>
        )}

        <button
          type="button"
          aria-label={`${isZoomed ? "Restore" : "Zoom"} ${currentPage.label} screenshot`}
          aria-pressed={isZoomed}
          className={`rule-leader relative block w-full overflow-hidden text-left ${
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

          {!isZoomed && (
            <div className="bg-ground rule-leader text-line-soft type-label absolute right-4 bottom-4 px-3 py-2">
              Click to zoom
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default TabbedScreenshotGallery;
