'use client';

import React, { useRef } from 'react';

interface UploadSectionProps {
  preview: string | null;
  onFileSelect: (file: File) => void;
  disabled: boolean;
}

const UploadSection: React.FC<UploadSectionProps> = ({ preview, onFileSelect, disabled }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        onFileSelect(file);
      }
    }
  };

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        accept="image/*"
        className="hidden"
      />

      <div className="mb-2 flex justify-between items-end">
        <label className="text-gray-400 text-xs font-mono uppercase tracking-widest">Subject Analysis</label>
        {preview && (
          <button
            onClick={(e) => { e.stopPropagation(); handleClick(); }}
            className="text-xs text-red-400 hover:text-red-300 underline"
          >
            Re-Submit Subject
          </button>
        )}
      </div>

      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`
          flex-1 relative group cursor-pointer
          rounded-xl overflow-hidden
          transition-all duration-300 ease-in-out
          flex flex-col items-center justify-center min-h-[350px]
          border-2 border-dashed
          ${preview
            ? 'border-gray-700 bg-black'
            : 'border-gray-700 hover:border-red-500/50 bg-gray-900/30 hover:bg-gray-900/50'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        {preview ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Original Upload"
              className="w-full h-full object-contain absolute inset-0 z-0 p-4"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center backdrop-blur-[2px]">
               <div className="bg-black/80 px-4 py-2 rounded-full border border-gray-600 text-xs font-mono text-white">
                 Click to change
               </div>
            </div>
            {/* Tech details */}
            <div className="absolute bottom-0 left-0 w-full p-2 bg-black/80 backdrop-blur border-t border-gray-800 flex justify-between text-[10px] text-gray-500 font-mono z-10">
               <span>SUBJECT ACQUIRED</span>
               <span>AWAITING TRANSFORMATION</span>
            </div>
          </>
        ) : (
          <div className="text-center space-y-6 p-6 z-10">
             <div className="relative w-20 h-20 mx-auto">
                <div className="absolute inset-0 bg-red-600/20 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative w-full h-full rounded-full border border-gray-700 bg-gray-900/80 flex items-center justify-center group-hover:border-red-500/50 transition-colors">
                  <svg className="w-8 h-8 text-gray-400 group-hover:text-red-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
             </div>

             <div>
               <p className="text-lg text-white font-medium mb-1 group-hover:text-red-100 transition-colors">Submit Subject for Analysis</p>
               <p className="text-sm text-gray-500">JPG, PNG (Max 5MB)</p>
             </div>

             <div className="px-4 py-2 rounded-lg bg-gray-800/50 text-xs text-gray-400 border border-gray-700 inline-block">
                Max 5MB
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadSection;
