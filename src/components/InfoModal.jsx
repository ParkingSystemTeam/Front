import React from 'react';
import { X, Info, CheckCircle } from 'lucide-react';

export default function InfoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* 배경 (클릭 시 닫힘) */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />
      
      {/* 안내 카드 (슬라이드 업) */}
      <div className="relative w-full max-w-md bg-white rounded-t-3xl p-6 shadow-2xl animate-slide-up">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800">
            <Info size={24} className="text-blue-500"/>
            주차 요금 안내
          </h2>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
            <X size={20} className="text-gray-600"/>
          </button>
        </div>

        {/* 상세 규정 내용 */}
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-6 space-y-4">
          
          <div className="flex justify-between items-center border-b border-gray-200 pb-3">
            <span className="text-gray-500 font-medium">기본 회차 시간</span>
            <span className="text-slate-800 font-bold text-lg">30분 무료</span>
          </div>
          
          <div className="flex justify-between items-center border-b border-gray-200 pb-3">
            <span className="text-gray-500 font-medium">추가 요금</span>
            <div className="text-right">
              <span className="text-slate-800 font-bold">500원</span>
              <span className="text-xs text-gray-400 block">매 10분 당</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium">일일 최대 요금</span>
            <span className="text-blue-600 font-black text-lg">10,000원</span>
          </div>

        </div>

        <button 
          onClick={onClose}
          className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <CheckCircle size={20} />
          확인했습니다
        </button>
      </div>
    </div>
  );
}