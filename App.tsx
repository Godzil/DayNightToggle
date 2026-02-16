import React, { useState } from 'react';
import DayNightToggle from './components/DayNightToggle';

type ThemeKey = 'default' | 'ocean' | 'forest' | 'sunset';

const themes = {
  default: {
    name: 'Default',
    dayBg: 'bg-[#F0F4F8]',
    nightBg: 'bg-[#0f172a]',
    dayCard: 'bg-white border-slate-100',
    nightCard: 'bg-[#1e293b] border-[#334155]',
    dayText: 'text-slate-800',
    nightText: 'text-slate-100',
    label: 'Slate',
    // Toggle Specific Colors
    toggleDay: '#6EBFF7',
    toggleNight: '#1a1c29'
  },
  ocean: {
    name: 'Ocean',
    dayBg: 'bg-cyan-50',
    nightBg: 'bg-slate-900',
    dayCard: 'bg-white/80 border-cyan-100',
    nightCard: 'bg-slate-800 border-slate-700',
    dayText: 'text-cyan-900',
    nightText: 'text-cyan-50',
    label: 'Blue',
    toggleDay: '#22d3ee', // Cyan-400
    toggleNight: '#164e63' // Cyan-950
  },
  forest: {
    name: 'Forest',
    dayBg: 'bg-emerald-50',
    nightBg: 'bg-neutral-900',
    dayCard: 'bg-white/80 border-emerald-100',
    nightCard: 'bg-neutral-800 border-neutral-700',
    dayText: 'text-emerald-900',
    nightText: 'text-emerald-50',
    label: 'Green',
    toggleDay: '#4ade80', // Green-400
    toggleNight: '#064e3b' // Green-950
  },
  sunset: {
    name: 'Sunset',
    dayBg: 'bg-orange-50',
    nightBg: 'bg-purple-950',
    dayCard: 'bg-white/80 border-orange-100',
    nightCard: 'bg-purple-900 border-purple-800',
    dayText: 'text-orange-900',
    nightText: 'text-rose-50',
    label: 'Orange',
    toggleDay: '#fb923c', // Orange-400
    toggleNight: '#4c1d95' // Violet-900
  }
};

