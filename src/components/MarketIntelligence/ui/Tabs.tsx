import React, { Children, cloneElement, isValidElement } from 'react';
interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}
export const Tabs: React.FC<TabsProps> = ({
  value,
  onValueChange,
  children,
  className = ''
}) => {
  return <div className={className}>
      {Children.map(children, child => {
      if (isValidElement(child)) {
        return cloneElement(child as React.ReactElement<any>, {
          value,
          onValueChange
        });
      }
      return child;
    })}
    </div>;
};
interface TabsListProps {
  children: React.ReactNode;
  className?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}
export const TabsList: React.FC<TabsListProps> = ({
  children,
  className = ''
}) => {
  return <div className={`flex ${className}`}>{children}</div>;
};
interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  parentValue?: string;
  onValueChange?: (value: string) => void;
}
export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  value,
  children,
  className = '',
  parentValue,
  onValueChange
}) => {
  const isActive = parentValue === value;
  return <button className={`${className} ${isActive ? 'data-[state=active]' : ''}`} onClick={() => onValueChange?.(value)} data-state={isActive ? 'active' : 'inactive'}>
      {children}
    </button>;
};
interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  parentValue?: string;
}
export const TabsContent: React.FC<TabsContentProps> = ({
  value,
  children,
  className = '',
  parentValue
}) => {
  const isActive = parentValue === value;
  if (!isActive) return null;
  return <div className={className} data-state={isActive ? 'active' : 'inactive'}>
      {children}
    </div>;
};