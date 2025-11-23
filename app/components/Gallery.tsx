'use client';

import React from 'react';
import { GeneratedImage } from '../types';

interface GalleryProps {
  images: GeneratedImage[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  if (images.length === 0) return null;

  return (
    <div className="w-full max-w-7xl mx-auto mt-16 px-4 pb-20">
      <div className="flex items-center gap-4 mb-8">
         <div className="h-[1px] flex-1 bg-red-900/50"></div>
         <h2 className="text-2xl font-stranger text-red-500 tracking-wider">MANIFESTATIONS</h2>
         <div className="h-[1px] flex-1 bg-red-900/50"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {images.map((img) => (
          <div key={img.id} className="group relative bg-black border border-gray-800 rounded-lg overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)] hover:shadow-[0_0_30px_rgba(220,38,38,0.2)] transition-all duration-500">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.url}
              alt="Generated Result"
              className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
               <a
                 href={img.url}
                 download={`stranger_visions_${img.id}.png`}
                 className="inline-flex items-center justify-center bg-red-700 hover:bg-red-600 text-white py-2 px-4 rounded font-mono text-sm tracking-wide transition-colors border border-red-500"
               >
                 <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                 </svg>
                 DOWNLOAD ARTIFACT
               </a>
            </div>
            {/* Grain overlay effect */}
            <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
