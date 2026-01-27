"use client";

import React, { useState } from "react";
import EmbeddedSitePreview from "./embedded-site-preview";

export interface TabConfig {
  label: string;
  url: string;
  description?: string;
}

interface TabbedIframePreviewProps {
  tabs: TabConfig[];
  defaultTab?: number;
  height?: string;
  className?: string;
}

const TabbedIframePreview: React.FC<TabbedIframePreviewProps> = ({
  tabs,
  defaultTab = 0,
  height = "600px",
  className = "",
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  if (tabs.length === 0) {
    return (
      <div className="rounded-lg border border-white/10 bg-gray-900 p-8 text-center">
        <p className="text-white/60">No preview tabs configured</p>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Tab Navigation */}
      <div className="mb-4 overflow-x-auto">
        <div className="flex gap-2 border-b border-white/10 pb-2">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`whitespace-nowrap rounded-t-lg px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === index
                  ? "bg-gray-800 text-white"
                  : "text-white/60 hover:bg-gray-900 hover:text-white/80"
              }`}
              aria-current={activeTab === index ? "page" : undefined}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Description */}
      {tabs[activeTab].description && (
        <p className="mb-4 text-sm text-white/60">
          {tabs[activeTab].description}
        </p>
      )}

      {/* Active Tab Content */}
      <EmbeddedSitePreview
        key={activeTab} // Force remount on tab change
        url={tabs[activeTab].url}
        title={tabs[activeTab].label}
        height={height}
      />
    </div>
  );
};

export default TabbedIframePreview;
