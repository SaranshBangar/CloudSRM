"use client";

import * as React from "react";
import { Moon, Palette, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ThemeOption = {
  id: string;
  name: string;
  background: string;
  foreground: string;
};

const themeOptions: Record<string, ThemeOption[]> = {
  Default: [
    { id: "default-light", name: "Light", background: "#ffffff", foreground: "#171717" },
    { id: "default-dark", name: "Dark", background: "#171717", foreground: "#ffffff" },
  ],
  Blue: [
    { id: "blue-light", name: "Light", background: "#f0f7ff", foreground: "#1e293b" },
    { id: "blue-dark", name: "Dark", background: "#0f172a", foreground: "#f8fafc" },
  ],
  Green: [
    { id: "green-light", name: "Light", background: "#f0fdf4", foreground: "#14532d" },
    { id: "green-dark", name: "Dark", background: "#052e16", foreground: "#f8fafc" },
  ],
  Red: [
    { id: "red-light", name: "Light", background: "#fff1f2", foreground: "#881337" },
    { id: "red-dark", name: "Dark", background: "#450a0a", foreground: "#f8fafc" },
  ],
  Purple: [
    { id: "purple-light", name: "Light", background: "#faf5ff", foreground: "#581c87" },
    { id: "purple-dark", name: "Dark", background: "#4c1d95", foreground: "#f8fafc" },
  ],
  Yellow: [
    { id: "yellow-light", name: "Light", background: "#fefce8", foreground: "#713f12" },
    { id: "yellow-dark", name: "Dark", background: "#713f12", foreground: "#fef9c3" },
  ],
  Teal: [
    { id: "teal-light", name: "Light", background: "#f0fdfa", foreground: "#134e4a" },
    { id: "teal-dark", name: "Dark", background: "#134e4a", foreground: "#f8fafc" },
  ],
  Rose: [
    { id: "rose-light", name: "Light", background: "#fff1f2", foreground: "#9f1239" },
    { id: "rose-dark", name: "Dark", background: "#9f1239", foreground: "#ffe4e6" },
  ],
};

export function ThemeSwitcher() {
  const [theme, setTheme] = React.useState("");
  const [currentColor, setCurrentColor] = React.useState("Default");
  const [currentMode, setCurrentMode] = React.useState<"light" | "dark" | "system">("system");

  React.useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      const [color, mode] = savedTheme.split("-");
      setCurrentColor(color.charAt(0).toUpperCase() + color.slice(1));
      setCurrentMode(mode as "light" | "dark");
    } else {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setCurrentMode("system");
      updateTheme("Default", systemDark ? "dark" : "light");
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (currentMode === "system") {
        updateTheme(currentColor, e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [currentColor, currentMode]);

  const updateTheme = (color: string, mode: "light" | "dark" | "system") => {
    if (mode === "system") {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const effectiveMode = systemDark ? "dark" : "light";
      const newTheme = `${color.toLowerCase()}-${effectiveMode}`;
      setTheme(newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
    } else {
      const newTheme = `${color.toLowerCase()}-${mode}`;
      setTheme(newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    }
    setCurrentColor(color);
    setCurrentMode(mode);
  };

  const getThemeColor = (color: string, mode: "light" | "dark") => {
    return themeOptions[color].find((opt) => opt.id === `${color.toLowerCase()}-${mode}`)?.background;
  };

  const getCurrentBackground = () => {
    if (currentMode === "system") {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return getThemeColor(currentColor, systemDark ? "dark" : "light");
    }
    return getThemeColor(currentColor, currentMode);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="h-9 w-9">
          <div className="relative size-4">
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute left-0 top-0 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-36 rounded-md border border-gray-200 bg-white text-gray-950 shadow-md dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50"
      >
        <DropdownMenuItem onClick={() => updateTheme(currentColor, "light")}>
          <Sun className="mr-2 h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => updateTheme(currentColor, "dark")}>
          <Moon className="mr-2 h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center">
            <Palette className="mr-2 h-4 w-4" />
            <span>Color</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent
              className="w-36 rounded-md border border-gray-200 bg-white text-gray-950 shadow-md dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50"
              sideOffset={2}
              alignOffset={-5}
            >
              {Object.entries(themeOptions).map(([color, options]) => (
                <DropdownMenuItem key={color} onClick={() => updateTheme(color, currentMode)} className="flex items-center gap-2">
                  <div
                    className="size-4 rounded-full border"
                    style={{
                      background: `linear-gradient(135deg, ${options[0].background} 50%, ${options[1].background} 50%)`,
                      borderColor: options[0].foreground,
                    }}
                  />
                  <span>{color}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
