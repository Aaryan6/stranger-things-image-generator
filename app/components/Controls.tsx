'use client';

import React from 'react';

interface ControlsProps {
  imageCount: number;
  setImageCount: (count: number) => void;
  userPrompt: string;
  setUserPrompt: (prompt: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  hasImage: boolean;
  apiKeySet: boolean;
  onSelectKey: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  imageCount,
  setImageCount,
  userPrompt,
  setUserPrompt,
  onGenerate,
  isGenerating,
  hasImage,
  apiKeySet,
  onSelectKey
}) => {
  return (
    <div className="flex flex-col h-full justify-between gap-6">

      {!apiKeySet ? (
        <div className="flex flex-col justify-center h-full text-center space-y-4">
            <div className="p-4 bg-red-900/10 border border-red-900/30 rounded-lg">
               <p className="text-red-400 text-sm font-medium mb-1">Clearance Required</p>
               <p className="text-xs text-gray-500">Secure connection to Hawkins Lab needed.</p>
            </div>

            <button
                onClick={onSelectKey}
                className="w-full py-3 px-4 bg-red-700 hover:bg-red-600 text-white font-semibold rounded-lg transition-all shadow-lg shadow-red-900/20 text-sm"
            >
                Enter Access Code
            </button>
            <a
                 href="https://ai.google.dev/gemini-api/docs/billing"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-[10px] text-gray-600 hover:text-gray-400 uppercase tracking-wider"
               >
                 Docs
            </a>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {/* Prompt Input */}
            <div>
               <div className="flex justify-between items-center mb-2">
                 <label className="text-gray-400 text-xs font-mono uppercase tracking-widest">Direct the Vision</label>
                 <span className="text-[10px] text-gray-600 bg-gray-800 px-2 py-0.5 rounded">Optional</span>
               </div>
               <textarea
                 value={userPrompt}
                 onChange={(e) => setUserPrompt(e.target.value)}
                 placeholder="What do you see in the shadows?"
                 className="w-full bg-black/40 border border-gray-700 rounded-lg p-3 text-white text-sm placeholder-gray-600 focus:border-red-500 focus:ring-0 focus:bg-gray-900/60 transition-all resize-none h-28 font-sans leading-relaxed"
                 disabled={isGenerating}
               />
            </div>

            {/* Count Selection */}
            <div>
              <label className="text-gray-400 text-xs font-mono uppercase tracking-widest mb-2 block">Parallel Realities</label>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((num) => (
                  <button
                    key={num}
                    onClick={() => setImageCount(num)}
                    disabled={isGenerating}
                    className={`
                      py-2 rounded font-mono text-sm transition-all duration-200 border
                      ${imageCount === num
                        ? 'bg-red-900/20 text-red-500 border-red-900'
                        : 'bg-transparent text-gray-500 border-gray-800 hover:border-gray-600'
                      }
                      ${isGenerating ? 'opacity-50' : ''}
                    `}
                  >
                    {num}x
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-auto pt-4">
            <button
              onClick={onGenerate}
              disabled={!hasImage || isGenerating}
              className={`
                w-full py-4 rounded-xl font-bold text-sm tracking-widest uppercase transition-all duration-300 relative overflow-hidden group
                ${!hasImage || isGenerating
                  ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/40'
                }
              `}
            >
               <span className="relative z-10 flex items-center justify-center gap-2">
                {isGenerating ? (
                   <>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Opening Gate...
                   </>
                ) : (
                    "Open The Gate"
                )}
               </span>
               {!isGenerating && hasImage && (
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
               )}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Controls;
