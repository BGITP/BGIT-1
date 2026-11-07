import React from 'react';
import { COMPANY_INFO } from '../data/golfData';
import { Phone, Mail, MessageCircle, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const handleCopyKakao = () => {
    navigator.clipboard.writeText(COMPANY_INFO.kakao);
    alert(`카카오톡 아이디 [${COMPANY_INFO.kakao}] 가 복사되었습니다. 카카오톡 친구 찾기에서 검색해 주세요.`);
  };

  const handleCopyLine = () => {
    navigator.clipboard.writeText(COMPANY_INFO.line);
    alert(`라인 아이디 [${COMPANY_INFO.line}] 가 복사되었습니다.`);
  };

  return (
    <footer className="bg-stone-100 border-t border-stone-200 text-stone-700 py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-8 border-b border-stone-200">
          {/* Company Brand & Address strictly matching screenshot 3 */}
          <div className="space-y-3">
            {/* Logo image and brand text */}
            <div className="flex items-center gap-3">
              <img
                src={COMPANY_INFO.badgeLogo}
                alt="BGIT Thai Logo"
                className="h-11 sm:h-12 w-auto object-contain drop-shadow-xs"
                referrerPolicy="no-referrer"
              />
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight font-serif text-stone-900">
                  B G <span className="text-blue-600">i</span> T
                </span>
                <span className="text-sm sm:text-base font-semibold text-blue-600">
                  Thai
                </span>
              </div>
            </div>

            {/* Address */}
            <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed flex items-start gap-1.5">
              <MapPin className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
              <span>{COMPANY_INFO.address}</span>
            </p>

            {/* Contact details */}
            <p className="text-xs sm:text-sm text-stone-700 font-medium">
              Tel : <a href={`tel:${COMPANY_INFO.tel}`} className="hover:text-emerald-800 underline underline-offset-2">{COMPANY_INFO.tel}</a>
              <span className="text-stone-300 mx-2">/</span>
              E-mail : <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-emerald-800 underline underline-offset-2">{COMPANY_INFO.email}</a>
              <span className="text-stone-300 mx-2">/</span>
              kakao : <button onClick={handleCopyKakao} className="text-stone-900 hover:text-emerald-800 font-semibold underline underline-offset-2 cursor-pointer">{COMPANY_INFO.kakao}</button>
              <span className="text-stone-300 mx-2">/</span>
              Line : <a href={`https://line.me/ti/p/~${COMPANY_INFO.line}`} target="_blank" rel="noreferrer" className="text-stone-900 hover:text-emerald-800 font-semibold underline underline-offset-2">{COMPANY_INFO.line}</a>
            </p>
          </div>

          {/* Social Icons matching the 3 icons from screenshot 3 */}
          <div className="flex items-center gap-3 shrink-0">
            {/* KakaoTalk Icon */}
            <button
              type="button"
              onClick={handleCopyKakao}
              title={`카카오톡 상담 (ID: ${COMPANY_INFO.kakao})`}
              className="w-11 h-11 rounded-full bg-[#FEE500] hover:scale-105 transition-transform flex items-center justify-center shadow-xs cursor-pointer"
            >
              <span className="font-bold text-[#191919] text-[11px] leading-tight">
                TALK
              </span>
            </button>

            {/* LINE Icon */}
            <a
              href={`https://line.me/ti/p/~${COMPANY_INFO.line}`}
              target="_blank"
              rel="noreferrer"
              title={`라인 상담 (ID: ${COMPANY_INFO.line})`}
              className="w-11 h-11 rounded-full bg-[#06C755] hover:scale-105 transition-transform flex items-center justify-center shadow-xs text-white"
            >
              <span className="font-bold text-white text-[11px] leading-tight">
                LINE
              </span>
            </a>

            {/* Email Icon */}
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              title={`이메일 문의 (${COMPANY_INFO.email})`}
              className="w-11 h-11 rounded-full bg-white hover:scale-105 transition-transform border border-stone-300 flex items-center justify-center shadow-xs text-blue-600"
            >
              <Mail className="w-5 h-5 text-blue-600" />
            </a>
          </div>
        </div>

        {/* Copyright notice */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <p>© 2026 BGIT Thai. All Rights Reserved. Join With Thai Golfer / All Golf Service.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>태국 현지 라이센스 직영 여행사</span>
            <span>·</span>
            <span>실시간 고객센터 +66 96 514 5747</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
