import { useState } from "react";

const Translate = () => {
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("hi");
  const [loading, setLoading] = useState(false);

  const API_URL = "https://al-language-translator-3backend1.onrender.com"; // Local backend URL

  const languageOptions = [
    { code: "en", label: "English" },
    { code: "hi", label: "Hindi" },
    { code: "hinglish", label: "Hinglish" },
    { code: "bn", label: "Bengali" },
    { code: "es", label: "Spanish" },
    { code: "fr", label: "French" },
    { code: "de", label: "German" },
    { code: "it", label: "Italian" },
    { code: "pt", label: "Portuguese" },
    { code: "ru", label: "Russian" },
    { code: "ja", label: "Japanese" },
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
      setTranslatedText("Error: Could not translate. Please check backend.");
    }

    setLoading(false);
  };

  const [isListening, setIsListening] = useState(false);

  const handleCopy = (txt) => {
    if (!txt) return;
    navigator.clipboard.writeText(txt);
    // Optional: Add toast notification here
  };

  const handleClear = () => {
    setText("");
    setTranslatedText("");
  };

  const handleSpeech = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = sourceLang === "hinglish" ? "hi-IN" : sourceLang;
    // Best guess mapping: Hinglish usually works better with Hindi acoustic models or English

    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
    };

    recognition.start();
  };

  const swapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setText(translatedText);
    setTranslatedText(text);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex justify-center items-center px-4 pt-28 pb-10 font-sans transition-colors duration-300">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-3xl shadow-xl w-full max-w-5xl text-slate-800 dark:text-slate-100 transition-all duration-300">

        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-sm text-slate-900 dark:text-white transition-colors">
            AI Translator
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Break language barriers instantly</p>
        </header>

        {/* Translation Area */}
        <div className="bg-slate-50/50 dark:bg-slate-950/50 rounded-2xl p-4 md:p-6 border border-slate-200 dark:border-slate-800 shadow-inner transition-colors">

          {/* Controls Row */}
          <div className="flex flex-col md:flex-row justify-between items-center bg-white dark:bg-slate-900 rounded-xl p-2 mb-6 gap-2 md:gap-0 border border-slate-200 dark:border-slate-800 transition-colors">

            {/* Source Language */}
            <select
              className="w-full md:w-48 bg-transparent text-slate-700 dark:text-slate-200 font-semibold outline-none text-center md:text-left p-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
            >
              {languageOptions.map((lang) => (
                <option key={lang.code} value={lang.code} className="text-slate-800 bg-white dark:bg-slate-900 dark:text-slate-200">
                  {lang.label}
                </option>
              ))}
            </select>

            {/* Swap Button */}
            <button
              onClick={swapLanguages}
              className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 rounded-full transition transform hover:rotate-180 duration-300 shadow-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
              title="Swap Languages"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </button>

            {/* Target Language */}
            <select
              className="w-full md:w-48 bg-transparent text-slate-700 dark:text-slate-200 font-semibold outline-none text-center md:text-left p-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
            >
              {languageOptions.map((lang) => (
                <option key={lang.code} value={lang.code} className="text-slate-800 bg-white dark:bg-slate-900 dark:text-slate-200">
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          {/* Text Areas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Input Wrapper */}
            <div className="relative group">
              <textarea
                className="w-full h-64 p-5 pr-12 pb-14 bg-white dark:bg-slate-950/30 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition duration-300 shadow-sm text-lg border border-slate-200 dark:border-slate-800"
                placeholder="Enter text here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              {/* Clear Link */}
              {text && (
                <button
                  onClick={handleClear}
                  className="absolute top-3 right-3 p-1 text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition z-10"
                  title="Clear Text"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              )}

              {/* Bottom Layout Container */}
              <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center z-10">
                <div className="flex items-center gap-3">
                  {/* Char Count */}
                  <span className="text-xs text-slate-500 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                    {text.length} chars
                  </span>

                  {/* Mic Button */}
                  <button
                    onClick={handleSpeech}
                    className={`p-2 rounded-full transition ${isListening ? "bg-red-500 text-white animate-pulse" : "text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    title="Speak to Type"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </button>
                </div>

                {/* Copy Button */}
                <button
                  onClick={() => handleCopy(text)}
                  className="p-2 text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
                  title="Copy Source"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Output Wrapper */}
            <div className="relative">
              <textarea
                readOnly
                className="w-full h-64 p-5 pr-12 pb-14 bg-slate-50 dark:bg-slate-950/30 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 rounded-2xl resize-none outline-none border border-slate-200 dark:border-slate-800 shadow-inner text-lg"
                placeholder="Translation will appear here..."
                value={translatedText}
              />

              {/* Bottom Layout Container */}
              <div className="absolute bottom-3 left-3 right-3 flex justify-end items-center z-10">
                {/* Copy Button */}
                <button
                  onClick={() => handleCopy(translatedText)}
                  className="p-2 text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition"
                  title="Copy Translation"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>

              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-2xl">
                  <div className="w-8 h-8 border-4 border-blue-600 dark:border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleTranslate}
            disabled={loading}
            className="w-full md:w-2/3 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transform transition-all duration-300 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
          >
            {loading ? "Translating..." : "Translate"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Translate;
