// AaranyaVoiceAssistant.tsx
import React, { useState, useEffect, useRef } from "react";

// Define types for SpeechRecognition since they might not be available globally
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
  length: number;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

// Supported languages with proper codes
const SUPPORTED_LANGUAGES = [
  { code: "hi-IN", name: "Hindi", voice: "hi-IN", display: "हिंदी" },
  { code: "bn-IN", name: "Bengali", voice: "bn-IN", display: "বাংলা" },
  { code: "en-IN", name: "English", voice: "en-IN", display: "English" },
  { code: "ur-IN", name: "Urdu", voice: "ur-IN", display: "اردو" },
  { code: "or-IN", name: "Odia", voice: "or-IN", display: "ଓଡ଼ିଆ" },
  { code: "ta-IN", name: "Tamil", voice: "ta-IN", display: "தமிழ்" },
  { code: "te-IN", name: "Telugu", voice: "te-IN", display: "తెలుగు" },
];

const AaranyaVoiceAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("hi-IN");
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [message, setMessage] = useState("");
  const recognitionRef = useRef<any>(null);

  // Get available voices
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices);
    };
    
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // Initialize Speech Recognition with language support
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = currentLanguage;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      recognition.continuous = false;

      recognition.onstart = () => {
        setListening(true);
        setMessage("Listening...");
      };
      
      recognition.onend = () => {
        setListening(false);
        setMessage("");
      };
      
      recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setListening(false);
        setMessage(`Error: ${event.error}`);
        setTimeout(() => setMessage(""), 3000);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setMessage(`You said: ${transcript}`);
        setTimeout(() => setMessage(""), 3000);
        sendToAaranya(transcript);
      };

      recognitionRef.current = recognition;
    } else {
      console.warn("SpeechRecognition not supported in this browser.");
      setMessage("Speech recognition not supported in your browser");
    }
  }, [currentLanguage]);

  // Detect language from user input
  const detectLanguage = (text: string): string => {
    // Simple language detection based on character ranges
    if (/[\u0900-\u097F]/.test(text)) return "hi-IN"; // Devanagari script
    if (/[\u0980-\u09FF]/.test(text)) return "bn-IN"; // Bengali script
    if (/[\u0600-\u06FF]/.test(text)) return "ur-IN"; // Arabic script (for Urdu)
    if (/[\u0B00-\u0B7F]/.test(text)) return "or-IN"; // Odia script
    if (/[\u0B80-\u0BFF]/.test(text)) return "ta-IN"; // Tamil script
    if (/[\u0C00-\u0C7F]/.test(text)) return "te-IN"; // Telugu script
    
    // Default to English if no script detected or Latin script
    return "en-IN";
  };

  // Clean API response for speech
  const cleanTextForSpeech = (text: string) => {
    if (!text) return "";
    let cleaned = text;
    cleaned = cleaned.replace(/[*_`~#>+-]/g, ""); // Remove markdown, special symbols
    cleaned = cleaned.replace(/\s+/g, " ").trim(); // Normalize spaces
    return cleaned;
  };

  // Find the best available voice for the selected language
  const getVoiceForLanguage = (langCode: string): SpeechSynthesisVoice | null => {
    // Try to find a voice that matches the language exactly
    const exactMatch = availableVoices.find(voice => 
      voice.lang === langCode
    );
    
    if (exactMatch) return exactMatch;
    
    // If no exact match, try to find a voice with the same base language
    const baseLang = langCode.split('-')[0];
    const baseMatch = availableVoices.find(voice => 
      voice.lang.startsWith(baseLang)
    );
    
    return baseMatch || null;
  };

  // Text-to-Speech with language support
  const speakText = (text: string, langCode: string = currentLanguage) => {
    if (!window.speechSynthesis) {
      console.warn("Speech synthesis not supported");
      setMessage("Speech synthesis not supported in your browser");
      return;
    }
    
    // Stop any ongoing speech
    stopSpeech();
    
    const utterance = new SpeechSynthesisUtterance(cleanTextForSpeech(text));
    utterance.lang = langCode;
    
    // Try to find an appropriate voice
    const voice = getVoiceForLanguage(langCode);
    if (voice) {
      utterance.voice = voice;
    }
    
    // Adjust rate for better comprehension in different languages
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    
    utterance.onstart = () => {
      setMessage("Speaking...");
    };
    
    utterance.onend = () => {
      setMessage("");
    };
    
    window.speechSynthesis.speak(utterance);
  };

  // Stop all speech immediately
  const stopSpeech = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setMessage("");
    }
  };

  // Start listening
  const startListening = () => {
    if (recognitionRef.current && !listening) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error("Error starting speech recognition:", error);
        setMessage("Error starting microphone");
        setTimeout(() => setMessage(""), 3000);
      }
    }
  };

  // Send user text to OpenRouter API
  const sendToAaranya = async (userText: string) => {
    setThinking(true);
    
    // Detect the language of the user's input
    const detectedLang = detectLanguage(userText);
    
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer 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`,
          "Content-Type": "application/json",
          "HTTP-Referer": window.location.origin,
          "X-Title": "Jharkhand Tourism Voice Assistant",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat-v3.1:free",
          messages: [
            {
              role: "system",
              content: `You are Aaranya – a friendly voice-only assistant for Jharkhand tourism.
Answer questions about Jharkhand (history, culture, festivals, food, travel, wildlife, tribal traditions) in a natural spoken style.
Detect user language and reply in the same language. Keep answers concise (1-2 sentences).
Do not show text, only voice conversation.`,
            },
            { role: "user", content: userText },
          ],
        }),
      });

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't answer that.";
      
      // Speak in the detected language
      speakText(reply, detectedLang);
    } catch (err) {
      console.error(err);
      speakText("Sorry, something went wrong.", currentLanguage);
    } finally {
      setThinking(false);
    }
  };

  return (
    <>
      {/* Floating circular button */}
      <button
        className={`fixed bottom-5 right-5 w-16 h-16 rounded-full bg-green-600 shadow-lg text-white flex items-center justify-center text-2xl hover:bg-green-700 z-50 transition-transform transform hover:scale-110`}
        onClick={() => setIsOpen(true)}
        title="Talk to Aaranya"
        aria-label="Open Aaranya Voice Assistant"
      >
        🌿
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-2xl p-6 w-96 max-w-full mx-4 flex flex-col items-center relative">
            {/* Close button */}
            <button
              className="absolute top-3 right-3 text-gray-500 text-lg hover:text-gray-700"
              onClick={() => {
                stopSpeech();
                setIsOpen(false);
              }}
              aria-label="Close"
            >
              ✖
            </button>

            <h3 className="text-lg font-bold mb-2">🌿 Aaranya</h3>
            
            {/* Language selector */}
            <div className="mb-4">
              <label htmlFor="language-select" className="block text-sm font-medium text-gray-700 mb-1">
                Language:
              </label>
              <select
                id="language-select"
                value={currentLanguage}
                onChange={(e) => {
                  stopSpeech();
                  setCurrentLanguage(e.target.value);
                }}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                disabled={listening}
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name} ({lang.display})
                  </option>
                ))}
              </select>
            </div>

            {/* Status message */}
            {message && (
              <div className="mb-4 p-2 bg-blue-100 text-blue-800 rounded-md text-sm">
                {message}
              </div>
            )}

            {/* Voice interaction visual cues */}
            <div className="flex flex-col items-center space-y-4 w-full">
              <div className="relative">
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl ${
                    listening 
                      ? "bg-green-400 animate-pulse ring-2 ring-green-300" 
                      : thinking 
                        ? "bg-yellow-400 animate-pulse" 
                        : "bg-gray-200"
                  } transition-all duration-300`}
                >
                  {listening ? "🎤" : thinking ? "💭" : "🌿"}
                </div>
                
                {/* Animated listening indicator */}
                {listening && (
                  <>
                    <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75"></div>
                    <div className="absolute inset-0 rounded-full border-2 border-green-300 animate-pulse"></div>
                  </>
                )}
              </div>
              
              <div className="min-h-8">
                {thinking && <p className="text-gray-500">Thinking...</p>}
              </div>

              <button
                className="px-6 py-3 bg-green-600 rounded-lg text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full"
                onClick={startListening}
                disabled={listening || thinking}
              >
                {listening ? "Listening..." : "Talk to Aaranya"}
              </button>
              
              <button
                className="px-4 py-2 text-sm text-red-600 hover:text-red-800 flex items-center"
                onClick={stopSpeech}
                disabled={!window.speechSynthesis?.speaking}
              >
                <span className="mr-1">⏹️</span> Stop Speaking
              </button>
            </div>
            
            {/* Help text */}
            <div className="mt-4 text-xs text-gray-500 text-center">
              <p>Ask me about Jharkhand's culture, festivals, travel destinations, or wildlife!</p>
              <p className="mt-1">Supported languages: Hindi, Bengali, English, Urdu, Odia, Tamil, Telugu</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AaranyaVoiceAssistant;