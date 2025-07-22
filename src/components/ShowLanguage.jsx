import { translations } from "./translation";
import { useLanguage } from "../hooks/useLanguage";

export default function SwitchLanguage() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{translations[language].greeting}</h1>
      <button onClick={toggleLanguage}>
        Switch to {language === "en" ? "Nepali" : "English"}
      </button>
    </div>
  );
}
