"use client";

import React, { useState, useCallback } from "react";
import Header from "./components/Header";
import UploadSection from "./components/UploadSection";
import Controls from "./components/Controls";
import Gallery from "./components/Gallery";
import ApiKeyModal from "./components/ApiKeyModal";
import { AppState, GeneratedImage } from "./types";
import { fileToBase64, generateStrangerThingsImages } from "./services/gemini";

// Pre-calculated particle positions (generated once at module load)
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  width: ((i * 7) % 3) + 1,
  height: ((i * 11) % 3) + 1,
  top: (i * 17) % 100,
  left: (i * 23) % 100,
  animationDelay: (i * 13) % 5,
  animationDuration: ((i * 19) % 10) + 10,
}));

// Floating Image Component
const FloatingCard = ({
  src,
  className,
  animationClass,
}: {
  src: string;
  className: string;
  animationClass: string;
}) => (
  <div
    className={`absolute pointer-events-none hidden lg:block opacity-60 hover:opacity-100 transition-opacity duration-500 z-0 ${className} ${animationClass}`}
  >
    <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-red-900/20 border border-gray-800">
      <div className="absolute inset-0 bg-red-900/20 mix-blend-overlay"></div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="Atmosphere" className="w-48 h-auto object-cover" />
    </div>
  </div>
);

// Helper to get initial state (runs once on client)
const getInitialApiKey = (): string => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("gemini_api_key") || "";
  }
  return "";
};

const getInitialApiKeySet = (): boolean => {
  if (typeof window !== "undefined") {
    return !!localStorage.getItem("gemini_api_key");
  }
  return false;
};

