"use client";

import { ReactNode, useEffect, useState } from "react";

type ThemeProviderProps = {
  children: ReactNode;
};

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const defaultTheme = isDark ? "blue-dark" : "blue-light";
      document.documentElement.setAttribute("data-theme", defaultTheme);
      localStorage.setItem("theme", defaultTheme);
    }

    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}
