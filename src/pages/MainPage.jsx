import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { RefreshCw, CreditCard } from 'lucide-react';

// 컴포넌트 불러오기
import Header from '../components/Header';
import CarForm from '../components/CarForm';
import TimerCard from '../components/TimerCard';
import MapCard from '../components/MapCard';
import PaymentModal from '../components/PaymentModal';
import InfoModal from '../components/InfoModal'; // 🔥 새로 만든 모달 임포트

export default function MainPage() {
  // --- 상태 관리 ---
  const [carNumber, setCarNumber] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [parkingSpot, setParkingSpot] = useState(null);
  const [entryTime, setEntryTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [fee, setFee] = useState(0);
  
  // 모달 상태 관리
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false); // 🔥 안내창 상태 추가

  const location = useLocation();

  // --- 핸들러 함수들 ---
  const handleRegister = useCallback(() => {
    if (carNumber.length < 4) return alert("차량 번호를 입력해주세요!");
    localStorage.setItem('myCarNumber', carNumber);
    setIsRegistered(true);
  }, [carNumber]);

  const handleParkingStart = useCallback((spot) => {
    setParkingSpot(spot);
    setEntryTime(new Date());
    setIsPaymentOpen(false);
  }, []);

  const handleOpenMap = useCallback(() => {
    const lat = 35.1903901; 
    const lng = 128.0804248;
    window.open(`https://maps.google.com/?cid=521900580058421990&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQ{lat},${lng}`, '_blank');
  }, [parkingSpot]);

  const handlePaymentComplete = useCallback(() => {
    setIsPaymentOpen(false);
    setEntryTime(null);
    setElapsed(0);
    setFee(0);
    alert("정산이 완료되었습니다. 안녕히 가세요!");
  }, []);

  // --- Effect Hooks ---
  useEffect(() => {
    const savedCar = localStorage.getItem('myCarNumber');
    if (savedCar) {
      setCarNumber(savedCar);
      setIsRegistered(true);
    }
    const params = new URLSearchParams(location.search);
    const spotFromQR = params.get('spot');
    
    if (spotFromQR) {
      handleParkingStart(spotFromQR);
    }
  }, [location, handleParkingStart]);

  useEffect(() => {
    let timer;
    // 안내창이나 결제창이 열려있지 않을 때만 타이머 갱신 (선택사항)
    if (entryTime && !isPaymentOpen) {
      timer = setInterval(() => {
        const now = new Date();
        const diffSeconds = Math.floor((now - entryTime) / 1000);
        setElapsed(diffSeconds);

        if (diffSeconds <= 1800) {
          setFee(0);
        } else {
          const chargeableMin = Math.ceil((diffSeconds - 1800) / 60);
          const calculatedFee = Math.ceil(chargeableMin / 10) * 500;
          setFee(Math.min(calculatedFee, 10000));
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [entryTime, isPaymentOpen]);

  // --- 화면 렌더링 ---
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center relative">
      <div className="w-full max-w-md bg-white shadow-2xl min-h-screen relative flex flex-col">
        
        <Header carNumber={carNumber} isRegistered={isRegistered} />

        <main className="flex-1 p-6 overflow-y-auto pb-32">
          {!isRegistered && (
            <CarForm 
              carNumber={carNumber} 
              setCarNumber={setCarNumber} 
              onRegister={handleRegister} 
            />
          )}

          {isRegistered && !entryTime && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold">입차 대기 중</h2>
                  <p className="mt-4 text-sm text-slate-400">QR코드를 스캔해주세요.</p>
                </div>
                <div className="absolute right-[-20px] bottom-[-20px] opacity-10"><RefreshCw size={150} /></div>
              </div>
              <button onClick={() => handleParkingStart('A-1')} className="w-full py-4 border-2 border-dashed border-slate-300 text-slate-500 rounded-xl font-semibold hover:bg-slate-50 flex items-center justify-center gap-2">
                <RefreshCw size={18} /> (테스트용) QR 스캔
              </button>
            </div>
          )}

          {isRegistered && entryTime && (
            <div className="space-y-6 animate-fade-in-up">
              {/* 🔥 TimerCard에 함수 전달 */}
              <TimerCard 
                elapsed={elapsed} 
                fee={fee} 
                onInfoClick={() => setIsInfoOpen(true)} 
              />
              <MapCard spot={parkingSpot} onOpenMap={handleOpenMap} />
            </div>
          )}
        </main>

        {entryTime && (
          <div className="absolute bottom-0 left-0 w-full bg-white border-t border-gray-100 p-6 rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.05)] z-20">
             <div className="flex justify-between items-end mb-4 px-1">
              <span className="text-slate-500 text-sm font-medium">최종 결제 금액</span>
              <span className="text-2xl font-black text-slate-900">{fee.toLocaleString()}원</span>
            </div>
            <button 
              onClick={() => setIsPaymentOpen(true)}
              className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-slate-800 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <CreditCard size={20} /> 정산하기
            </button>
          </div>
        )}

        {/* 결제 모달 */}
        <PaymentModal 
          isOpen={isPaymentOpen} 
          onClose={() => setIsPaymentOpen(false)}
          entryTime={entryTime}
          elapsed={elapsed}
          fee={fee}
          onConfirmPayment={handlePaymentComplete}
        />

        {/* 🔥 안내 모달 추가 */}
        <InfoModal 
          isOpen={isInfoOpen}
          onClose={() => setIsInfoOpen(false)}
        />

      </div>
    </div>
  );
}