// import { createContext, useState } from "react";

// export const LanguageContext = createContext();

// export function LanguageProvider({ children }) {
//   const [language, setLanguage] = useState("nep");
//   const toggleLanguage = () =>
//     setLanguage((t) => (t === "nep" ? "eng" : "nep"));

//   return (
//     <LanguageContext.Provider value={{ language, toggleLanguage }}>
//       {children}
//     </LanguageContext.Provider>
//   );
// }

import { createContext, useState } from "react";

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const browserLang = navigator.language.slice(0, 2) || "en";
  const [language, setLanguage] = useState(browserLang === "en" ? "np" : "en");

  const toggleLanguage = () =>
    setLanguage((prev) => (prev === "en" ? "np" : "en"));

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
