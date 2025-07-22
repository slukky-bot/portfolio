import { useEffect } from "react";
import { useTheme } from "./hooks/useTheme";

import SwitchLanguage from "./components/ShowLanguage";
import AppRoutes from "./routes/AppRouter";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div
      className="bg-white dark:bg-black text-black dark:text-white
    min-h-screen flex flex-col transition-colors duration-300"
    >
      <Navbar />
      <AppRoutes />
      {/* <main className="flex-grow p-8">
        <h2 className="text-2xl mb-4">Welcome to the Theme Toggle Example</h2>
        <p>
          This is the main content area. Toggle the theme using the button in
          the Navbar.
        </p>
        <SwitchLanguage />
      </main> */}
      <Footer />
    </div>
  );
}

export default App;
