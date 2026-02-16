import React, { useState } from 'react';

const DayNightToggle: React.FC = () => {
  const [isNight, setIsNight] = useState(false);

  const toggleTheme = () => {
    setIsNight(!isNight);
  };

  return (
    <div
      className={`
        relative w-80 h-32 rounded-full cursor-pointer overflow-hidden transition-colors duration-700 ease-in-out shadow-[inset_0_4px_12px_rgba(0,0,0,0.3),inset_0_-2px_6px_rgba(255,255,255,0.2)]
        border-4 border-slate-50/10 box-content
        ${isNight ? 'bg-[#1a1c29]' : 'bg-[#6EBFF7]'}
      `}
      onClick={toggleTheme}
      role="button"
      aria-pressed={isNight}
      aria-label="Toggle Dark Mode"
    >
      {/* --- Background Elements --- */}
      
      {/* Background Gradients/Rings (Subtle depth) */}
      <div className={`absolute inset-0 transition-opacity duration-700 ${isNight ? 'opacity-100' : 'opacity-0'}`}>
         {/* Night Gradients */}
         <div className="absolute top-[-50%] left-[20%] w-64 h-64 rounded-full bg-white/5 blur-3xl"></div>
         <div className="absolute bottom-[-20%] right-[10%] w-48 h-48 rounded-full bg-blue-500/10 blur-2xl"></div>
      </div>
      <div className={`absolute inset-0 transition-opacity duration-700 ${isNight ? 'opacity-0' : 'opacity-100'}`}>
         {/* Day Gradients */}
         <div className="absolute top-[-20%] right-[-10%] w-64 h-64 rounded-full bg-white/20 blur-2xl"></div>
         <div className="absolute bottom-[-50%] left-[10%] w-56 h-56 rounded-full bg-blue-300/30 blur-2xl"></div>
      </div>

      {/* Stars (Night Mode) */}
      {/* Star 1 - Top Left */}
      <div className={`absolute top-6 left-16 text-white transition-all duration-700 delay-100 ${isNight ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-0'}`}>
         <StarIcon size={18} className="animate-twinkle" />
      </div>
      {/* Star 2 - Bottom Center */}
      <div className={`absolute bottom-6 left-36 text-white transition-all duration-700 delay-200 ${isNight ? 'opacity-100 translate-y-0 scale-75' : 'opacity-0 translate-y-4 scale-0'}`}>
         <StarIcon size={12} className="animate-twinkle-delay-1" />
      </div>
      {/* Star 3 - Top Center Right */}
      <div className={`absolute top-8 right-40 text-white transition-all duration-700 delay-150 ${isNight ? 'opacity-100 translate-y-0 scale-90' : 'opacity-0 translate-y-4 scale-0'}`}>
         <StarIcon size={16} className="animate-twinkle-delay-2" />
      </div>
       {/* Small Dot Stars */}
      <div className={`absolute top-12 left-28 w-1 h-1 bg-white rounded-full transition-all duration-500 delay-300 ${isNight ? 'opacity-80 scale-100' : 'opacity-0 scale-0'}`}></div>
      <div className={`absolute bottom-10 right-48 w-1.5 h-1.5 bg-white rounded-full transition-all duration-500 delay-200 ${isNight ? 'opacity-60 scale-100' : 'opacity-0 scale-0'}`}></div>
      <div className={`absolute top-5 right-32 w-1 h-1 bg-white rounded-full transition-all duration-500 delay-300 ${isNight ? 'opacity-70 scale-100' : 'opacity-0 scale-0'}`}></div>


      {/* Clouds (Day Mode) */}
      {/* Moving these down and fading out when night comes */}
      <div className={`absolute inset-0 transition-all duration-700 ease-in-out ${isNight ? 'translate-y-24 opacity-0' : 'translate-y-0 opacity-100'}`}>
        {/* Cloud 1 */}
        <div className="absolute -bottom-6 right-0 w-32 h-32 bg-white/95 rounded-full mix-blend-normal"></div>
        <div className="absolute -bottom-4 right-16 w-24 h-24 bg-white/90 rounded-full shadow-sm"></div>
        {/* Cloud 2 */}
        <div className="absolute -bottom-8 right-32 w-28 h-28 bg-white/85 rounded-full"></div>
        <div className="absolute -bottom-2 right-[-10px] w-20 h-20 bg-white/80 rounded-full"></div>
        {/* Cloud 3 - Left side filler */}
        <div className="absolute -bottom-10 left-32 w-32 h-32 bg-white/60 rounded-full blur-sm"></div>
      </div>

      {/* --- The Handle (Sun / Moon) --- */}
      <div
        className={`
            absolute top-2 bottom-2 w-28 h-28 rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.3),inset_0_-4px_4px_rgba(0,0,0,0.1),inset_0_4px_8px_rgba(255,255,255,0.6)]
            transition-all duration-700 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] z-20 overflow-hidden
            ${isNight ? 'translate-x-[11.5rem]' : 'translate-x-2'}
        `}
      >
        {/* Sun Background (Base Layer) */}
        <div className="absolute inset-0 bg-[#FFD02D] transition-colors duration-500"></div>

        {/* Moon Overlay (Eclipse Effect) */}
        {/* This slides over the Sun as the handle moves. Starts hidden (translate-x-full) and slides in (translate-x-0) */}
        <div 
            className={`
                absolute inset-0 bg-[#D9DCE1] rounded-full transition-transform duration-700 ease-in-out
                ${isNight ? 'translate-x-0' : 'translate-x-full'}
            `}
        >
            {/* Moon Craters */}
            <div className="absolute top-4 right-6 w-6 h-6 bg-[#B0B5BB] rounded-full shadow-[inset_1px_1px_3px_rgba(0,0,0,0.3)]"></div>
            <div className="absolute bottom-6 left-6 w-9 h-9 bg-[#B0B5BB] rounded-full shadow-[inset_1px_1px_3px_rgba(0,0,0,0.3)]"></div>
            <div className="absolute bottom-8 right-8 w-4 h-4 bg-[#B0B5BB] rounded-full shadow-[inset_1px_1px_3px_rgba(0,0,0,0.3)]"></div>
        </div>

        {/* Shine/Highlight on the sphere to make it look 3D (Glassy effect) */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/60 via-transparent to-black/5 opacity-100 pointer-events-none"></div>
      </div>

    </div>
  );
};

// Simple Star SVG component
const StarIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </svg>
);

export default DayNightToggle;