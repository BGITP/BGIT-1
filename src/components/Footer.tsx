import React from 'react';
import { COMPANY_INFO } from '../data/golfData';
import { MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const handleCopyKakao = () => {
    navigator.clipboard.writeText(COMPANY_INFO.kakao);
    alert(`카카오톡 아이디 [${COMPANY_INFO.kakao}] 가 복사되었습니다. 카카오톡 친구 찾기에서 검색해 주세요.`);
  };

  return (
    <footer id="contact" className="bg-stone-100 border-t border-stone-200 text-stone-700 py-10 md:py-12">
      <div className="max-w-[1156px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-8 pb-7 md:pb-8 border-b border-stone-200">
          {/* Company Brand & Address */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 sm:gap-6">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2.5 group focus:outline-none shrink-0 no-underline"
                title="BGIT Thai - 태국 골프 전문"
              >
                <img
                  src="/assets/aistudio/99999_8464e2e9.png"
                  alt="BGIT THAI Official Logo"
                  className="h-9 sm:h-12 md:h-[52px] w-auto object-contain mix-blend-multiply group-hover:scale-105 transition-transform select-none"
                  referrerPolicy="no-referrer"
                />
              </a>

              <div className="flex flex-col justify-center border-l-2 sm:border-l-[3px] border-stone-300 pl-3 sm:pl-5 py-0.5 min-w-0 translate-y-[5px] sm:translate-y-[7px]">
                <p className="text-[13px] sm:text-[15px] md:text-base font-semibold text-stone-800 leading-snug">
                  태국현지 골프여행 랜드사
                </p>
              </div>
            </div>

            {/* Address */}
            <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed flex items-start gap-1.5">
              <MapPin className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
              <span>{COMPANY_INFO.address}</span>
            </p>

            {/* Contact details (4 lines, no underlines) */}
            <p className="text-xs sm:text-sm text-stone-700 font-medium leading-relaxed space-y-1">
              <span className="block">
                Tel : <a href={`tel:${COMPANY_INFO.tel}`} className="hover:text-emerald-800 transition-colors no-underline">{COMPANY_INFO.tel}</a>
              </span>
              <span className="block">
                E-mail : <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-emerald-800 transition-colors no-underline">{COMPANY_INFO.email}</a>
              </span>
              <span className="block">
                kakao : <button type="button" onClick={handleCopyKakao} className="text-stone-900 hover:text-emerald-800 font-semibold cursor-pointer transition-colors no-underline">{COMPANY_INFO.kakao}</button>
              </span>
              <span className="block">
                Line : <a href={`https://line.me/ti/p/~${COMPANY_INFO.line}`} target="_blank" rel="noreferrer" className="text-stone-900 hover:text-emerald-800 font-semibold cursor-pointer transition-colors no-underline">{COMPANY_INFO.line}</a>
              </span>
            </p>
          </div>

          <div className="flex flex-row items-end gap-4 sm:gap-6 lg:contents">
            {/* Center: KakaoTalk 1:1 QR Code */}
            <div className="flex justify-start lg:justify-center lg:self-end shrink-0">
              <div className="bg-white px-2.5 py-2 rounded-2xl border border-stone-200/90 shadow-[0_2px_10px_rgba(0,0,0,0.04)] flex flex-col items-center gap-1">
                <img
                  src="/assets/aistudio/image_07eb289b.png"
                  alt="카카오톡 QR 1:1 상담"
                  className="w-24 h-24 sm:w-[108px] sm:h-[108px] object-contain rounded-lg select-none"
                  referrerPolicy="no-referrer"
                />
                <span className="text-[11px] font-semibold text-stone-700 tracking-tight whitespace-nowrap">
                  카카오톡 QR 1:1 상담
                </span>
              </div>
            </div>

            {/* Right: Social Icons matching KakaoTalk, LINE, Email */}
            <div className="flex items-center gap-3 sm:gap-3.5 lg:self-end shrink-0">
              <a
                href="https://open.kakao.com/o/spLUsnde"
                target="_blank"
                rel="noreferrer"
                title="카카오톡 1:1 오픈채팅 상담"
                className="w-11 h-11 rounded-xl overflow-hidden hover:scale-105 transition-transform shadow-xs cursor-pointer block no-underline"
              >
                <img
                  src="/assets/icons/kakao.jpg"
                  alt="카카오톡 상담"
                  className="w-full h-full object-cover"
                />
              </a>

              <a
                href="https://line.me/ti/p/2PL9TG8Zgs"
                target="_blank"
                rel="noreferrer"
                title="라인 1:1 상담"
                className="w-11 h-11 rounded-xl overflow-hidden hover:scale-105 transition-transform shadow-xs cursor-pointer block no-underline"
              >
                <img
                  src="/assets/aistudio/20161027141628_a51b5fe1.jpg"
                  alt="라인 상담"
                  className="w-full h-full object-cover"
                />
              </a>

              <a
                href="mailto:smw30103159@gmail.com"
                title="이메일 문의 (smw30103159@gmail.com)"
                className="w-11 h-11 flex items-center justify-center hover:scale-105 transition-transform cursor-pointer drop-shadow-xs no-underline"
              >
                <img
                  src="/assets/icons/email.svg"
                  alt="이메일 문의"
                  className="w-full h-full object-contain"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright notice */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-3 text-xs sm:text-[13px] text-stone-600">
          <p>© 2019 BGIT Thai. All Rights Reserved. Join With Thai Golfer / All Golf Service</p>
          <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-[13px] flex-wrap">
            <span>태국 현지 라이센스 직영 여행사</span>
            <span>·</span>
            <span>실시간 고객센터 +66 96 514 5747</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
