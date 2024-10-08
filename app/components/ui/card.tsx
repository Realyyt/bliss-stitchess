import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <div className={`bg-white rounded-lg shadow ${className || ''}`} {...props}>
      {children}
    </div>
  );
};

export const CardContent: React.FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <div className={`p-4 ${className || ''}`} {...props}>
      {children}
    </div>
  );
};