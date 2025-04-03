import React from "react";

interface ListItemProps {
  children: React.ReactNode;
  className?: string;
}

export const ListItem: React.FC<ListItemProps> = (
  { children, className = "" },
) => {
  return (
    <li className={`flex items-start ${className}`}>
      <span className="mr-2 text-primary">•</span>
      {children}
    </li>
  );
};

interface BulletedListProps {
  children: React.ReactNode;
  className?: string;
  items?: React.ReactNode[]; // Optional array of items to render directly
}

const BulletedList: React.FC<BulletedListProps> = (
  { children, className = "", items },
) => {
  return (
    <ul className={`space-y-3 text-gray-300 ${className}`}>
      {items
        ? items.map((item, index) => <ListItem key={index}>{item}</ListItem>)
        : children}
    </ul>
  );
};

export default BulletedList;
