import React from "react";

interface CodeBlockProps {
  children: string;
  title?: string;
  language?: string;
  className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  children,
  title,
  className = "",
}) => {
  return (
    <div className={`rounded-lg bg-gray-900 p-4 ${className}`}>
      {title && (
        <h4 className="mb-2 text-sm font-medium text-gray-400">{title}</h4>
      )}
      <pre className="overflow-x-auto text-sm text-gray-300">
        <code>{children}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
