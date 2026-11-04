import React, { useState, useEffect } from 'react';
import { GOLF_PACKAGES, COMPANY_INFO } from '../data/golfData';
import { InquiryFormData } from '../types/golf';
import {
  X,
  Calendar,
  Users,
  CheckCircle2,
  Copy,
  MessageCircle,
  Phone,
  Mail,
  Car,
  BedDouble,
  FileCheck,
} from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackageId?: string;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  selectedPackageId,
}) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    customerName: '',
    phone: '',
    email: '',
    kakaoId: '',
    packageId: selectedPackageId || 'pattaya-val-1',
    travelDateStart: '',
    travelDateEnd: '',
    numberOfGolfer: 4,
    numberOfRooms: 2,
    preferredRegion: 'pattaya',
    needsGuideEscort: false,
    notes: '',
  });

  const [submittedInquiryId, setSubmittedInquiryId] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    if (selectedPackageId) {
      setFormData((prev) => ({
        ...prev,
        packageId: selectedPackageId,
      }));
    }
  }, [selectedPackageId]);

  if (!isOpen) return null;

  const currentPackage = GOLF_PACKAGES.find((p) => p.id === formData.packageId);

  // Live estimated calculation
  const basePricePerPerson = currentPackage ? currentPackage.price : 520000;
  const totalEstimatedPrice = basePricePerPerson * formData.numberOfGolfer;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const timestamp = Date.now().toString().slice(-4);
    const newId = `BGIT-THAI-${timestamp}`;

    const inquiryRecord = {
      id: newId,
      date: new Date().toISOString(),
      ...formData,
      packageName: currentPackage?.title || '맞춤 골프 투어',
      totalEstimatedPrice,
    };

    // Save to localStorage for demo persistence
    try {
      const existing = JSON.parse(localStorage.getItem('bgit_golf_inquiries') || '[]');
      localStorage.setItem('bgit_golf_inquiries', JSON.stringify([inquiryRecord, ...existing]));
    } catch {
      // ignore
    }

    setSubmittedInquiryId(newId);
  };

  const getQuotationSummaryText = () => {
    return `[BGIT Thai 골프 견적 접수서]
- 접수번호: ${submittedInquiryId}
- 고객명: ${formData.customerName}
- 연락처: ${formData.phone}
- 카카오톡 ID: ${formData.kakaoId || '미입력'}
- 신청상품: ${currentPackage?.title || '맞춤 견적'}
- 일정: ${formData.travelDateStart || '미정'} ~ ${formData.travelDateEnd || '미정'}
- 인원: ${formData.numberOfGolfer}인 (객실 ${formData.numberOfRooms}실)
- 가이드 동행 요청: ${formData.needsGuideEscort ? '예' : '아니오 (단독차량+매니저 케어)'}
- 예상 기준 견적: 약 ${totalEstimatedPrice.toLocaleString()}원
- 요청사항: ${formData.notes || '없음'}
- 현지 직통: ${COMPANY_INFO.telDisplay} / 카카오톡: ${COMPANY_INFO.kakao}`;
  };

  const handleCopyQuote = () => {
    navigator.clipboard.writeText(getQuotationSummaryText());
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  const resetFormAndClose = () => {
    setSubmittedInquiryId(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden relative flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-stone-900 text-white flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-bold text-sm">
              B
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight">
                {submittedInquiryId ? '견적 예약 접수 완료' : '태국 골프 투어 실시간 예약 & 견적 신청'}
              </h2>
              <p className="text-xs text-stone-400">
                {submittedInquiryId ? '현지 매니저가 신속히 연락드립니다' : '태국 현지 직영 최저가 보장 · 4인 단독 전용 차량'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={resetFormAndClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto">
          {submittedInquiryId ? (
            /* SUBMISSION CONFIRMATION VIEW */
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  접수 번호 : {submittedInquiryId}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 mt-3">
                  예약 및 견적 문의가 성공적으로 접수되었습니다
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-md mx-auto leading-relaxed">
                  남겨주신 연락처 및 카카오톡으로 BGIT 태국 현지 골프 전문 매니저가 상세 일정표와 최종 확정 견적을 신속히 안내해 드립니다.
                </p>
              </div>

              {/* Quotation Summary Card */}
              <div className="bg-stone-50 p-5 rounded-xl border border-stone-200 text-left text-xs space-y-2">
                <div className="flex justify-between py-1 border-b border-stone-200/60 font-semibold text-stone-900">
                  <span>선택 상품</span>
                  <span className="text-emerald-900 text-right">{currentPackage?.title}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-200/60 text-stone-600">
                  <span>고객명 / 연락처</span>
                  <span>{formData.customerName} ({formData.phone})</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-200/60 text-stone-600">
                  <span>라운드 인원 / 객실</span>
                  <span>{formData.numberOfGolfer}명 / {formData.numberOfRooms}실</span>
                </div>
                <div className="flex justify-between py-1 text-stone-900 font-bold pt-1">
                  <span>예상 기준 견적 합계</span>
                  <span className="text-base text-emerald-800 tabular-nums">
                    약 {totalEstimatedPrice.toLocaleString()}원
                  </span>
                </div>
              </div>

              {/* Direct Kakao & Line Buttons */}
              <div className="space-y-2 pt-2">
                <p className="text-xs text-stone-500 font-medium">
                  더 빠른 실시간 상담을 원하시면 아래 메신저로 바로 연결하세요:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={`https://line.me/ti/p/~${COMPANY_INFO.line}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-[#06C755] hover:bg-[#05b34c] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>라인 1:1 상담 (ID: {COMPANY_INFO.line})</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyQuote}
                    className="p-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
                  >
                    <Copy className="w-4 h-4" />
                    <span>{copySuccess ? '견적서 복사 완료!' : '견적 요약서 복사하기'}</span>
                  </button>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center justify-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-amber-700" />
                  <span>카카오톡 ID : <strong>{COMPANY_INFO.kakao}</strong> (친구 추가 후 견적서 전송 가능)</span>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={resetFormAndClose}
                  className="px-6 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-semibold transition-colors"
                >
                  확인 및 닫기
                </button>
              </div>
            </div>
          ) : (
            /* SUBMISSION FORM */
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Product Selection */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  희망 상품 선택
                </label>
                <select
                  value={formData.packageId}
                  onChange={(e) => setFormData({ ...formData, packageId: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                >
                  {GOLF_PACKAGES.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      [{pkg.categoryLabel.split(' ')[0]}] {pkg.title} ({pkg.priceFormatted})
                    </option>
                  ))}
                </select>
              </div>

              {/* Travel Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    희망 출발일 (현지 도착)
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.travelDateStart}
                    onChange={(e) => setFormData({ ...formData, travelDateStart: e.target.value })}
                    className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    희망 귀국일 (출국)
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.travelDateEnd}
                    onChange={(e) => setFormData({ ...formData, travelDateEnd: e.target.value })}
                    className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                  />
                </div>
              </div>

              {/* Golfer Count & Rooms */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    골퍼 인원수
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min={1}
                      max={40}
                      value={formData.numberOfGolfer}
                      onChange={(e) => setFormData({ ...formData, numberOfGolfer: Math.max(1, parseInt(e.target.value) || 1) })}
                      className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 tabular-nums"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400">명</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    호텔 객실 수 (2인 1실)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={formData.numberOfRooms}
                      onChange={(e) => setFormData({ ...formData, numberOfRooms: Math.max(1, parseInt(e.target.value) || 1) })}
                      className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 tabular-nums"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400">실</span>
                  </div>
                </div>
              </div>

              {/* 4인 미만 안내 */}
              {formData.numberOfGolfer < 4 && (
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900">
                  * 본 상품은 4인 기준 골프 상품입니다. 4인 미만 시에는 차량 및 조인 여부에 따라 추가 요금이 발생할 수 있으며 현지 매니저가 맞춤 조율해 드립니다.
                </div>
              )}

              {/* Customer Contact Details */}
              <div className="border-t border-stone-200 pt-4 space-y-3">
                <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  예약자 연락처 정보
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-stone-600 mb-1">
                      대표 예약자 성함 <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="홍길동"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-stone-600 mb-1">
                      휴대폰 번호 <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="010-1234-5678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-stone-600 mb-1">
                      카카오톡 ID (현지 실시간 상담)
                    </label>
                    <input
                      type="text"
                      placeholder="카카오톡 아이디"
                      value={formData.kakaoId}
                      onChange={(e) => setFormData({ ...formData, kakaoId: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-stone-600 mb-1">
                      이메일 주소
                    </label>
                    <input
                      type="email"
                      placeholder="example@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                    />
                  </div>
                </div>

                {/* Additional Option Checkbox */}
                <div className="pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-700">
                    <input
                      type="checkbox"
                      checked={formData.needsGuideEscort}
                      onChange={(e) => setFormData({ ...formData, needsGuideEscort: e.target.checked })}
                      className="w-4 h-4 text-emerald-700 rounded border-stone-300 focus:ring-emerald-600"
                    />
                    <span>매니저님(가이드) 동행 요청 (기본은 단독차량 기사 및 실시간 카톡 지원)</span>
                  </label>
                </div>

                <div>
                  <label className="block text-xs text-stone-600 mb-1">
                    기타 문의 및 요청사항
                  </label>
                  <textarea
                    rows={2}
                    placeholder="싱글룸 변경, 특정 골프장 지정, 항공권 예약 지원, 식당 추천 등"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                  />
                </div>
              </div>

              {/* Quotation Summary Strip */}
              <div className="p-4 bg-stone-100 rounded-xl border border-stone-200 flex items-center justify-between text-xs sm:text-sm">
                <div>
                  <span className="text-stone-500 block text-xs">예상 견적 합계 ({formData.numberOfGolfer}인 기준)</span>
                  <span className="text-lg sm:text-xl font-bold text-stone-900 tabular-nums">
                    약 {totalEstimatedPrice.toLocaleString()}원
                  </span>
                </div>
                <div className="text-right text-[11px] text-stone-500">
                  <span className="block">* 1인 1캐디피/카트피/단독차량 포함</span>
                  <span className="text-emerald-800 font-medium">최저가 직영 견적</span>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={resetFormAndClose}
                  className="px-4 py-2.5 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs sm:text-sm font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>실시간 견적 및 예약 접수</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