const App: React.FC = () => {
  const [isNight, setIsNight] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>('default');

  const toggleTheme = () => {
    setIsNight(!isNight);
  };

  const theme = themes[currentTheme];

  return (
    <div className={`min-h-screen w-full flex flex-col items-center transition-colors duration-700 py-12 px-4 gap-12 ${isNight ? theme.nightBg : theme.dayBg}`}>
      
      {/* Theme Selector */}
      <div className={`absolute top-4 right-4 z-50 flex gap-2 p-2 rounded-full shadow-sm border transition-colors duration-500 ${isNight ? 'bg-black/20 border-white/10' : 'bg-white/50 border-black/5'}`}>
        {(Object.keys(themes) as ThemeKey[]).map((key) => (
          <button
            key={key}
            onClick={() => setCurrentTheme(key)}
            className={`w-6 h-6 rounded-full transition-all duration-300 ${
              currentTheme === key 
                ? 'ring-2 ring-offset-2 ring-blue-500 scale-110' 
                : 'hover:scale-110 opacity-70 hover:opacity-100'
            }`}
            style={{
               backgroundColor: key === 'default' ? '#64748b' : 
                               key === 'ocean' ? '#06b6d4' :
                               key === 'forest' ? '#10b981' : '#f97316'
            }}
            aria-label={`Select ${themes[key].name} theme`}
            title={themes[key].name}
          />
        ))}
      </div>

      {/* Main Feature Panel */}
      <div className={`p-8 md:p-12 rounded-3xl shadow-xl flex flex-col items-center gap-8 border transition-colors duration-700 max-w-2xl w-full ${isNight ? theme.nightCard : theme.dayCard}`}>
        <h1 className={`text-3xl font-bold tracking-tight transition-colors duration-700 ${isNight ? theme.nightText : theme.dayText}`}>
          {isNight ? 'Good Night' : 'Good Morning'}
        </h1>
        
        {/* Default Scale (1.0) */}
        <DayNightToggle 
            isNight={isNight} 
            onToggle={toggleTheme} 
            scale={1} 
            seed={1} 
            dayBgColor={theme.toggleDay}
            nightBgColor={theme.toggleNight}
        />
        
        <p className={`font-medium text-sm tracking-wide transition-colors duration-700 ${isNight ? 'text-slate-400' : 'text-slate-400'}`}>
          Main Control
        </p>
      </div>

      {/* Grid for Sizes and Variations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl items-start">
        
        {/* Scale Examples */}
        <div className={`p-8 rounded-2xl shadow-lg flex flex-col items-center gap-8 border transition-colors duration-700 h-full ${isNight ? theme.nightCard : theme.dayCard}`}>
           <h2 className={`text-lg font-semibold ${isNight ? theme.nightText : theme.dayText}`}>Size Variations</h2>
           <div className="flex flex-col items-center justify-center gap-8 w-full">
               
               <div className="flex flex-col items-center gap-2">
                   <DayNightToggle 
                        isNight={isNight} 
                        onToggle={toggleTheme} 
                        scale={1.0} 
                        seed={1} 
                        dayBgColor={theme.toggleDay}
                        nightBgColor={theme.toggleNight}
                   />
                   <span className={`text-xs uppercase tracking-wider ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>1.0x (Original)</span>
               </div>
               
               <div className="flex flex-row flex-wrap items-end justify-center gap-8 w-full">
                  <div className="flex flex-col items-center gap-2">
                      <DayNightToggle 
                        isNight={isNight} 
                        onToggle={toggleTheme} 
                        scale={0.8} 
                        seed={1} 
                        dayBgColor={theme.toggleDay}
                        nightBgColor={theme.toggleNight}
                      />
                      <span className={`text-xs uppercase tracking-wider ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>0.8x</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                      <DayNightToggle 
                        isNight={isNight} 
                        onToggle={toggleTheme} 
                        scale={0.6} 
                        seed={1} 
                        dayBgColor={theme.toggleDay}
                        nightBgColor={theme.toggleNight}
                      />
                      <span className={`text-xs uppercase tracking-wider ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>0.6x</span>
                  </div>
               </div>

               <div className="flex flex-row flex-wrap items-end justify-center gap-8 w-full">
                  <div className="flex flex-col items-center gap-2">
                      <DayNightToggle 
                        isNight={isNight} 
                        onToggle={toggleTheme} 
                        scale={0.4} 
                        seed={1} 
                        dayBgColor={theme.toggleDay}
                        nightBgColor={theme.toggleNight}
                      />
                      <span className={`text-xs uppercase tracking-wider ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>0.4x</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                      <DayNightToggle 
                        isNight={isNight} 
                        onToggle={toggleTheme} 
                        scale={0.25} 
                        seed={1} 
                        dayBgColor={theme.toggleDay}
                        nightBgColor={theme.toggleNight}
                      />
                      <span className={`text-xs uppercase tracking-wider ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>0.25x</span>
                  </div>
               </div>

           </div>
        </div>

        {/* Seed/Randomness Examples (Fixed Scale 0.6) */}
        <div className={`p-8 rounded-2xl shadow-lg flex flex-col items-center gap-8 border transition-colors duration-700 h-full ${isNight ? theme.nightCard : theme.dayCard}`}>
           <h2 className={`text-lg font-semibold ${isNight ? theme.nightText : theme.dayText}`}>Star Seeds (0.6x)</h2>
           <p className={`text-sm text-center -mt-4 mb-2 ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>
             Switch to Night mode to see different star patterns.
           </p>
           <div className="flex flex-col items-center gap-8">
               <div className="flex flex-col items-center gap-2">
                   <DayNightToggle 
                        isNight={isNight} 
                        onToggle={toggleTheme} 
                        scale={0.6} 
                        seed={123} 
                        dayBgColor={theme.toggleDay}
                        nightBgColor={theme.toggleNight}
                   />
                   <span className={`text-xs uppercase tracking-wider ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>Seed 123</span>
               </div>
               <div className="flex flex-col items-center gap-2">
                   <DayNightToggle 
                        isNight={isNight} 
                        onToggle={toggleTheme} 
                        scale={0.6} 
                        seed={999} 
                        dayBgColor={theme.toggleDay}
                        nightBgColor={theme.toggleNight}
                   />
                   <span className={`text-xs uppercase tracking-wider ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>Seed 999</span>
               </div>
               <div className="flex flex-col items-center gap-2">
                   <DayNightToggle 
                        isNight={isNight} 
                        onToggle={toggleTheme} 
                        scale={0.6} 
                        seed={42} 
                        dayBgColor={theme.toggleDay}
                        nightBgColor={theme.toggleNight}
                   />
                   <span className={`text-xs uppercase tracking-wider ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>Seed 42</span>
               </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default App;