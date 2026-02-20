import React from "react";

interface ContentCardProps {
  children: React.ReactNode;
  className?: string;
}

const ContentCard: React.FC<ContentCardProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`rounded-lg bg-card p-6 ${className}`}>{children}</div>
  );
};

export default ContentCard;
