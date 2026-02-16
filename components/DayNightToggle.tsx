import React, { useMemo } from 'react';

interface DayNightToggleProps {
  isNight: boolean;
  onToggle: () => void;
  scale?: number;
  seed?: number;
  dayBgColor?: string;
  nightBgColor?: string;
}

// Simple Linear Congruential Generator for deterministic randomness
const getRandom = (seed: number) => {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
};

const DayNightToggle: React.FC<DayNightToggleProps> = ({ 
  isNight, 
  onToggle, 
  scale = 1, 
  seed = 0,
  dayBgColor = '#6EBFF7',
  nightBgColor = '#1a1c29'
}) => {
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle();
    }
  };

  // Generate stars based on seed
  const stars = useMemo(() => {
    const random = getRandom(seed + 12345); // offset seed
    const generatedStars = [];
    const numStars = 5 + Math.floor(random() * 4); // 5 to 8 stars
    
    for (let i = 0; i < numStars; i++) {
        // Position stars on the left side (5% to 55%)
        // With w-[328px] and handle (120px), we have ~60% of space on the left when active.
        const top = 15 + random() * 70; // 15% to 85% vertical
        const left = 5 + random() * 50; // 5% to 55% horizontal
        const size = 8 + random() * 12; // 8px to 20px
        const delay = random() * 3; // 0s to 3s delay
        const duration = 2 + random() * 3; // 2s to 5s duration
        const type = random() > 0.6 ? 'dot' : 'star'; // 40% dots, 60% stars
        // Drift parameters
        const driftDelay = random() * 5;
        const driftDuration = 6 + random() * 6;

        generatedStars.push({ id: i, top, left, size, delay, duration, type, driftDelay, driftDuration });
    }
    return generatedStars;
  }, [seed]);

  // Base dimensions of the component in pixels
  // Content: w-[328px] (328px) x h-32 (128px)
  // Border: 4px
  const contentWidth = 328;
  const contentHeight = 128;
  const borderWidth = 4;
  
  const totalWidth = contentWidth + (borderWidth * 2);
  const totalHeight = contentHeight + (borderWidth * 2);

  return (
    <div 
      style={{ width: totalWidth * scale, height: totalHeight * scale }}
      className="relative flex-shrink-0"
    >
        <div
            style={{ 
                transform: `scale(${scale})`, 
                transformOrigin: 'top left',
                width: contentWidth, // Passed to style to ensure container sizing
                height: contentHeight,
                backgroundColor: isNight ? nightBgColor : dayBgColor
            }}
            className={`
                relative w-[328px] h-32 rounded-full cursor-pointer overflow-hidden transition-colors duration-700 ease-in-out 
                shadow-[inset_0_4px_12px_rgba(0,0,0,0.3),inset_0_-2px_6px_rgba(255,255,255,0.2)]
                border-4 box-content
                ${isNight ? 'border-slate-700/30' : 'border-slate-50/10'}
                focus:outline-none focus:ring-4 focus:ring-blue-400/50
            `}
            onClick={onToggle}
            onKeyDown={handleKeyDown}
            role="switch"
            aria-checked={isNight}
            aria-label="Toggle Dark Mode"
            tabIndex={0}
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

        {/* Generated Stars (Night Mode) */}
        {stars.map((star) => (
             <div 
                key={star.id} 
                className={`absolute text-white transition-all duration-700`}
                style={{
                    top: `${star.top}%`,
                    left: `${star.left}%`,
                    // Animate entry/exit
                    opacity: isNight ? (star.type === 'dot' ? 0.7 : 1) : 0,
                    transform: isNight ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0)',
                    transitionDelay: `${star.delay * 0.1}s` // Stagger entrance
                }}
             >
                <div style={{
                   animation: `float ${star.driftDuration}s ease-in-out infinite`,
                   animationDelay: `${star.driftDelay}s`
                }}>
                  {star.type === 'star' ? (
                      <div 
                          style={{ 
                              animation: `twinkle ${star.duration}s infinite ease-in-out`,
                              animationDelay: `${star.delay}s`
                          }}
                      >
                          <StarIcon size={star.size} />
                      </div>
                  ) : (
                      <div 
                          className="bg-white rounded-full shadow-[0_0_4px_white]" 
                          style={{ 
                              width: Math.max(2, star.size/5), 
                              height: Math.max(2, star.size/5),
                              opacity: 0.8,
                              animation: `twinkle ${star.duration}s infinite ease-in-out`,
                              animationDelay: `${star.delay}s`
                          }} 
                      />
                  )}
                </div>
             </div>
        ))}


        {/* Clouds (Day Mode) */}
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

        {/* --- The Handle Wrapper (Moves Left/Right) --- */}
        <div
            className={`
                absolute top-1 left-1 z-20
                /* Handle Size: 120px (7.5rem) inside 128px container leaving 4px padding top/bottom */
                w-[120px] h-[120px]
                transition-all duration-700 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]
                ${/* 
                   Translate Calculation:
                   Container: 328px
                   Handle: 120px
                   Start Pos (left-1): 4px
                   End Pos (right-1): 4px from right
                   
                   Travel needed = Container(328) - Handle(120) - PaddingLeft(4) - PaddingRight(4) = 200px
                */ ''}
                ${isNight ? 'translate-x-[200px]' : 'translate-x-0'}
            `}
        >
            
            {/* Sun Rays (Behind the sphere) */}
            {/* Only visible in day mode. We use a container that rotates. */}
            <div className={`absolute inset-0 -z-10 transition-opacity duration-500 ${isNight ? 'opacity-0' : 'opacity-100'}`}>
                <div className="w-full h-full relative animate-spin-slow">
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute top-1/2 left-1/2 w-32 h-1 bg-white/40 rounded-full"
                            style={{
                                transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateX(28px)`, // push out from center
                            }}
                        ></div>
                    ))}
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={`short-${i}`}
                            className="absolute top-1/2 left-1/2 w-20 h-1 bg-yellow-200/30 rounded-full"
                            style={{
                                transform: `translate(-50%, -50%) rotate(${i * 45 + 22.5}deg) translateX(24px)`,
                            }}
                        ></div>
                    ))}
                </div>
            </div>

            {/* The Sphere (Sun / Moon) - Contains the masking logic */}
            <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.3),inset_0_-4px_4px_rgba(0,0,0,0.1),inset_0_4px_8px_rgba(255,255,255,0.6)]">
                
                {/* Sun Background (Base Layer) */}
                <div className="absolute inset-0 bg-[#FFD02D] transition-colors duration-500"></div>

                {/* Moon Overlay (Eclipse Effect) */}
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

                {/* Shine/Highlight on the sphere */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/60 via-transparent to-black/5 opacity-100 pointer-events-none"></div>
            </div>
        </div>

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