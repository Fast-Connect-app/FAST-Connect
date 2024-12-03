import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

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
      onClick={() => setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))}
    >
    </button>
  );
};

export default ThemeToggle;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
    <ThemeToggle/>
      <App />
    </BrowserRouter>
  </StrictMode>
);
