import React from 'react';
import DayNightToggle from './components/DayNightToggle';

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-100 p-8">
      <div className="bg-white p-12 rounded-3xl shadow-xl flex flex-col items-center gap-8 border border-slate-100">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Theme Switcher</h1>
        <DayNightToggle />
        <p className="text-slate-400 font-medium text-sm tracking-wide">CLICK TO TOGGLE</p>
      </div>
    </div>
  );
};

export default App;