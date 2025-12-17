import React from 'react';
import { Car } from 'lucide-react';

export default function Header({ carNumber, isRegistered }) {
  return (
    <header className="px-6 py-5 bg-white z-10 flex justify-between items-center border-b border-gray-100 sticky top-0">
      <div>
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center font-black">P</div>
          Parking System
        </h1>
      </div>
      {isRegistered && (
        <div className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-full">
          <Car size={14} className="text-slate-500"/>
          <span className="text-sm font-bold text-slate-700">{carNumber}</span>
        </div>
      )}
    </header>
  );
}