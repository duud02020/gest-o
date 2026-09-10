"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AnalyticsContextType {
  visits: number;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const [visits, setVisits] = useState<number>(0);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("shopnova_visits");
    let currentVisits = 0;
    if (saved) {
      currentVisits = parseInt(saved, 10);
    }
    
    // Increment visit on first load
    currentVisits += 1;
    setVisits(currentVisits);
    localStorage.setItem("shopnova_visits", currentVisits.toString());
    
    setIsHydrated(true);
  }, []);

  return (
    <AnalyticsContext.Provider value={{ visits }}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error("useAnalytics must be used within an AnalyticsProvider");
  }
  return context;
}
