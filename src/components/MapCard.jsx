import React from 'react';
import { Map as MapIcon, ExternalLink } from 'lucide-react';

export default function MapCard({ spot, onOpenMap }) {
  return (
    <div onClick={onOpenMap} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 cursor-pointer hover:border-blue-300 group transition-all">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-green-50 rounded-lg text-green-600 group-hover:bg-green-100 transition-colors">
          <MapIcon size={20} />
        </div>
        <div>
          <h3 className="font-bold text-slate-800 flex items-center gap-1">
            주차 위치 확인 <ExternalLink size={12} className="text-slate-400"/>
          </h3>
          <p className="text-xs text-slate-400">구글맵으로 위치 확인하기</p>
        </div>
        <div className="ml-auto text-2xl font-black text-slate-800">{spot}</div>
      </div>
      
      <div className="w-full h-32 bg-slate-100 rounded-xl flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-200 flex items-center justify-center text-slate-300">
          <MapIcon size={48} opacity={0.5} />
        </div>
        <div className="absolute z-10 bg-white px-3 py-1 rounded-full shadow-lg text-xs font-bold text-slate-700 flex items-center gap-1 group-hover:scale-105 transition-transform">
          <span className="flex gap-1">
             <span className="w-2 h-2 rounded-full bg-blue-500"></span>
             <span className="w-2 h-2 rounded-full bg-red-500"></span>
             <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
             <span className="w-2 h-2 rounded-full bg-green-500"></span>
          </span>
          Google Map
        </div>
      </div>
    </div>
  );
}