export default function Home() {
  const [state, setState] = useState<AppState>(() => ({
    sourceImage: null,
    sourceImagePreview: null,
    generatedImages: [],
    isGenerating: false,
    imageCount: 1,
    apiKeySet: getInitialApiKeySet(),
    error: null,
    userPrompt: "",
  }));

  const [apiKey, setApiKey] = useState<string>(() => getInitialApiKey());
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);

  const handleKeySelection = useCallback(() => {
    setIsApiKeyModalOpen(true);
  }, []);

  const handleApiKeySave = useCallback((key: string) => {
    if (key && key.trim()) {
      setApiKey(key.trim());
      localStorage.setItem("gemini_api_key", key.trim());
      setState((prev) => ({ ...prev, apiKeySet: true, error: null }));
      setIsApiKeyModalOpen(false);
    }
  }, []);

  const handleFileSelect = async (file: File) => {
    try {
      const base64 = await fileToBase64(file);
      const previewUrl = `data:${file.type};base64,${base64}`;
      setState((prev) => ({
        ...prev,
        sourceImage: file,
        sourceImagePreview: previewUrl,
        error: null,
      }));
    } catch {
      setState((prev) => ({ ...prev, error: "Failed to process image." }));
    }
  };

  const handleGenerate = async () => {
    if (!state.sourceImage || !state.sourceImagePreview || !apiKey) return;
    setState((prev) => ({ ...prev, isGenerating: true, error: null }));

    try {
      const rawBase64 = await fileToBase64(state.sourceImage);
      const newImagesBase64 = await generateStrangerThingsImages(
        rawBase64,
        state.sourceImage.type,
        state.imageCount,
        state.userPrompt,
        apiKey
      );

      const newGeneratedImages: GeneratedImage[] = newImagesBase64.map(
        (url, idx) => ({
          id: `${Date.now()}-${idx}`,
          url: url,
          timestamp: Date.now(),
        })
      );

      setState((prev) => ({
        ...prev,
        generatedImages: [...newGeneratedImages, ...prev.generatedImages],
        isGenerating: false,
      }));
    } catch (error: unknown) {
      console.error("Generation failed:", error);
      if (
        error instanceof Error &&
        error.message &&
        error.message.includes("Requested entity was not found")
      ) {
        setState((prev) => ({
          ...prev,
          apiKeySet: false,
          isGenerating: false,
          error: "API Key invalid or not found. Please select a key again.",
        }));
        localStorage.removeItem("gemini_api_key");
        setApiKey("");
        return;
      }
      setState((prev) => ({
        ...prev,
        isGenerating: false,
        error: "Something strange happened. Please try again.",
      }));
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-red-900 selection:text-white pb-20 relative overflow-x-hidden">
      {/* --- Background Effects --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Particles */}
        {PARTICLES.map((particle) => (
          <div
            key={particle.id}
            className="absolute bg-white rounded-full opacity-20 animate-particle"
            style={{
              width: particle.width + "px",
              height: particle.height + "px",
              top: particle.top + "%",
              left: particle.left + "%",
              animationDelay: particle.animationDelay + "s",
              animationDuration: particle.animationDuration + "s",
            }}
          />
        ))}
        {/* Mood Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-linear-to-b from-red-900/10 via-transparent to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-full h-[300px] bg-linear-to-t from-blue-900/5 to-transparent blur-3xl"></div>

        {/* Floating Example Images (Atmospheric Decoration - Scattered Grid Inspiration) */}
        <FloatingCard
          src="/images/Generated Image November 23, 2025 - 1_51PM.jpeg"
          className="top-[15%] left-[15%] -rotate-6 w-48 lg:w-56"
          animationClass="animate-float"
        />
        <FloatingCard
          src="/images/Generated Image November 23, 2025 - 1_53PM.jpeg"
          className="top-[20%] right-[15%] rotate-3 w-48 lg:w-56"
          animationClass="animate-float-reverse"
        />
        <FloatingCard
          src="/images/Generated Image November 23, 2025 - 1_56PM.jpeg"
          className="top-[45%] left-[5%] rotate-2 w-40 lg:w-48"
          animationClass="animate-float-delayed"
        />
        <FloatingCard
          src="/images/Generated Image November 23, 2025 - 1_58PM.jpeg"
          className="top-[50%] right-[5%] -rotate-3 w-40 lg:w-48"
          animationClass="animate-float"
        />
        <FloatingCard
          src="/images/stranger_visions_1763885043548-0.png"
          className="bottom-[15%] left-[20%] -rotate-2 w-56 lg:w-64"
          animationClass="animate-float-reverse"
        />
        <FloatingCard
          src="/images/Generated Image November 23, 2025 - 1_51PM.jpeg"
          className="bottom-[20%] right-[20%] rotate-6 w-56 lg:w-64"
          animationClass="animate-float-delayed"
        />
      </div>

      <div className="relative z-10">
        <Header onApiKeyClick={handleKeySelection} />

        <main className="container mx-auto px-4 pt-24 md:pt-32 relative z-10">
          {/* Main Layout: Split or Centered based on screen size */}
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 relative">
              {/* Glowing Line */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-48 bg-red-600/10 blur-[80px] rounded-full pointer-events-none"></div>

              <h2 className="relative text-5xl md:text-7xl lg:text-8xl font-stranger text-red-600 drop-shadow-[0_0_25px_rgba(220,38,38,0.6)] mb-6 leading-tight">
                Enter The <br /> Upside Down
              </h2>
              <p className="relative text-gray-300 text-xl md:text-2xl max-w-2xl mx-auto font-light tracking-wide">
                (One click to{" "}
                <span className="text-red-500 font-semibold">
                  Dimension Shift
                </span>{" "}
                your photos)
              </p>
            </div>

            <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-800/50 rounded-3xl p-8 md:p-12 shadow-[0_0_100px_rgba(0,0,0,0.7)] relative overflow-hidden mt-12">
              {/* Border Gradient Top */}
              <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-red-600/80 to-transparent"></div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                {/* Left: Upload */}
                <div className="md:col-span-3 space-y-6">
                  <UploadSection
                    preview={state.sourceImagePreview}
                    onFileSelect={handleFileSelect}
                    disabled={state.isGenerating}
                  />
                </div>

                {/* Right: Controls */}
                <div className="md:col-span-2 flex flex-col justify-center">
                  <Controls
                    imageCount={state.imageCount}
                    setImageCount={(count) =>
                      setState((prev) => ({ ...prev, imageCount: count }))
                    }
                    userPrompt={state.userPrompt}
                    setUserPrompt={(val) =>
                      setState((prev) => ({ ...prev, userPrompt: val }))
                    }
                    onGenerate={handleGenerate}
                    isGenerating={state.isGenerating}
                    hasImage={!!state.sourceImage}
                    apiKeySet={state.apiKeySet}
                    onSelectKey={handleKeySelection}
                  />
                </div>
              </div>
            </div>

            {state.error && (
              <div className="mt-6 p-4 bg-red-900/30 border border-red-500/50 rounded-lg text-red-200 text-center font-mono text-sm shadow-lg backdrop-blur-sm">
                ⚠️ SYSTEM ERROR: {state.error}
              </div>
            )}
          </div>

          <Gallery images={state.generatedImages} />

          {/* Footer Credit */}
        </main>
      </div>
          <footer className="absolute bottom-0 left-0 w-full text-center mt-12 pb-8 text-[10px] text-gray-600 font-mono">
            <p>
              Created by{" "}
              <a
                href="https://github.com/Aaryan6/stranger-things-image-generator"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500 hover:text-red-400 hover:underline transition-colors"
              >
                Aaryan Patel
              </a>
            </p>
          </footer>

      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onSave={handleApiKeySave}
        initialKey={apiKey}
      />
    </div>
  );
}
