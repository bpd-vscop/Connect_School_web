/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

interface SideNavLayoutContextValue {
  offset: number;
  topbarActive: boolean;
  setOffset: Dispatch<SetStateAction<number>>;
  setTopbarActive: Dispatch<SetStateAction<boolean>>;
}

const SideNavLayoutContext = createContext<SideNavLayoutContextValue | undefined>(undefined);

export const SideNavLayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [offset, setOffset] = useState(0);
  const [topbarActive, setTopbarActive] = useState(false);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--side-nav-offset', offset + 'px');
    }
  }, [offset]);

  const value = useMemo(
    () => ({ offset, topbarActive, setOffset, setTopbarActive }),
    [offset, topbarActive]
  );

  return (
    <SideNavLayoutContext.Provider value={value}>
      {children}
    </SideNavLayoutContext.Provider>
  );
};

export const useSideNavLayout = () => {
  const context = useContext(SideNavLayoutContext);

  if (!context) {
    throw new Error('useSideNavLayout must be used within SideNavLayoutProvider');
  }

  return context;
};
