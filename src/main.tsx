import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    // Set the class on the <html> element based on the theme
    const rootElement = document.documentElement;
    rootElement.classList.remove("light", "dark"); // Remove previous theme classes
    rootElement.classList.add(theme); // Add the current theme class

    // Save the selected theme in localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      style={{ width: "100px", fontSize: "10px" }}
    >
      Switch to {theme === "dark" ? "Light" : "Dark"} Theme
    </button>
  );
};

export default ThemeToggle;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeToggle></ThemeToggle>
    <App />
  </StrictMode>
);
