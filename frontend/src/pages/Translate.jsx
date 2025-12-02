import { useState } from "react";

const Translate = () => {
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("hi");
  const [loading, setLoading] = useState(false);

  const API_URL = "https://unexplainable-unnavigated-carmon.ngrok-free.dev/translate"; // Replace with your URL

  const languageOptions = [
    { code: "en", label: "English" },
    { code: "hi", label: "Hindi" },
    { code: "bn", label: "Bengali" },
    { code: "es", label: "Spanish" },
    { code: "fr", label: "French" },
    { code: "de", label: "German" },
    { code: "ar", label: "Arabic" },
    { code: "zh", label: "Chinese" },
  ];

  const handleTranslate = async () => {
    if (!text.trim()) return;
    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          source_lang: sourceLang,
          target_lang: targetLang,
        }),
      });

      const data = await res.json();
      setTranslatedText(data.translated_text);
    } catch (error) {
      console.error("Translation Error:", error);
    }

    setLoading(false);
  };

  const swapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setText(translatedText);
    setTranslatedText(text);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 pt-20">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-center mb-6"> Multi-Language Translator</h2>

        {/* Languages Select */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <select
            className="p-2 border rounded-md"
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
          >
            {languageOptions.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>

          <button
            onClick={swapLanguages}
            className="p-2 bg-gray-200 rounded-md font-semibold hover:bg-gray-300 transition"
          >
            ⇄ Swap
          </button>

          <select
            className="p-2 border rounded-md"
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
          >
            {languageOptions.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        {/* Text Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Input text */}
          <textarea
            className="w-full h-44 p-4 border rounded-lg resize-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* Translated preview */}
          <textarea
            readOnly
            className="w-full h-44 p-4 border rounded-lg bg-gray-50 resize-none"
            placeholder="Translation will appear here..."
            value={translatedText}
          />
        </div>

        {/* Translate button */}
        <button
          onClick={handleTranslate}
          disabled={loading}
          className="mt-6 w-full p-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-400 transition"
        >
          {loading ? "Translating..." : "Translate"}
        </button>
      </div>
    </div>
  );
};

export default Translate;
