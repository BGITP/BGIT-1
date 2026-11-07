import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/golfData';
import { X, Copy, Check, ExternalLink, Share2, MessageCircle } from 'lucide-react';

interface KakaoShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KakaoShareModal: React.FC<KakaoShareModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://bgitthai.golf';

  const shareText = `[BGIT Thai - 태국 현지 골프 전문회사]
${COMPANY_INFO.announcement}

▶ 골프 패키지 & 지역별 스코어카드 확인:
${currentUrl}

- 태국 현지 직영 골프 투어 (방콕/파타야 3색 골프)
- 4인 단독 전용 차량 및 실시간 현지 매니저 케어
- 직통 문의: ${COMPANY_INFO.telDisplay} (카카오톡: ${COMPANY_INFO.kakao})`;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(shareText);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-stone-200 overflow-hidden relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-[#FEE500] text-[#191919] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#191919] text-[#FEE500] flex items-center justify-center font-black text-xs">
              TALK
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base leading-tight">
                카카오톡 링크 공유 미리보기
              </h3>
              <p className="text-[11px] text-[#333333]">
                카카오톡에 링크를 전송했을 때 노출되는 카드 형태
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-700 hover:text-black hover:bg-black/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Realistic KakaoTalk Chat Room Simulator */}
        <div className="p-5 sm:p-6 space-y-5 bg-stone-50">
          {/* Simulated Kakao Chat Bubble Container */}
          <div className="bg-[#BACEE0] p-4 sm:p-5 rounded-xl border border-stone-300/80 shadow-inner">
            <div className="text-[10px] text-stone-500 text-center mb-3">
              오늘 오후 2:30
            </div>

            {/* Kakao Shared URL Card */}
            <div className="max-w-xs sm:max-w-sm ml-auto bg-white rounded-2xl overflow-hidden shadow-md border border-stone-200">
              {/* OG Image: BGIT Thai Official Logo */}
              <div className="relative aspect-[1.91/1] bg-white border-b border-stone-100 flex items-center justify-center p-3 overflow-hidden">
                <img
                  src={COMPANY_INFO.logoShield}
                  alt="BGIT Thai 로고"
                  className="w-full h-full object-contain object-center"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* OG Card Content */}
              <div className="p-3.5 space-y-1.5">
                <p className="text-[11px] text-stone-400 font-mono truncate">
                  bgitthai.golf
                </p>
                <h4 className="font-bold text-stone-900 text-sm leading-snug">
                  BGIT Thai - 태국 현지 골프 전문회사
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed font-normal">
                  {COMPANY_INFO.announcement}
                </p>
              </div>

              {/* Kakao Bubble Footer */}
              <div className="px-3.5 py-2 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                <span className="font-medium">웹사이트 바로가기</span>
                <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
              </div>
            </div>

            <div className="text-[9px] text-stone-500 text-right mt-1.5 mr-1 font-mono">
              읽음 1 · 오후 2:30
            </div>
          </div>

          {/* Meta Tag Verification Info */}
          <div className="p-3 bg-white rounded-xl border border-stone-200 text-xs text-stone-600 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-emerald-800 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              <span>카카오톡 및 소셜 OpenGraph 태그 설정 완료</span>
            </div>
            <p className="text-[11px] text-stone-500 leading-relaxed">
              • <strong>안내문(설명):</strong> {COMPANY_INFO.announcement}
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={handleCopyMessage}
              className="w-full py-2.5 px-4 bg-[#FEE500] hover:bg-[#FDD800] text-[#191919] rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer"
            >
              {copiedMessage ? (
                <>
                  <Check className="w-4 h-4 text-emerald-700" />
                  <span>카카오톡 전송 문구가 복사되었습니다!</span>
                </>
              ) : (
                <>
                  <MessageCircle className="w-4 h-4" />
                  <span>카카오톡 공유용 문구 & 링크 전체 복사</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleCopyUrl}
              className="w-full py-2.5 px-4 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-700" />
                  <span>웹사이트 링크가 복사되었습니다!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-stone-500" />
                  <span>웹사이트 링크(URL)만 복사하기</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
