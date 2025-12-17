import React, { useState } from 'react';
import { X, Receipt, CreditCard, CheckCircle } from 'lucide-react';

export default function PaymentModal({ isOpen, onClose, entryTime, elapsed, fee, onConfirmPayment }) {
  const [isPaying, setIsPaying] = useState(false);

  if (!isOpen) return null;

  const handlePay = () => {
    setIsPaying(true);
    // 1.5초 후 부모 컴포넌트의 결제 완료 함수 호출
    setTimeout(() => {
      setIsPaying(false);
      onConfirmPayment();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-white rounded-t-3xl p-6 shadow-2xl animate-slide-up">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Receipt size={24} className="text-slate-900"/>
            정산 내역서
          </h2>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
            <X size={20} className="text-gray-600"/>
          </button>
        </div>

        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-6 space-y-3">
          <div className="flex justify-between text-gray-500 text-sm">
            <span>입차 시간</span>
            <span>{entryTime?.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
          </div>
          <div className="flex justify-between text-gray-500 text-sm">
            <span>총 이용 시간</span>
            <span>{Math.floor(elapsed / 60)}분 {elapsed % 60}초</span>
          </div>
          <div className="border-t border-dashed border-gray-300 my-2 pt-2 flex justify-between text-gray-500 text-sm">
            <span>추가 요금</span>
            <span>{fee.toLocaleString()}원</span>
          </div>
          <div className="border-t-2 border-slate-800 pt-3 mt-3 flex justify-between items-center">
            <span className="font-bold text-slate-800">총 결제 금액</span>
            <span className="text-2xl font-black text-blue-600">{fee.toLocaleString()}원</span>
          </div>
        </div>

        <button 
          onClick={handlePay}
          disabled={isPaying}
          className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-slate-800 disabled:bg-gray-400 flex items-center justify-center gap-2 transition-all"
        >
          {isPaying ? '결제 중...' : <><CheckCircle size={20} /> 결제 및 출차하기</>}
        </button>
      </div>
    </div>
  );
}