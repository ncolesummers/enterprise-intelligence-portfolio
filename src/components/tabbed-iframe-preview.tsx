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
      <div className="rounded-lg border border-border bg-card p-8 text-center">
        <p className="text-muted-foreground">No preview tabs configured</p>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Tab Navigation */}
      <div className="mb-4 overflow-x-auto">
        <div className="flex gap-2 border-b border-border pb-2" role="tablist">
          {tabs.map((tab, index) => (
            <button
              key={index}
              role="tab"
              id={`tab-${index}`}
              aria-selected={activeTab === index}
              aria-controls={`tabpanel-${index}`}
              onClick={() => setActiveTab(index)}
              className={`whitespace-nowrap rounded-t-lg px-4 py-2.5 min-h-[44px] text-sm font-medium transition-colors ${
                activeTab === index
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-card hover:text-foreground/80"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Panel */}
      <div
        role="tabpanel"
        id={`tabpanel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
      >
        {/* Tab Description */}
        {tabs[activeTab].description && (
          <p className="mb-4 text-sm text-muted-foreground">
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
    </div>
  );
};

export default TabbedIframePreview;
