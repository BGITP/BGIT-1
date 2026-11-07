import React, { useState } from 'react';
import { Thermometer } from 'lucide-react';

export const MonthWeatherPicker: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<number>(11);

  const monthsData: Record<number, { season: string; temp: string; weather: string; tip: string }> = {
    10: { season: '성수기 / 시즌 개시', temp: '25°C ~ 32°C', weather: '선선해지는 날씨와 함께 성수기 라운드 개시', tip: '성수기 대비 합리적인 가격대와 쾌적한 플레이 가능' },
    11: { season: '성수기 / 최성수기', temp: '24°C ~ 31°C', weather: '선선하고 쾌적한 최상의 라운드 기후', tip: '티타임 부킹 마감이 빠르므로 40일 전 예약 권장' },
    12: { season: '성수기 / 극성수기', temp: '22°C ~ 30°C', weather: '태국에서 가장 쾌적하고 맑은 날씨', tip: '연말·크리스마스 피크 시즌 서차지 유의' },
    1: { season: '성수기 / 극성수기', temp: '22°C ~ 31°C', weather: '선선한 바람, 습도 낮음 최상의 컨디션', tip: '오전 7~8시 황금 티타임 선점 추천' },
    2: { season: '성수기 / 최성수기', temp: '24°C ~ 32°C', weather: '비가 거의 내리지 않는 쾌적한 날씨', tip: '설 연휴 조기 마감 대비 사전 예약 권장' },
    3: { season: '성수기 / 봄 시즌', temp: '27°C ~ 34°C', weather: '화창하고 따뜻한 날씨, 성수기 쾌적 라운드', tip: '오전 6~7시대 조기 티타임으로 여유로운 18홀 라운드 추천' },
    4: { season: '비수기 / 송크란 축제', temp: '29°C ~ 37°C', weather: '기온 상승 및 송크란 물축제 기간', tip: '비수기 특가 적용, 이른 아침 라운드 권장' },
    5: { season: '비수기 / 실속 라운드', temp: '28°C ~ 35°C', weather: '간헐적 스콜 시작, 합리적인 요금', tip: '전자입국카드(TDAC) 필수 작성 및 알뜰 골프 추천' },
    6: { season: '비수기 / 특가 프로모션', temp: '26°C ~ 33°C', weather: '오후 스콜성 소나기, 오전 쾌적', tip: '그린피 특가 혜택, 오전 18홀 라운드 완료 권장' },
    7: { season: '비수기 / 여름 특가', temp: '26°C ~ 33°C', weather: '하루 1~2시간 짧은 스콜 후 맑음', tip: '우산과 여벌 장갑 준비, 여유로운 코스 플레이' },
    8: { season: '비수기 / 여름방학 시즌', temp: '26°C ~ 33°C', weather: '소나기 후 맑은 하늘, 비수기 최저가', tip: '그늘집에서 잠시 비를 피하면 원활한 플레이 가능' },
    9: { season: '비수기 / 파격 특가', temp: '25°C ~ 32°C', weather: '비수기 파격 프로모션 시즌', tip: '배수 시설이 뛰어난 상급 코스 추천으로 만족도 유지' },
  };

  const currentMonthInfo = monthsData[selectedMonth];

  return (
    <div>
      {/* Section Header - Exactly matching reference image left position */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          {/* Weather & Climate - matched to uploaded screenshot */}
          <div className="pl-7 mb-1.5">
            <span className="text-xs sm:text-[13px] font-semibold text-[#007a55] tracking-wider uppercase">
              WEATHER & CLIMATE
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-[#222222] flex items-center gap-2">
            <Thermometer className="w-5 h-5 text-[#007a55] shrink-0" />
            <span>태국 월별 기후 & 라운드 환경 시뮬레이터</span>
          </h3>
          <p className="text-xs sm:text-[13px] text-[#666666] mt-1.5 pl-7 font-normal">
            출국 예정 월을 클릭하시면 기후 특성과 권장 티타임을 확인하실 수 있습니다.
          </p>
        </div>
        <div className="text-xs text-stone-500 font-medium">
          선택한 달: <strong className="text-emerald-800 text-sm font-bold">{selectedMonth}월</strong> ({currentMonthInfo.season} · {currentMonthInfo.temp})
        </div>
      </div>

      {/* Simulator Interactive Card */}
      <div className="bg-stone-50/70 p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs hover:border-[#d0fae5] transition-colors">
        {/* Month buttons (12 months) */}
      <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5 mb-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => {
          const isPeak = [10, 11, 12, 1, 2, 3].includes(m);
          const isSelected = selectedMonth === m;

          return (
            <button
              key={m}
              type="button"
              onClick={() => setSelectedMonth(m)}
              className={`py-2 px-1 text-xs font-semibold rounded-lg transition-all text-center cursor-pointer ${
                isSelected
                  ? 'bg-emerald-800 text-white shadow-xs scale-102 ring-2 ring-emerald-600 ring-offset-1 border border-transparent'
                  : isPeak
                  ? 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-stone-200 hover:border-[#d0fae5] font-bold'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200 hover:border-[#d0fae5]'
              }`}
            >
              <div className="text-xs">{m}월</div>
              <div className="text-[10px] font-medium opacity-90">
                {isPeak ? '성수기' : '비수기'}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Month Details Card */}
      <div className="p-4 sm:p-5 rounded-xl bg-white border border-stone-200 hover:border-[#d0fae5] transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-0.5 text-xs font-bold rounded-md border border-stone-200 ${
                [10, 11, 12, 1, 2, 3].includes(selectedMonth)
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {currentMonthInfo.season}
            </span>
            <span className="text-xs font-semibold text-stone-700">기온 {currentMonthInfo.temp}</span>
          </div>
          <p className="text-sm font-semibold text-stone-900">{currentMonthInfo.weather}</p>
        </div>
        <div className="text-xs text-stone-800 bg-stone-50 px-3.5 py-2.5 rounded-lg border border-stone-200 hover:border-[#d0fae5] transition-colors shadow-2xs font-medium">
          💡 <strong className="font-bold">라운드 팁:</strong> {currentMonthInfo.tip}
        </div>
      </div>
    </div>
  </div>
);
};
