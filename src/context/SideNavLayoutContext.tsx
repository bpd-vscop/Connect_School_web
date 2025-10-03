import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface SideNavLayoutContextValue {
  offset: number;
  setOffset: (offset: number) => void;
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
}

const SideNavLayoutContext = createContext<SideNavLayoutContextValue | undefined>(undefined);

export const SideNavLayoutProvider = ({ children }: { children: ReactNode }) => {
  const [offset, setOffset] = useState(0);
  const [isExpanded, setIsExpanded] = useState(true);

  // Update CSS custom property whenever offset changes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--side-nav-offset', offset + 'px');
    }
  }, [offset]);

  return (
    <SideNavLayoutContext.Provider
      value={{
        offset,
        setOffset,
        isExpanded,
        setIsExpanded,
      }}
    >
      {children}
    </SideNavLayoutContext.Provider>
  );
};

export const useSideNavLayout = () => {
  const context = useContext(SideNavLayoutContext);
  if (context === undefined) {
    throw new Error('useSideNavLayout must be used within a SideNavLayoutProvider');
  }
  return context;
};