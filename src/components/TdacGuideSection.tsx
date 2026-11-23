import React, { useState } from 'react';
import {
  FileCheck2,
  ExternalLink,
  Copy,
  Check,
  AlertCircle,
  Clock,
  Globe,
  UserCheck,
  Plane,
  HeartPulse,
  CheckCircle2,
  X,
  MapPin,
  QrCode,
  Info,
} from 'lucide-react';

const OCCUPATION_EXAMPLES = [
  { kr: '자영업자', en: 'SELF-EMPLOYED' },
  { kr: '사업가', en: 'BUSINESSMAN' },
  { kr: '회사원', en: 'OFFICE WORKER' },
  { kr: '공무원', en: 'CIVIL SERVANT' },
  { kr: '교사', en: 'TEACHER' },
  { kr: '학생', en: 'STUDENT' },
  { kr: '주부', en: 'HOUSE WIFE' },
  { kr: '연금생활자', en: 'PENSIONER' },
];

export const TdacGuideSection: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [zoomImage, setZoomImage] = useState<{ src: string; alt: string } | null>(null);

  const CUSTOMER_GUIDE_URL = 'https://sites.google.com/view/bgittdac';
  const OFFICIAL_TDAC_URL = 'https://tdac.immigration.go.th/';

  const handleCopy = async (text: string, key: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2200);
    } catch {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2200);
    }
  };

  return (
    <section id="tdac-guide" className="pt-2 pb-10 sm:pb-14 bg-[#f6f4ee] md:bg-white scroll-mt-24">
      <div className="max-w-[1156px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-6 sm:mb-7">
          <h2 className="text-lg sm:text-xl font-bold text-[#222222] flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-200/80 flex items-center justify-center text-[#e05638] shrink-0">
              <FileCheck2 className="w-5.5 h-5.5 stroke-[2.2]" />
            </span>
            <span>태국 입국 전자카드 (TDAC) 작성 방법</span>
          </h2>
        </div>

        {/* Overview & Important Links Card */}
        <div className="bg-linear-to-b from-emerald-50/70 via-stone-50 to-white rounded-2xl border !border-[#a7f3d0] p-5 sm:p-7 shadow-xs mb-6 sm:mb-8 space-y-5">
          <div className="space-y-2.5 text-[13.5px] sm:text-[14.5px] text-stone-800 leading-relaxed">
            <p className="font-bold text-[#0f3d2e] text-sm sm:text-base">
              2025년 5월 1일부터 태국 입국 전에 전자입국카드 (TDAC: Thailand Digital Arrival Card)를 작성하여야 합니다.
            </p>
            <div className="space-y-1.5 text-xs sm:text-sm text-stone-700">
              <p className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#007a55] shrink-0 mt-0.5" />
                <span>
                  입국 <strong className="text-stone-900">3일(72시간) 전부터</strong> 태국 도착하여 입국 심사 하기 전까지 작성 가능하며, 그 이전에는 날짜 선택이 안 되어 작성할 수 없습니다.
                </span>
              </p>
              <p className="flex items-start gap-2">
                <Globe className="w-4 h-4 text-[#007a55] shrink-0 mt-0.5" />
                <span>
                  PC나 스마트폰 등 인터넷에 연결된 기기에서 TDAC 사이트에 접속하여 각 항목을 기입 또는 선택하여 제출합니다.
                </span>
              </p>
              <p className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-[#e05638] shrink-0 mt-0.5" />
                <span>
                  반드시 출발 전에 작성해야 하는 것은 아니며, 태국 도착 후 입국 수속 시 이미그레이션 앞에 있는 키오스크를 이용해 작성해도 되지만 이 경우 입국 수속 시간이 길어질 수 있습니다.
                </span>
              </p>
            </div>
          </div>

          {/* Customer Share Link & Official TDAC Link */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
            <div className="bg-white rounded-xl border border-emerald-200/80 p-4 flex flex-col justify-between gap-2.5">
              <div>
                <span className="inline-block text-sm sm:text-[15px] font-bold text-[#007a55] mb-1">
                  고객 전달용 안내 링크
                </span>
                <p className="text-xs sm:text-[13px] text-stone-700 font-medium leading-snug">
                  여행이 확정된 고객님께는 아래 링크를 복사해서 보내주시면 됩니다.
                </p>
              </div>
              <div className="flex items-center justify-between gap-2 bg-stone-50 border border-stone-200 rounded-lg px-3 py-2">
                <a
                  href={CUSTOMER_GUIDE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-[13px] font-bold text-[#0f3d2e] hover:underline truncate"
                >
                  {CUSTOMER_GUIDE_URL}
                </a>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleCopy(CUSTOMER_GUIDE_URL, 'customer')}
                    className="px-2.5 py-1 rounded-md bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    {copiedKey === 'customer' ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>복사됨</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>복사</span>
                      </>
                    )}
                  </button>
                  <a
                    href={CUSTOMER_GUIDE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-md bg-white border border-stone-200 hover:bg-stone-100 text-stone-700"
                    title="새 창에서 열기"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-emerald-200/80 p-4 flex flex-col justify-between gap-2.5">
              <div>
                <span className="inline-block text-sm sm:text-[15px] font-bold text-[#e05638] mb-1">
                  태국 이민국 공식 TDAC 사이트
                </span>
                <p className="text-xs sm:text-[13px] text-stone-700 font-medium leading-snug">
                  먼저 아래의 링크 TDAC 공식 사이트에 접속합니다.
                </p>
              </div>
              <div className="flex items-center justify-between gap-2 bg-stone-50 border border-stone-200 rounded-lg px-3 py-2">
                <a
                  href={OFFICIAL_TDAC_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-[13px] font-bold text-[#0f3d2e] hover:underline truncate"
                >
                  {OFFICIAL_TDAC_URL}
                </a>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleCopy(OFFICIAL_TDAC_URL, 'tdac')}
                    className="px-2.5 py-1 rounded-md bg-stone-800 hover:bg-stone-900 text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    {copiedKey === 'tdac' ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>복사됨</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>복사</span>
                      </>
                    )}
                  </button>
                  <a
                    href={OFFICIAL_TDAC_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-md bg-white border border-stone-200 hover:bg-stone-100 text-stone-700"
                    title="TDAC 공식 사이트 열기"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step-by-Step Visual Guide */}
        <div className="space-y-6 sm:space-y-8">
          {/* STEP 1: ① ~ ② */}
          <div className="bg-white rounded-[24px] border border-stone-200/90 shadow-[0_6px_28px_rgba(15,61,46,0.04)]">
            <div className="bg-[#faf9f6] border-b border-stone-200/80 rounded-t-[24px] px-5 sm:px-8 py-4 sm:py-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#0f3d2e] text-[#f0d28d] flex items-center justify-center font-extrabold text-sm tracking-tight shadow-xs shrink-0">
                  01
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-[#007a55]">
                    STEP 01 · LANGUAGE & START
                  </span>
                  <h3 className="text-base sm:text-[17px] font-bold text-[#10231b] tracking-tight">
                    언어 선택 및 입국카드 시작
                  </h3>
                </div>
              </div>
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-white ring-1 ring-stone-200/90 text-[11px] font-bold text-stone-600 tabular-nums">
                ① ~ ②
              </span>
            </div>

            <div className="p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              <div className="lg:col-span-5 lg:sticky lg:top-24">
                <div className="bg-[#f4f2ec] p-3 sm:p-3.5 rounded-2xl ring-1 ring-stone-200/70">
                  <button
                    type="button"
                    onClick={() => setZoomImage({ src: '/assets/aistudio/1_3613a3af.png', alt: 'TDAC 언어 선택 및 입국카드 시작 화면' })}
                    className="group relative w-full rounded-xl overflow-hidden bg-white shadow-[0_4px_16px_rgba(16,35,27,0.08)] cursor-zoom-in block"
                  >
                    <img
                      src="/assets/aistudio/1_3613a3af.png"
                      alt="TDAC 언어 선택 및 입국카드 시작 화면"
                      className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.015]"
                      loading="lazy"
                    />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="rounded-2xl bg-white ring-1 ring-stone-200/80 divide-y divide-stone-100 overflow-hidden">
                  <div className="px-4 sm:px-5 py-4 flex items-start gap-3.5 hover:bg-[#faf9f6]/70 transition-colors">
                    <span className="w-7 h-7 rounded-lg bg-[#fff4f0] text-[#e05638] font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                      ①
                    </span>
                    <div className="text-xs sm:text-[13.5px] text-stone-600 leading-relaxed">
                      <strong className="text-[#10231b] font-bold block mb-1 text-[13.5px] sm:text-sm">
                        언어 선택
                      </strong>
                      <span>
                        언어에서 <strong className="text-[#10231b] font-semibold">한국어</strong>를 선택할 수 있습니다.
                      </span>
                    </div>
                  </div>

                  <div className="px-4 sm:px-5 py-4 flex items-start gap-3.5 hover:bg-[#faf9f6]/70 transition-colors">
                    <span className="w-7 h-7 rounded-lg bg-[#fff4f0] text-[#e05638] font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                      ②
                    </span>
                    <div className="text-xs sm:text-[13.5px] text-stone-600 leading-relaxed space-y-2">
                      <div>
                        <strong className="text-[#10231b] font-bold block mb-1 text-[13.5px] sm:text-sm">
                          입국카드 선택
                        </strong>
                        <span>
                          <strong className="text-[#10231b] font-semibold">입국카드</strong>를 누릅니다.
                        </span>
                      </div>
                      <p className="text-[12px] sm:text-[12.5px] text-stone-500 bg-[#faf9f6] rounded-xl px-3.5 py-2.5 ring-1 ring-stone-200/60">
                        (이미 이 사이트에서 작성을 한 이력이 있고 항공편 변경 등 입국정보가 변경되어 수정을 해야 한다면{' '}
                        <strong className="text-stone-800">입국카드 업데이트</strong>로 들어갑니다.)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 2: ③ ~ ⑬ */}
          <div className="bg-white rounded-[24px] border border-stone-200/90 shadow-[0_6px_28px_rgba(15,61,46,0.04)]">
            <div className="bg-[#faf9f6] border-b border-stone-200/80 rounded-t-[24px] px-5 sm:px-8 py-4 sm:py-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#0f3d2e] text-[#f0d28d] flex items-center justify-center font-extrabold text-sm tracking-tight shadow-xs shrink-0">
                  02
                </div>
                <div>
                  <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#007a55]">
                    <UserCheck className="w-3 h-3" />
                    STEP 02 · PASSPORT & PROFILE
                  </span>
                  <h3 className="text-base sm:text-[17px] font-bold text-[#10231b] tracking-tight">
                    여권 및 개인 정보 입력
                  </h3>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-[#fff4f0] text-[#d9381e] text-[11px] font-bold">
                  영문 작성 필수 (소문자 → 자동 대문자)
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-white ring-1 ring-stone-200/90 text-[11px] font-bold text-stone-600 tabular-nums">
                  ③ ~ ⑬
                </span>
              </div>
            </div>

            <div className="p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              <div className="lg:col-span-5 lg:sticky lg:top-24">
                <div className="bg-[#f4f2ec] p-3 sm:p-3.5 rounded-2xl ring-1 ring-stone-200/70">
                  <button
                    type="button"
                    onClick={() => setZoomImage({ src: '/assets/aistudio/2_4bdb9c65.png', alt: 'TDAC 여권 및 개인 정보 입력 화면' })}
                    className="group relative w-full rounded-xl overflow-hidden bg-white shadow-[0_4px_16px_rgba(16,35,27,0.08)] cursor-zoom-in block"
                  >
                    <img
                      src="/assets/aistudio/2_4bdb9c65.png"
                      alt="TDAC 여권 및 개인 정보 입력 화면"
                      className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.015]"
                      loading="lazy"
                    />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-start gap-2.5 px-4 py-3 rounded-xl bg-amber-50/75 ring-1 ring-amber-200/70 text-xs sm:text-[13px] text-amber-950 font-medium">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    이하 모든 내용은 <strong className="font-bold">영문</strong>으로 작성합니다. 소문자로 입력하여도 자동적으로 대문자로 입력됩니다.
                  </span>
                </div>

                <ul className="rounded-2xl bg-white ring-1 ring-stone-200/80 divide-y divide-stone-100 overflow-hidden text-xs sm:text-[13.5px] text-stone-600 leading-relaxed">
                  <li className="px-4 sm:px-5 py-3 flex items-start gap-3 hover:bg-[#faf9f6]/60 transition-colors">
                    <span className="w-6 h-6 rounded-lg bg-[#fff4f0] text-[#e05638] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">③</span>
                    <span><strong className="text-[#10231b]">성</strong> (여권상 영문 성)</span>
                  </li>
                  <li className="px-4 sm:px-5 py-3 flex items-start gap-3 hover:bg-[#faf9f6]/60 transition-colors">
                    <span className="w-6 h-6 rounded-lg bg-[#fff4f0] text-[#e05638] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">④</span>
                    <span><strong className="text-[#10231b]">이름</strong> (여권상 영문 이름)</span>
                  </li>
                  <li className="px-4 sm:px-5 py-3 flex items-start gap-3 hover:bg-[#faf9f6]/60 transition-colors">
                    <span className="w-6 h-6 rounded-lg bg-[#fff4f0] text-[#e05638] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">⑤</span>
                    <span><strong className="text-[#10231b]">여권번호</strong></span>
                  </li>
                  <li className="px-4 sm:px-5 py-3 flex items-start gap-3 hover:bg-[#faf9f6]/60 transition-colors">
                    <span className="w-6 h-6 rounded-lg bg-[#fff4f0] text-[#e05638] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">⑥</span>
                    <span>
                      <strong className="text-[#10231b]">국적 :</strong> 대한민국은{' '}
                      <code className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#f4f2ec] text-[#0f3d2e] font-bold text-[11.5px] font-mono">
                        KOR:SOUTH KOREA
                      </code>
                      를 선택하며 중간쯤에 있습니다.
                    </span>
                  </li>
                  <li className="px-4 sm:px-5 py-3 flex items-start gap-3 hover:bg-[#faf9f6]/60 transition-colors">
                    <span className="w-6 h-6 rounded-lg bg-[#fff4f0] text-[#e05638] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">⑦</span>
                    <span><strong className="text-[#10231b]">생년월일</strong>을 년 · 월 · 일의 순으로 선택합니다.</span>
                  </li>
                  <li className="px-4 sm:px-5 py-3.5 flex items-start gap-3 hover:bg-[#faf9f6]/60 transition-colors">
                    <span className="w-6 h-6 rounded-lg bg-[#fff4f0] text-[#e05638] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">⑧</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span><strong className="text-[#10231b]">직업</strong>을 입력합니다. 대략적으로 적으면 됩니다.</span>
                        <span className="text-[10.5px] text-stone-400 font-medium">예시 클릭 시 영문 복사</span>
                      </div>
                      <div className="mt-2.5 grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {OCCUPATION_EXAMPLES.map((job) => {
                          const isJobCopied = copiedKey === `job-${job.en}`;
                          return (
                            <button
                              key={job.en}
                              type="button"
                              onClick={() => handleCopy(job.en, `job-${job.en}`)}
                              className="text-left bg-[#faf9f6] hover:bg-emerald-50/70 px-2.5 py-2 rounded-xl ring-1 ring-stone-200/80 hover:ring-[#007a55]/40 transition-all cursor-pointer group"
                            >
                              <div className="flex items-center justify-between gap-1">
                                <span className="text-[11px] text-stone-500 font-medium">{job.kr}</span>
                                {isJobCopied ? (
                                  <Check className="w-3 h-3 text-[#007a55] shrink-0" />
                                ) : (
                                  <Copy className="w-2.5 h-2.5 text-stone-300 group-hover:text-[#007a55] shrink-0 transition-colors" />
                                )}
                              </div>
                              <span className="block text-[11px] font-bold text-[#10231b] font-mono mt-0.5 truncate">
                                {isJobCopied ? '복사됨!' : job.en}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </li>
                  <li className="px-4 sm:px-5 py-3 flex items-start gap-3 hover:bg-[#faf9f6]/60 transition-colors">
                    <span className="w-6 h-6 rounded-lg bg-[#fff4f0] text-[#e05638] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">⑨</span>
                    <span><strong className="text-[#10231b]">성별</strong>을 선택합니다.</span>
                  </li>
                  <li className="px-4 sm:px-5 py-3 flex items-start gap-3 hover:bg-[#faf9f6]/60 transition-colors">
                    <span className="w-6 h-6 rounded-lg bg-[#fff4f0] text-[#e05638] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">⑩</span>
                    <span>비자가 있다면 비자번호를 기입합니다 <span className="text-stone-400">(공란으로 두시면 됩니다)</span>.</span>
                  </li>
                  <li className="px-4 sm:px-5 py-3 flex items-start gap-3 hover:bg-[#faf9f6]/60 transition-colors">
                    <span className="w-6 h-6 rounded-lg bg-[#fff4f0] text-[#e05638] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">⑪</span>
                    <span>
                      <strong className="text-[#10231b]">거주국가</strong>를 선택합니다. 대한민국이라면{' '}
                      <code className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#f4f2ec] text-[#0f3d2e] font-bold text-[11.5px] font-mono">
                        REPUBLIC OF KOREA
                      </code>
                      를 선택하며 중간의 약간 아랫부분에 있습니다.
                    </span>
                  </li>
                  <li className="px-4 sm:px-5 py-3 flex items-start gap-3 hover:bg-[#faf9f6]/60 transition-colors">
                    <span className="w-6 h-6 rounded-lg bg-[#fff4f0] text-[#e05638] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">⑫</span>
                    <span>
                      <strong className="text-[#10231b]">거주국 시도</strong>를 선택합니다 (
                      <code className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-[#f4f2ec] text-[#0f3d2e] font-bold text-[11.5px] font-mono">SEOUL</code>
                      {' · '}
                      <code className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-[#f4f2ec] text-[#0f3d2e] font-bold text-[11.5px] font-mono">BUSAN</code>
                      {' '}등).
                    </span>
                  </li>
                  <li className="px-4 sm:px-5 py-3 flex items-start gap-3 hover:bg-[#faf9f6]/60 transition-colors">
                    <span className="w-6 h-6 rounded-lg bg-[#fff4f0] text-[#e05638] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">⑬</span>
                    <span><strong className="text-[#10231b]">거주국 휴대폰번호</strong>를 입력합니다.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* STEP 3: ⑭-1 ~ ㉕ */}
          <div className="bg-white rounded-[24px] border border-stone-200/90 shadow-[0_6px_28px_rgba(15,61,46,0.04)]">
            <div className="bg-[#faf9f6] border-b border-stone-200/80 rounded-t-[24px] px-5 sm:px-8 py-4 sm:py-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#0f3d2e] text-[#f0d28d] flex items-center justify-center font-extrabold text-sm tracking-tight shadow-xs shrink-0">
                  03
                </div>
                <div>
                  <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#007a55]">
                    <Plane className="w-3 h-3" />
                    STEP 03 · FLIGHT & ACCOMMODATION
                  </span>
                  <h3 className="text-base sm:text-[17px] font-bold text-[#10231b] tracking-tight">
                    여행 정보 및 숙박 정보 입력
                  </h3>
                </div>
              </div>
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-white ring-1 ring-stone-200/90 text-[11px] font-bold text-stone-600 tabular-nums">
                ⑭-1 ~ ㉕
              </span>
            </div>

            <div className="p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              <div className="lg:col-span-5 lg:sticky lg:top-24">
                <div className="bg-[#f4f2ec] p-3 sm:p-3.5 rounded-2xl ring-1 ring-stone-200/70">
                  <button
                    type="button"
                    onClick={() => setZoomImage({ src: '/assets/aistudio/3_095fd0fd.png', alt: 'TDAC 여행 정보 및 숙박 정보 입력 화면' })}
                    className="group relative w-full rounded-xl overflow-hidden bg-white shadow-[0_4px_16px_rgba(16,35,27,0.08)] cursor-zoom-in block"
                  >
                    <img
                      src="/assets/aistudio/3_095fd0fd.png"
                      alt="TDAC 여행 정보 및 숙박 정보 입력 화면"
                      className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.015]"
                      loading="lazy"
                    />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div className="p-4 rounded-2xl bg-sky-50/75 ring-1 ring-sky-200/75 text-xs sm:text-[13px] text-slate-700 leading-relaxed flex items-start gap-3">
                  <span className="px-2 h-6 rounded-lg bg-white ring-1 ring-sky-200 text-[#e05638] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    ⑭-1
                  </span>
                  <div>
                    <strong className="text-slate-900 font-bold block mb-0.5">동반자 정보 자동 불러오기 (선택 기능)</strong>
                    <span>
                      처음에는 이 메뉴가 활성화되지 않습니다. 여행 동반자가 있다면 뒤에 나오는{' '}
                      <strong className="text-slate-900">㉗번 메뉴 다른여행자 추가하기</strong>를 눌러 동반자를 추가할 수 있습니다. 이때 ⑭-1 메뉴가 활성화되며 여기에서 먼저 입력된 기존 여행자를 선택하면{' '}
                      <strong className="text-slate-900">⑭~㉕까지의 정보가 동일하게 일괄 입력</strong>됩니다.
                    </span>
                  </div>
                </div>

                <ul className="rounded-2xl bg-white ring-1 ring-stone-200/80 divide-y divide-stone-100 overflow-hidden text-xs sm:text-[13.5px] text-stone-600 leading-relaxed">
                  <li className="px-4 sm:px-5 py-3 flex items-start gap-3 hover:bg-[#faf9f6]/60 transition-colors">
                    <span className="w-6 h-6 rounded-lg bg-[#fff4f0] text-[#e05638] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">⑭</span>
                    <span><strong className="text-[#10231b]">도착날짜</strong>를 선택합니다. 탑승날짜가 아닙니다.</span>
                  </li>
                  <li className="px-4 sm:px-5 py-3 flex items-start gap-3 hover:bg-[#faf9f6]/60 transition-colors">
                    <span className="w-6 h-6 rounded-lg bg-[#fff4f0] text-[#e05638] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">⑮</span>
                    <span><strong className="text-[#10231b]">항공편을 출발한 국가</strong>를 선택합니다. 입국하여 체류하지 않는 중간경유지가 있더라도 최초 출발한 국가를 선택합니다.</span>
                  </li>
                  <li className="px-4 sm:px-5 py-3 flex items-start gap-3 hover:bg-[#faf9f6]/60 transition-colors">
                    <span className="w-6 h-6 rounded-lg bg-[#fff4f0] text-[#e05638] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">⑯</span>
                    <span>
                      <strong className="text-[#10231b]">여행목적</strong>을 선택합니다. 일반적인 관광, 휴가의 경우{' '}
                      <code className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#f4f2ec] text-[#0f3d2e] font-bold text-[11.5px] font-mono">
                        HOLIDAY(휴가)
                      </code>
                      를 선택합니다.
                    </span>
                  </li>
                  <li className="px-4 sm:px-5 py-3 flex items-start gap-3 hover:bg-[#faf9f6]/60 transition-colors">
                    <span className="w-6 h-6 rounded-lg bg-[#fff4f0] text-[#e05638] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">⑰</span>
                    <span>
                      <strong className="text-[#10231b]">입국시 교통수단</strong>을 선택합니다. 항공편은{' '}
                      <code className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-[#f4f2ec] text-[#0f3d2e] font-bold text-[11.5px] font-mono">AIR</code>, 육로는{' '}
                      <code className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-[#f4f2ec] text-[#0f3d2e] font-bold text-[11.5px] font-mono">LAND</code>, 선박은{' '}
                      <code className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-[#f4f2ec] text-[#0f3d2e] font-bold text-[11.5px] font-mono">SEA</code>를 선택합니다.
                    </span>
                  </li>
                  <li className="px-4 sm:px-5 py-3 flex items-start gap-3 hover:bg-[#faf9f6]/60 transition-colors">
                    <span className="w-6 h-6 rounded-lg bg-[#fff4f0] text-[#e05638] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">⑱</span>
                    <span>
                      <strong className="text-[#10231b]">교통수단의 종류</strong>를 선택합니다. 일반적인 항공편은{' '}
                      <code className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#f4f2ec] text-[#0f3d2e] font-bold text-[11.5px] font-mono">
                        COMMERCIAL FLIGHT
                      </code>
                      를 선택하면 됩니다.
                    </span>
                  </li>
                  <li className="px-4 sm:px-5 py-3 flex items-start gap-3 hover:bg-[#faf9f6]/60 transition-colors">
                    <span className="w-6 h-6 rounded-lg bg-[#fff4f0] text-[#e05638] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">⑲</span>
                    <span><strong className="text-[#10231b]">항공기편명</strong>을 입력합니다. 중간에 갈아탔다면 태국에 도착한 편명을 입력합니다.</span>
                  </li>
                  <li className="px-4 sm:px-5 py-3 flex items-start gap-3 hover:bg-[#faf9f6]/60 transition-colors">
                    <span className="w-6 h-6 rounded-lg bg-[#fff4f0] text-[#e05638] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">⑳</span>
                    <span>
                      같은 방법으로 <strong className="text-[#10231b]">태국에서 출국하는 교통편 정보</strong>를 입력합니다. 출발날짜라고 해서 한국에서 출발하는 날짜가 아닙니다. 태국에서 한국(또는 다른 나라)으로 떠나는 날짜입니다.{' '}
                      <span className="text-stone-400">(다만 태국 출발 교통편은 필수 입력 사항이 아니며 입력하지 않아도 됩니다.)</span>
                    </span>
                  </li>
                  <li className="px-4 sm:px-5 py-3 flex items-start gap-3 hover:bg-[#faf9f6]/60 transition-colors">
                    <span className="w-6 h-6 rounded-lg bg-[#fff4f0] text-[#e05638] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">㉑</span>
                    <span>
                      <strong className="text-[#10231b]">숙박시설의 종류</strong>를 선택합니다. 여러 유형의 숙소에서 묵는다면 대표적인 것으로 선택하면 됩니다.{' '}
                      <code className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#f4f2ec] text-[#0f3d2e] font-bold text-[11.5px] font-mono">
                        HOTEL(호텔)
                      </code>{' '}
                      선택하시면 됩니다.
                    </span>
                  </li>
                  <li className="px-4 sm:px-5 py-3 flex items-start gap-3 hover:bg-[#faf9f6]/60 transition-colors">
                    <span className="w-6 h-6 rounded-lg bg-[#fff4f0] text-[#e05638] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">㉒</span>
                    <span><strong className="text-[#10231b]">숙소가 있는 지방</strong>을 선택합니다. 파타야(Chonburi), 후아힌(Prachuap Khiri Khan)과 같이 도시의 상위지방 이름이 도시이름과 다른 경우가 있으므로 구글지도 등을 이용하여 확인합니다. 구글지도에서 확인한 주소에서 우편번호 전 첫 번째입니다.</span>
                  </li>
                  <li className="px-4 sm:px-5 py-3 flex items-start gap-3 hover:bg-[#faf9f6]/60 transition-colors">
                    <span className="px-2 h-6 rounded-lg bg-[#fff4f0] text-[#e05638] font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">㉓㉔㉕</span>
                    <span>구글검색 또는 구글지도의 숙소 주소를 참고하여 기입합니다.</span>
                  </li>
                </ul>

                {/* 지역별 숙소 입력 예시: 파타야 & 방콕 */}
                <div className="space-y-3.5 pt-1">
                  <div className="p-4 sm:p-5 rounded-2xl bg-linear-to-br from-emerald-50/70 to-[#faf9f6] ring-1 ring-emerald-200/80 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-[#0f3d2e] text-[#f0d28d] flex items-center justify-center shrink-0">
                          <MapPin className="w-3.5 h-3.5" />
                        </span>
                        <p className="font-bold text-[#0f3d2e] text-xs sm:text-[13.5px]">
                          파타야로 여행하시는 고객님께서는 아래와 같이 입력하시면 됩니다
                        </p>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white text-[#007a55] ring-1 ring-emerald-200/80">
                        PATTAYA EXAMPLE
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setZoomImage({ src: '/assets/aistudio/4_5c424227.png', alt: '파타야 숙박 정보 입력 예시' })}
                      className="group relative w-full rounded-xl overflow-hidden ring-1 ring-emerald-200/70 bg-white cursor-zoom-in block shadow-xs"
                    >
                      <img
                        src="/assets/aistudio/4_5c424227.png"
                        alt="파타야 숙박 정보 입력 예시"
                        className="w-full h-auto object-contain"
                        loading="lazy"
                      />
                    </button>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-[#faf9f6] ring-1 ring-stone-200/80 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-stone-800 text-[#f0d28d] flex items-center justify-center shrink-0">
                          <MapPin className="w-3.5 h-3.5" />
                        </span>
                        <p className="font-bold text-[#10231b] text-xs sm:text-[13.5px]">
                          방콕으로 여행하시는 고객님께서는 아래와 같이 입력하시면 됩니다
                        </p>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white text-stone-600 ring-1 ring-stone-200">
                        BANGKOK EXAMPLE
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 bg-white p-3.5 rounded-xl ring-1 ring-stone-200/75">
                      <div className="px-2.5 py-1.5 rounded-lg bg-[#faf9f6]">
                        <span className="block text-[10.5px] font-semibold text-stone-400">숙박 유형</span>
                        <strong className="text-xs font-bold text-[#10231b] font-mono">HOTEL</strong>
                      </div>
                      <div className="px-2.5 py-1.5 rounded-lg bg-[#faf9f6]">
                        <span className="block text-[10.5px] font-semibold text-stone-400">도, 주</span>
                        <strong className="text-xs font-bold text-[#10231b] font-mono">BANGKOK</strong>
                      </div>
                      <div className="px-2.5 py-1.5 rounded-lg bg-[#faf9f6]">
                        <span className="block text-[10.5px] font-semibold text-stone-400">지구, 특별구</span>
                        <strong className="text-xs font-bold text-[#10231b] font-mono">PHRA NAKHON</strong>
                      </div>
                      <div className="px-2.5 py-1.5 rounded-lg bg-[#faf9f6]">
                        <span className="block text-[10.5px] font-semibold text-stone-400">세부 지역</span>
                        <strong className="text-xs font-bold text-[#10231b] font-mono">CHANA SONGKHRAM</strong>
                      </div>
                      <div className="px-2.5 py-1.5 rounded-lg bg-[#faf9f6]">
                        <span className="block text-[10.5px] font-semibold text-stone-400">우편번호</span>
                        <strong className="text-xs font-bold text-[#10231b] font-mono">10200</strong>
                      </div>
                      <div className="col-span-2 sm:col-span-3 px-3 py-2 rounded-lg bg-[#faf9f6] flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                        <span className="text-[10.5px] font-semibold text-stone-400">주소 예시</span>
                        <strong className="text-xs font-bold text-[#10231b] font-mono">NEW SIAM II, 50 PHRA ATHIT RD</strong>
                        <span className="text-[11px] text-stone-400">(실제 예약 호텔 주소 입력)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 4: ㉖ ~ ㉗ */}
          <div className="bg-white rounded-[24px] border border-stone-200/90 shadow-[0_6px_28px_rgba(15,61,46,0.04)]">
            <div className="bg-[#faf9f6] border-b border-stone-200/80 rounded-t-[24px] px-5 sm:px-8 py-4 sm:py-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#0f3d2e] text-[#f0d28d] flex items-center justify-center font-extrabold text-sm tracking-tight shadow-xs shrink-0">
                  04
                </div>
                <div>
                  <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#007a55]">
                    <HeartPulse className="w-3 h-3" />
                    STEP 04 · HEALTH & COMPANIONS
                  </span>
                  <h3 className="text-base sm:text-[17px] font-bold text-[#10231b] tracking-tight">
                    건강상태확인서 및 동반자 추가
                  </h3>
                </div>
              </div>
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-white ring-1 ring-stone-200/90 text-[11px] font-bold text-stone-600 tabular-nums">
                ㉖ ~ ㉗
              </span>
            </div>

            <div className="p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              <div className="lg:col-span-5 lg:sticky lg:top-24">
                <div className="bg-[#f4f2ec] p-3 sm:p-3.5 rounded-2xl ring-1 ring-stone-200/70">
                  <button
                    type="button"
                    onClick={() => setZoomImage({ src: '/assets/aistudio/5_15ecf04b.png', alt: 'TDAC 건강상태확인서 및 동반자 추가 화면' })}
                    className="group relative w-full rounded-xl overflow-hidden bg-white shadow-[0_4px_16px_rgba(16,35,27,0.08)] cursor-zoom-in block"
                  >
                    <img
                      src="/assets/aistudio/5_15ecf04b.png"
                      alt="TDAC 건강상태확인서 및 동반자 추가 화면"
                      className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.015]"
                      loading="lazy"
                    />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="rounded-2xl bg-white ring-1 ring-stone-200/80 divide-y divide-stone-100 overflow-hidden">
                  <div className="px-4 sm:px-5 py-4 flex items-start gap-3.5 hover:bg-[#faf9f6]/70 transition-colors">
                    <span className="w-7 h-7 rounded-lg bg-[#fff4f0] text-[#e05638] font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                      ㉖
                    </span>
                    <div className="text-xs sm:text-[13.5px] text-stone-600 leading-relaxed">
                      <strong className="text-[#10231b] font-bold block mb-1 text-[13.5px] sm:text-sm">
                        입국 전 2주 동안 체류했던 국가 선택
                      </strong>
                      <span>
                        대한민국은{' '}
                        <code className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#f4f2ec] text-[#0f3d2e] font-bold text-[11.5px] font-mono">
                          REPUBLIC OF KOREA
                        </code>
                        를 선택하며 중간 약간 아래쪽에 있습니다. 같은 방법으로 다른 나라를 선택하면 추가됩니다.
                      </span>
                    </div>
                  </div>

                  <div className="px-4 sm:px-5 py-4 flex items-start gap-3.5 hover:bg-[#faf9f6]/70 transition-colors">
                    <span className="w-7 h-7 rounded-lg bg-[#fff4f0] text-[#e05638] font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                      ㉗
                    </span>
                    <div className="text-xs sm:text-[13.5px] text-stone-600 leading-relaxed">
                      <strong className="text-[#10231b] font-bold block mb-1 text-[13.5px] sm:text-sm">
                        다른 여행자 추가 및 미리보기
                      </strong>
                      <span>
                        동반자가 있으면 <strong className="text-[#10231b]">다른여행자 추가하기</strong>를 선택하여 위의 과정을 반복하면 됩니다. 이때 추가 여행자의 두 번째 페이지에서{' '}
                        <strong className="text-[#10231b]">⑭-1 메뉴</strong>를 눌러 먼저 입력한 여행자의 입국정보를 불러올 수 있습니다. 물론 동반자이더라도 개별적으로 따로 신청해도 됩니다. 여기까지 마쳤으면{' '}
                        <strong className="text-[#10231b]">미리보기</strong>를 눌러 지금까지 입력했던 사항을 확인할 수 있습니다.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 5: ㉘ ~ ㉚ */}
          <div className="bg-white rounded-[24px] border border-stone-200/90 shadow-[0_6px_28px_rgba(15,61,46,0.04)]">
            <div className="bg-[#faf9f6] border-b border-stone-200/80 rounded-t-[24px] px-5 sm:px-8 py-4 sm:py-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#0f3d2e] text-[#f0d28d] flex items-center justify-center font-extrabold text-sm tracking-tight shadow-xs shrink-0">
                  05
                </div>
                <div>
                  <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#007a55]">
                    <CheckCircle2 className="w-3 h-3" />
                    STEP 05 · VERIFY & SUBMIT
                  </span>
                  <h3 className="text-base sm:text-[17px] font-bold text-[#10231b] tracking-tight">
                    최종 확인 · 이메일 입력 · 제출 완료
                  </h3>
                </div>
              </div>
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-white ring-1 ring-stone-200/90 text-[11px] font-bold text-stone-600 tabular-nums">
                ㉘ ~ ㉚
              </span>
            </div>

            <div className="p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              <div className="lg:col-span-5 lg:sticky lg:top-24">
                <div className="bg-[#f4f2ec] p-3 sm:p-3.5 rounded-2xl ring-1 ring-stone-200/70">
                  <button
                    type="button"
                    onClick={() => setZoomImage({ src: '/assets/aistudio/6_022a7568.png', alt: 'TDAC 최종 확인 및 제출 화면' })}
                    className="group relative w-full rounded-xl overflow-hidden bg-white shadow-[0_4px_16px_rgba(16,35,27,0.08)] cursor-zoom-in block"
                  >
                    <img
                      src="/assets/aistudio/6_022a7568.png"
                      alt="TDAC 최종 확인 및 제출 화면"
                      className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.015]"
                      loading="lazy"
                    />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div className="rounded-2xl bg-white ring-1 ring-stone-200/80 divide-y divide-stone-100 overflow-hidden">
                  <div className="px-4 sm:px-5 py-4 flex items-start gap-3.5 hover:bg-[#faf9f6]/70 transition-colors">
                    <span className="w-7 h-7 rounded-lg bg-[#fff4f0] text-[#e05638] font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                      ㉘
                    </span>
                    <div className="text-xs sm:text-[13.5px] text-stone-600 leading-relaxed">
                      <strong className="text-[#10231b] font-bold block mb-1 text-[13.5px] sm:text-sm">
                        오류 항목 수정
                      </strong>
                      <span>
                        잘못된 부분이 있다면 <strong className="text-[#10231b]">수정</strong>을 눌러 단계별로 수정하면 됩니다. 처음부터 다시 작성하지 않으며 잘못된 부분만 수정하면 됩니다.
                      </span>
                    </div>
                  </div>

                  <div className="px-4 sm:px-5 py-4 flex items-start gap-3.5 hover:bg-[#faf9f6]/70 transition-colors">
                    <span className="w-7 h-7 rounded-lg bg-[#fff4f0] text-[#e05638] font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                      ㉙
                    </span>
                    <div className="text-xs sm:text-[13.5px] text-stone-600 leading-relaxed">
                      <strong className="text-[#10231b] font-bold block mb-1 text-[13.5px] sm:text-sm">
                        이메일 주소 입력
                      </strong>
                      <span>모든 사항을 다 확인하고 틀림이 없으면 입국카드를 받을 이메일 주소를 입력합니다.</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-linear-to-br from-[#0f3d2e] to-[#164f3c] text-white shadow-sm flex items-start gap-3.5">
                  <div className="flex flex-col items-center gap-1.5 shrink-0">
                    <span className="w-7 h-7 rounded-lg bg-[#f0d28d] text-[#0f3d2e] font-black text-sm flex items-center justify-center">
                      ㉚
                    </span>
                    <QrCode className="w-4 h-4 text-[#f0d28d]/80" />
                  </div>
                  <div className="text-xs sm:text-[13.5px] text-emerald-50/90 leading-relaxed">
                    <strong className="text-white font-bold block mb-1 text-[13.5px] sm:text-sm">
                      동의 체크 · 제출 및 QR코드 저장
                    </strong>
                    <span>
                      동의 부분에 체크를 하고 <strong className="text-[#f0d28d]">제출</strong>을 누르면 신청이 마무리됩니다. 완료 후 즉시{' '}
                      <strong className="text-[#f0d28d]">QR코드</strong>를 다운로드 받을 수 있으며 메일로도 옵니다. 입국수속 할 경우 여권만 제시하면 되지만 간혹 전자입국카드(QR코드)를 확인하는 경우가 있으므로{' '}
                      <strong className="text-white underline decoration-[#f0d28d]/70 underline-offset-4">
                        스마트폰에 저장 또는 프린트
                      </strong>
                      해 두는 것이 좋습니다.
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11.5px] text-stone-500 px-1">
                  <Info className="w-3.5 h-3.5 text-[#007a55] shrink-0" />
                  <span>좌측 이미지를 클릭하면 입력 화면을 크게 확대하여 확인하실 수 있습니다.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Zoom Lightbox Modal */}
      {zoomImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setZoomImage(null)}
        >
          <div
            className="relative max-w-3xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-stone-200 bg-stone-50">
              <span className="text-xs sm:text-sm font-bold text-stone-800 truncate">{zoomImage.alt}</span>
              <button
                type="button"
                onClick={() => setZoomImage(null)}
                className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-200/70 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-auto p-3 sm:p-4 bg-stone-100 flex items-center justify-center">
              <img
                src={zoomImage.src}
                alt={zoomImage.alt}
                className="max-w-full max-h-[78vh] w-auto h-auto object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
