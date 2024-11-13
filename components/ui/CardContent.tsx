// components/ui/card/CardContent.tsx
import React from 'react';

interface CardContentProps {
  children: React.ReactNode;
}

export const CardContent: React.FC<CardContentProps> = ({ children }) => {
  return (
    <div className="card-content">
      {children}
    </div>
  );
};
