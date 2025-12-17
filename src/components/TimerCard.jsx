import React from "react";
import { Info, Clock } from "lucide-react";

export default function TimerCard({ elapsed, fee, onInfoClick }) {
  const isFree = fee === 0;
  // 최대 요금 도달 여부 (10,000원)
  const isMaxFee = fee >= 10000;

  const statusColor = isFree ? "text-emerald-500" : "text-rose-500";
  const statusBg = isFree ? "bg-emerald-50" : "bg-rose-50";
  const statusBorder = isFree ? "border-emerald-100" : "border-rose-100";

  // 시간 포맷팅 함수 (MM:SS)
  const formatTime = (totalSec) => {
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    return `${h > 0 ? h + ":" : ""}${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  // 🔥 남은 시간 계산 로직
  const getRemainingInfo = () => {
    if (isMaxFee) {
      return {
        label: "일일 최대 요금 적용 중",
        timeText: "",
        desc: "더 이상 요금이 부과되지 않습니다."
      };
    }

    if (isFree) {
      // 무료 시간(30분=1800초) - 경과 시간
      const remaining = 1800 - elapsed;
      return {
        label: "무료 시간 종료까지",
        timeText: formatTime(remaining > 0 ? remaining : 0),
        desc: "남았습니다."
      };
    } else {
      // 유료 시간: (경과시간 - 무료30분) % 10분(600초)
      const chargedTime = elapsed - 1800;
      const timeInCycle = chargedTime % 600;
      const remaining = 600 - timeInCycle;
      return {
        label: "다음 요금 추가까지",
        timeText: formatTime(remaining),
        desc: "남았습니다."
      };
    }
  };

  const remainingInfo = getRemainingInfo();

  return (
    <div
      className={`relative rounded-3xl p-8 text-center border-2 shadow-sm transition-all duration-500 ${statusBg} ${statusBorder}`}
    >
      {/* 정보 아이콘 */}
      <div className="absolute top-4 right-4 cursor-pointer text-slate-400 hover:text-slate-600 transition-colors">
        <Info size={24} onClick={onInfoClick} />
      </div>

      <p className={`text-sm font-bold uppercase tracking-wider mb-2 ${statusColor}`}>
        {isFree ? "무료 주차 시간" : "유료 주차 시간"}
      </p>

      {/* 메인 타이머 */}
      <div className={`text-6xl font-mono font-black tracking-tighter mb-4 ${statusColor}`}>
        {formatTime(elapsed)}
      </div>

      {/* 현재 요금 뱃지 */}
      <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 mb-6">
        <span className="text-xs text-gray-400 font-bold">현재요금</span>
        <span className={`text-lg font-bold ${statusColor}`}>
          {fee.toLocaleString()}원
        </span>
      </div>

      {/* 🔥 하단 남은 시간 안내 (Progress 느낌) */}
      <div className="border-t border-black/5 pt-4 mt-2">
        <div className={`flex items-center justify-center gap-2 text-sm font-medium ${isFree ? 'text-emerald-700' : 'text-rose-700'}`}>
          {!isMaxFee && <Clock size={16} />} 
          <span>{remainingInfo.label}</span>
          
          {remainingInfo.timeText && (
            <span className="font-mono font-bold text-lg bg-white/50 px-2 rounded">
              {remainingInfo.timeText}
            </span>
          )}
        </div>
        {!isMaxFee && (
           <p className="text-xs text-gray-500 mt-1">{remainingInfo.desc}</p>
        )}
      </div>
    </div>
  );
}