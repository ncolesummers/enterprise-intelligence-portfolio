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
    <div className={`rounded-lg bg-card p-4 ${className}`}>
      {title && (
        <h4 className="mb-2 text-sm font-medium text-muted-foreground">{title}</h4>
      )}
      <pre className="overflow-x-auto text-sm text-muted-foreground">
        <code>{children}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
