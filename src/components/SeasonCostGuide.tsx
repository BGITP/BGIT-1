import React, { useState } from 'react';
import { FAQ_SEASON_AND_COST } from '../data/golfData';
import { HelpCircle, Thermometer, DollarSign, Sun } from 'lucide-react';

export const SeasonCostGuide: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<number>(11);

  const monthsData: Record<number, { season: string; temp: string; weather: string; tip: string }> = {
    11: { season: '건기 / 최성수기', temp: '24°C ~ 31°C', weather: '선선하고 쾌적한 최상의 라운드 기후', tip: '티타임 부킹 마감이 빠르므로 40일 전 예약 권장' },
    12: { season: '건기 / 극성수기', temp: '22°C ~ 30°C', weather: '태국에서 가장 쾌적하고 맑은 날씨', tip: '연말·크리스마스 피크 시즌 서차지 유의' },
    1: { season: '건기 / 극성수기', temp: '22°C ~ 31°C', weather: '선선한 바람, 습도 낮음', tip: '오전 7~8시 황금 티타임 선점 추천' },
    2: { season: '건기 / 성수기', temp: '24°C ~ 32°C', weather: '비가 거의 내리지 않는 쾌적한 날씨', tip: '설 연휴 연휴 조기 마감 대비' },
    3: { season: '하계 / 더운 시즌', temp: '27°C ~ 35°C', weather: '기온 상승, 건조함', tip: '오전 6시대 조기 티타임 및 수분 섭취 필수' },
    4: { season: '하계 / 송크란 축제', temp: '29°C ~ 37°C', weather: '한낮 폭염, 송크란 물축제 기간', tip: '송크란 기간 호텔 서차지 발생, 이른 티타임 권장' },
    5: { season: '하계 / 계절 전환기', temp: '28°C ~ 35°C', weather: '더위 지속, 간헐적 스콜 시작', tip: '전자입국카드(TDAC) 필수 작성' },
    6: { season: '우기 / 비수기 특가', temp: '26°C ~ 33°C', weather: '오후 스콜성 소나기', tip: '그린피 특가 혜택, 오전 18홀 라운드 완료 권장' },
    7: { season: '우기 / 비수기 특가', temp: '26°C ~ 33°C', weather: '하루 1~2시간 짧은 스콜', tip: '우산과 여벌 장갑 준비 권장' },
    8: { season: '우기 / 여름방학 시즌', temp: '26°C ~ 33°C', weather: '소나기 후 맑은 하늘', tip: '그늘집에서 잠시 비를 피하면 플레이 가능' },
    9: { season: '우기 / 강우 집중', temp: '25°C ~ 32°C', weather: '우기 중 강수량 최다월', tip: '배수 시설이 뛰어난 상급 코스 추천' },
    10: { season: '우기 말 / 시즌 개시', temp: '25°C ~ 32°C', weather: '비 점차 감소, 건기 진입 준비', tip: '성수기 대비 합리적인 가격대 라운드 가능' },
  };

  const currentMonthInfo = monthsData[selectedMonth];

  return (
    <section id="season-guide" className="py-16 sm:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header strictly matching PDF & Screenshot */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wider uppercase mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            Season & Cost Guide
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mb-2">
            시즌과 비용, 이것만 알면 됩니다
          </h2>
          <p className="text-stone-500 text-sm sm:text-base">
            처음 가는 분들이 가장 많이 묻는 세 가지
          </p>
        </div>

        {/* 3 Core Questions matching PDF exactly */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {FAQ_SEASON_AND_COST.map((faq, index) => {
            const icons = [
              <Sun key="1" className="w-5 h-5 text-amber-600" />,
              <DollarSign key="2" className="w-5 h-5 text-emerald-700" />,
              <HelpCircle key="3" className="w-5 h-5 text-indigo-600" />,
            ];

            return (
              <div
                key={index}
                className="bg-white p-6 sm:p-7 rounded-xl border border-stone-200/90 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-1.5 h-4 bg-emerald-700 rounded-full" />
                    <h3 className="text-lg font-bold text-stone-900 tracking-tight">
                      {faq.question}
                    </h3>
                  </div>
                  <p className="text-sm text-stone-600 leading-relaxed font-normal">
                    {faq.answer}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
                  <span>Q.0{index + 1} 핵심 가이드</span>
                  {icons[index]}
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Month Picker & Weather Matrix */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-emerald-700" />
                태국 월별 기후 & 라운드 환경 시뮬레이터
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                출국 예정 월을 클릭하시면 기후 특성과 권장 티타임을 확인하실 수 있습니다.
              </p>
            </div>
            <div className="text-xs text-stone-500 font-medium">
              선택한 달: <strong className="text-emerald-800 text-sm font-bold">{selectedMonth}월</strong> ({currentMonthInfo.season} · {currentMonthInfo.temp})
            </div>
          </div>

          {/* Month buttons (12 months) */}
          <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5 mb-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => {
              const isPeak = [11, 12, 1, 2].includes(m);
              const isSelected = selectedMonth === m;

              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => setSelectedMonth(m)}
                  className={`py-2 px-1 text-xs font-semibold rounded-lg transition-all text-center ${
                    isSelected
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : isPeak
                      ? 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-200/60'
                      : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  <div>{m}월</div>
                  <div className="text-[10px] font-normal opacity-75">
                    {isPeak ? '건기' : m >= 6 && m <= 10 ? '우기' : '하계'}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
