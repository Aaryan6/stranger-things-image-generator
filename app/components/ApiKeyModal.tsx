import React, { useState, useEffect } from "react";

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (key: string) => void;
  initialKey?: string;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialKey = "",
}) => {
  const [key, setKey] = useState(initialKey);

  // Sync with initialKey when modal opens
  useEffect(() => {
    if (isOpen) {
      setKey(initialKey);
    }
  }, [isOpen, initialKey]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (key.trim()) {
      onSave(key.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-gray-900 border border-red-900/50 rounded-2xl p-6 w-full max-w-md shadow-[0_0_50px_rgba(220,38,38,0.2)] relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h3 className="text-xl font-stranger text-red-600 mb-2">
          Access Code Required
        </h3>
        <p className="text-gray-400 text-sm mb-6">
          To open the gate, you need a{" "}
          <span className="text-white font-semibold">Gemini Paid API Key</span>.
          Standard clearance keys may not support image generation protocols.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">
              Gemini API Key
            </label>
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all font-mono text-sm"
              autoFocus
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={!key.trim()}
              className="w-full bg-red-700 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-red-900/20"
            >
              Verify Clearance
            </button>
          </div>

          <div className="text-center">
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-500 hover:text-red-400 underline decoration-gray-700 underline-offset-4 transition-colors"
            >
              Get a Gemini API Key
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApiKeyModal;
