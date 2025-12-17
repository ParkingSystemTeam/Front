import React from 'react';
import { Car } from 'lucide-react';

export default function CarForm({ carNumber, setCarNumber, onRegister }) {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6 animate-fade-in-up">
      <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
        <Car size={40} className="text-blue-500" />
      </div>
      <h2 className="text-2xl font-bold text-slate-800">차량을 등록해주세요</h2>
      <div className="w-full space-y-3">
        <input 
          type="text" 
          placeholder="예: 123가 4567"
          className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-lg text-center font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={carNumber}
          onChange={(e) => setCarNumber(e.target.value)}
        />
        <button onClick={onRegister} className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-lg hover:bg-slate-800 transition-transform active:scale-95">
          등록 완료
        </button>
      </div>
    </div>
  );
}