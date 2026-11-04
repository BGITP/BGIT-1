import React from 'react';
import { GOLF_REGIONS, GOLF_PACKAGES, COMPANY_INFO } from '../data/golfData';
import { GolfPackage } from '../types/golf';
import { Printer, Download, ArrowLeft, ExternalLink } from 'lucide-react';

interface PdfExactViewProps {
  onSelectPackage: (pkg: GolfPackage) => void;
  onOpenReservation: (packageId?: string) => void;
  onBackToInteractive: () => void;
}

export const PdfExactView: React.FC<PdfExactViewProps> = ({
  onSelectPackage,
  onOpenReservation,
  onBackToInteractive,
}) => {
  const handleDownloadOriginalPdf = () => {
    const link = document.createElement('a');
    link.href = COMPANY_INFO.pdfPath;
    link.download = 'BGIT_태국골프노트_가이드북.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  // Group packages by the 6 exact sections from the PDF
  const pattayaValuePkgs = GOLF_PACKAGES.filter((p) => p.category === 'pattaya-value');
  const pattayaLuxuryPkgs = GOLF_PACKAGES.filter((p) => p.category === 'pattaya-luxury');
  const pattayaPoolPkgs = GOLF_PACKAGES.filter((p) => p.category === 'pattaya-poolvilla');
  const bkkValuePkgs = GOLF_PACKAGES.filter((p) => p.category === 'bangkok-value');
  const bkkLuxuryPkgs = GOLF_PACKAGES.filter((p) => p.category === 'bangkok-luxury');
  const guidePkgs = GOLF_PACKAGES.filter((p) => p.category === 'guide');

  return (
    <div className="bg-stone-100 min-h-screen py-6 sm:py-10 px-2 sm:px-4">
      {/* Top Controller Bar */}
      <div className="max-w-4xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-stone-200 shadow-xs print:hidden">
        <button
          type="button"
          onClick={onBackToInteractive}
          className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>반응형 웹 뷰로 돌아가기</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-4 h-4 text-stone-500" />
            <span>양식 인쇄 (Print)</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadOriginalPdf}
            className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>첨부된 원본 PDF 파일 다운로드</span>
          </button>
        </div>
      </div>

      {/* PDF DOCUMENT CONTAINER: 4 Pages Style */}
      <div className="max-w-4xl mx-auto space-y-12">
        {/* ================= PAGE 1 ================= */}
        <div className="bg-white p-8 sm:p-14 shadow-md rounded-sm border border-stone-200 relative min-h-[960px] flex flex-col justify-between print:shadow-none print:border-none print:m-0 print:p-8">
          <div>
            {/* Top Header of PDF */}
            <div className="flex items-center justify-between text-xs text-stone-500 pb-4 border-b border-stone-200 mb-14 font-mono">
              <span>BGIT Thai · 태국 현지 골프 전문회사</span>
              <span className="font-sans font-medium text-stone-700">
                타이골프노트 | 태국 현지 골프 가이드
              </span>
            </div>

            {/* Exact Minimalist Putting Green Graphic from Page 1 */}
            <div className="flex justify-center my-12">
              <div className="relative w-72 h-44 flex items-center justify-center">
                {/* Putting green turf ellipse */}
                <div className="w-64 h-24 bg-[#235843] rounded-[100%] relative flex items-center justify-center shadow-inner overflow-hidden">
                  {/* Sand bunker patch */}
                  <div className="absolute right-12 bottom-2 w-16 h-8 bg-[#E6D4AA] rounded-[50%] rotate-6" />
                  {/* Subtle golf hole cup */}
                  <div className="w-4 h-4 rounded-full bg-[#16382a] border border-[#0d221a] relative z-10" />
                </div>
                {/* Pin Flagstick */}
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
                  <div className="w-0.5 h-20 bg-stone-800" />
                  <div className="absolute top-1 left-0.5 w-6 h-4 bg-red-600 rounded-xs" />
                </div>
              </div>
            </div>

            {/* Section: 지역별 스코어카드 */}
            <div className="mt-14 pt-8 border-t border-stone-200">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mb-2">
                지역별 스코어카드
              </h2>
              <p className="text-stone-500 text-sm mb-6">
                한 장으로 비교하는 태국 5대 골프 지역
              </p>

              {/* Table part 1 (Bangkok) */}
              <div className="border-t border-b border-stone-200">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-stone-200 text-stone-400 font-normal">
                      <th className="py-3 px-3 w-28">지역</th>
                      <th className="py-3 px-3 w-56">대표 코스</th>
                      <th className="py-3 px-3">특징</th>
                      <th className="py-3 px-3 w-20 text-center">추천 시즌</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-stone-100">
                      <td className="py-4 px-3 align-top font-bold text-stone-900">
                        {GOLF_REGIONS[0].nameKr}
                        <div className="text-[11px] text-stone-400 font-normal">
                          {GOLF_REGIONS[0].nameEn}
                        </div>
                      </td>
                      <td className="py-4 px-3 align-top text-stone-800">
                        <div>{GOLF_REGIONS[0].courses[0]}</div>
                        <div>{GOLF_REGIONS[0].courses[1]}</div>
                      </td>
                      <td className="py-4 px-3 align-top text-stone-700">
                        {GOLF_REGIONS[0].features}
                      </td>
                      <td className="py-4 px-3 align-top text-center text-stone-500 font-medium">
                        {GOLF_REGIONS[0].recommendedSeason}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Footer of Page 1 */}
          <div className="flex items-center justify-between text-[11px] text-stone-400 pt-6 border-t border-stone-100 mt-12 font-mono">
            <span>https://bgitthai.golf · smw30103159@gmail.com</span>
            <span>1 / 4</span>
          </div>
        </div>

        {/* ================= PAGE 2 ================= */}
        <div className="bg-white p-8 sm:p-14 shadow-md rounded-sm border border-stone-200 relative min-h-[960px] flex flex-col justify-between print:shadow-none print:border-none print:m-0 print:p-8">
          <div>
            {/* Top Header of PDF */}
            <div className="flex items-center justify-between text-xs text-stone-500 pb-4 border-b border-stone-200 mb-6 font-mono">
              <span>BGIT Thai · 태국 현지 골프 전문회사</span>
              <span className="font-sans font-medium text-stone-700">
                타이골프노트 | 태국 현지 골프 가이드
              </span>
            </div>

            {/* Remaining Regions Table */}
            <div className="border-b border-stone-200 mb-4">
              <table className="w-full text-left text-xs sm:text-sm">
                <tbody>
                  {GOLF_REGIONS.slice(1).map((region) => (
                    <tr key={region.id} className="border-b border-stone-100">
                      <td className="py-4 px-3 align-top font-bold text-stone-900 w-28">
                        {region.nameKr}
                        <div className="text-[11px] text-stone-400 font-normal">
                          {region.nameEn}
                        </div>
                      </td>
                      <td className="py-4 px-3 align-top text-stone-800 w-56">
                        {region.courses.map((c, i) => (
                          <div key={i}>{c}</div>
                        ))}
                      </td>
                      <td className="py-4 px-3 align-top text-stone-700">
                        {region.features}
                      </td>
                      <td className="py-4 px-3 align-top text-center text-stone-500 font-medium w-20">
                        {region.recommendedSeason}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-xs text-stone-500 mb-14">
              코스 상황과 운영 정보는 바뀔 수 있으니 예약 전에 각 골프장에 직접 확인하세요.
            </p>

            {/* Section: 시즌과 비용, 이것만 알면 됩니다 */}
            <div className="pt-8 border-t border-stone-200">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mb-2">
                시즌과 비용, 이것만 알면 됩니다
              </h2>
              <p className="text-stone-500 text-sm mb-8">
                처음 가는 분들이 가장 많이 묻는 세 가지
              </p>

              <div className="space-y-6 text-sm">
                <div>
                  <h3 className="font-bold text-stone-900 mb-1.5 flex items-center gap-2">
                    <span className="w-1 h-3.5 bg-red-600 inline-block" />
                    언제 가면 좋나요
                  </h3>
                  <p className="text-stone-700 text-xs sm:text-sm leading-relaxed pl-3">
                    11월~2월이 건기이자 가장 선선한 성수기입니다. 3~5월은 매우 덥고, 6~10월은 우기라 오후 스콜을 감안해 이른 티타임을 권장합니다.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-stone-900 mb-1.5 flex items-center gap-2">
                    <span className="w-1 h-3.5 bg-red-600 inline-block" />
                    비용은 얼마나 드나요
                  </h3>
                  <p className="text-stone-700 text-xs sm:text-sm leading-relaxed pl-3">
                    그린피는 코스 등급, 요일, 시즌에 따라 크게 다릅니다. 캐디피, 카트, 캐디 팁은 별도인 경우가 많으니 포함 내역을 확인하세요.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-stone-900 mb-1.5 flex items-center gap-2">
                    <span className="w-1 h-3.5 bg-red-600 inline-block" />
                    캐디는 필수인가요
                  </h3>
                  <p className="text-stone-700 text-xs sm:text-sm leading-relaxed pl-3">
                    대부분의 코스에서 캐디 동반이 기본입니다. 거리 안내와 그린 라인 읽기를 도와주며, 라운드 후 팁을 건네는 문화가 있습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer of Page 2 */}
          <div className="flex items-center justify-between text-[11px] text-stone-400 pt-6 border-t border-stone-100 mt-12 font-mono">
            <span>https://bgitthai.golf · smw30103159@gmail.com</span>
            <span>2 / 4</span>
          </div>
        </div>

        {/* ================= PAGE 3 ================= */}
        <div className="bg-white p-8 sm:p-14 shadow-md rounded-sm border border-stone-200 relative min-h-[960px] flex flex-col justify-between print:shadow-none print:border-none print:m-0 print:p-8">
          <div>
            {/* Top Header of PDF */}
            <div className="flex items-center justify-between text-xs text-stone-500 pb-4 border-b border-stone-200 mb-8 font-mono">
              <span>BGIT Thai · 태국 현지 골프 전문회사</span>
              <span className="font-sans font-medium text-stone-700">
                타이골프노트 | 태국 현지 골프 가이드
              </span>
            </div>

            {/* Heading: 자료실 */}
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mb-2">
                자료실
              </h2>
              <p className="text-stone-500 text-sm">
                파일명을 누르면 PDF가 바로 저장됩니다.
              </p>
            </div>

            {/* Section 1: 파타야 가성비 골프상품 다운로드 / PDF */}
            <div className="mb-8">
              <div className="text-xs font-bold text-stone-900 mb-2 flex items-center gap-1.5">
                <span>파타야 가성비 골프상품 다운로드</span>
                <span className="text-stone-400">/</span>
                <span className="text-red-600 font-semibold">PDF</span>
              </div>
              <div className="border-t border-stone-200">
                <div className="py-2 text-[11px] font-bold text-stone-400 border-b border-stone-100">
                  제목
                </div>
                <div className="divide-y divide-stone-100">
                  {pattayaValuePkgs.map((pkg) => (
                    <div
                      key={pkg.id}
                      onClick={() => onSelectPackage(pkg)}
                      className="py-3 flex items-center justify-between gap-3 hover:bg-stone-50 cursor-pointer group px-1"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="px-1.5 py-0.5 text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 rounded">
                          PDF
                        </span>
                        <span className="text-xs sm:text-sm font-medium text-stone-900 group-hover:text-emerald-800">
                          {pkg.downloadFilename}
                        </span>
                      </div>
                      <span className="text-xs text-stone-400 group-hover:text-stone-600">
                        보기
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 2: 파타야 럭셔리·고품격 골프상품 다운로드 / PDF */}
            <div className="mb-8">
              <div className="text-xs font-bold text-stone-900 mb-2 flex items-center gap-1.5">
                <span>파타야 럭셔리·고품격 골프상품 다운로드</span>
                <span className="text-stone-400">/</span>
                <span className="text-red-600 font-semibold">PDF</span>
              </div>
              <div className="border-t border-stone-200">
                <div className="py-2 text-[11px] font-bold text-stone-400 border-b border-stone-100">
                  제목
                </div>
                <div className="divide-y divide-stone-100">
                  {pattayaLuxuryPkgs.map((pkg) => (
                    <div
                      key={pkg.id}
                      onClick={() => onSelectPackage(pkg)}
                      className="py-2.5 flex items-center justify-between gap-3 hover:bg-stone-50 cursor-pointer group px-1"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="px-1.5 py-0.5 text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 rounded">
                          PDF
                        </span>
                        <span className="text-xs sm:text-sm font-medium text-stone-900 group-hover:text-emerald-800">
                          {pkg.downloadFilename}
                        </span>
                      </div>
                      <span className="text-xs text-stone-400 group-hover:text-stone-600">
                        보기
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 3 Header: 파타야 풀빌라 골프상품 다운로드 / PDF */}
            <div>
              <div className="text-xs font-bold text-stone-900 mb-2 flex items-center gap-1.5">
                <span>파타야 풀빌라 골프상품 다운로드</span>
                <span className="text-stone-400">/</span>
                <span className="text-red-600 font-semibold">PDF</span>
              </div>
              <div className="border-t border-stone-200">
                <div className="py-2 text-[11px] font-bold text-stone-400 border-b border-stone-100">
                  제목
                </div>
              </div>
            </div>
          </div>

          {/* Footer of Page 3 */}
          <div className="flex items-center justify-between text-[11px] text-stone-400 pt-6 border-t border-stone-100 mt-12 font-mono">
            <span>https://bgitthai.golf · smw30103159@gmail.com</span>
            <span>3 / 4</span>
          </div>
        </div>

        {/* ================= PAGE 4 ================= */}
        <div className="bg-white p-8 sm:p-14 shadow-md rounded-sm border border-stone-200 relative min-h-[960px] flex flex-col justify-between print:shadow-none print:border-none print:m-0 print:p-8">
          <div>
            {/* Top Header of PDF */}
            <div className="flex items-center justify-between text-xs text-stone-500 pb-4 border-b border-stone-200 mb-6 font-mono">
              <span>BGIT Thai · 태국 현지 골프 전문회사</span>
              <span className="font-sans font-medium text-stone-700">
                타이골프노트 | 태국 현지 골프 가이드
              </span>
            </div>

            {/* Section 3 Rows: 파타야 풀빌라 */}
            <div className="mb-8">
              <div className="divide-y divide-stone-100 border-b border-stone-200">
                {pattayaPoolPkgs.map((pkg) => (
                  <div
                    key={pkg.id}
                    onClick={() => onSelectPackage(pkg)}
                    className="py-3 flex items-center justify-between gap-3 hover:bg-stone-50 cursor-pointer group px-1"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="px-1.5 py-0.5 text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 rounded">
                        PDF
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-stone-900 group-hover:text-emerald-800">
                        {pkg.downloadFilename}
                      </span>
                    </div>
                    <span className="text-xs text-stone-400 group-hover:text-stone-600">
                      보기
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 4: 방콕 가성비 골프상품 다운로드 / PDF */}
            <div className="mb-8">
              <div className="text-xs font-bold text-stone-900 mb-2 flex items-center gap-1.5">
                <span>방콕 가성비 골프상품 다운로드</span>
                <span className="text-stone-400">/</span>
                <span className="text-red-600 font-semibold">PDF</span>
              </div>
              <div className="border-t border-stone-200">
                <div className="py-2 text-[11px] font-bold text-stone-400 border-b border-stone-100">
                  제목
                </div>
                <div className="divide-y divide-stone-100">
                  {bkkValuePkgs.map((pkg) => (
                    <div
                      key={pkg.id}
                      onClick={() => onSelectPackage(pkg)}
                      className="py-3 flex items-center justify-between gap-3 hover:bg-stone-50 cursor-pointer group px-1"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="px-1.5 py-0.5 text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 rounded">
                          PDF
                        </span>
                        <span className="text-xs sm:text-sm font-medium text-stone-900 group-hover:text-emerald-800">
                          {pkg.downloadFilename}
                        </span>
                      </div>
                      <span className="text-xs text-stone-400 group-hover:text-stone-600">
                        보기
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 5: 방콕 럭셔리 골프상품 다운로드 / PDF */}
            <div className="mb-8">
              <div className="text-xs font-bold text-stone-900 mb-2 flex items-center gap-1.5">
                <span>방콕 럭셔리 골프상품 다운로드</span>
                <span className="text-stone-400">/</span>
                <span className="text-red-600 font-semibold">PDF</span>
              </div>
              <div className="border-t border-stone-200">
                <div className="py-2 text-[11px] font-bold text-stone-400 border-b border-stone-100">
                  제목
                </div>
                <div className="divide-y divide-stone-100">
                  {bkkLuxuryPkgs.map((pkg) => (
                    <div
                      key={pkg.id}
                      onClick={() => onSelectPackage(pkg)}
                      className="py-3 flex items-center justify-between gap-3 hover:bg-stone-50 cursor-pointer group px-1"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="px-1.5 py-0.5 text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 rounded">
                          PDF
                        </span>
                        <span className="text-xs sm:text-sm font-medium text-stone-900 group-hover:text-emerald-800">
                          {pkg.downloadFilename}
                        </span>
                      </div>
                      <span className="text-xs text-stone-400 group-hover:text-stone-600">
                        보기
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 6: 태국 골프 가이드 다운로드 / PDF */}
            <div className="mb-6">
              <div className="text-xs font-bold text-stone-900 mb-2 flex items-center gap-1.5">
                <span>태국 골프 가이드 다운로드</span>
                <span className="text-stone-400">/</span>
                <span className="text-red-600 font-semibold">PDF</span>
              </div>
              <div className="border-t border-stone-200">
                <div className="py-2 text-[11px] font-bold text-stone-400 border-b border-stone-100">
                  제목
                </div>
                <div className="divide-y divide-stone-100">
                  {guidePkgs.map((pkg) => (
                    <div
                      key={pkg.id}
                      onClick={() => onSelectPackage(pkg)}
                      className="py-3 flex items-center justify-between gap-3 hover:bg-stone-50 cursor-pointer group px-1"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="px-1.5 py-0.5 text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 rounded">
                          PDF
                        </span>
                        <span className="text-xs sm:text-sm font-medium text-stone-900 group-hover:text-emerald-800">
                          {pkg.downloadFilename}
                        </span>
                      </div>
                      <span className="text-xs text-stone-400 group-hover:text-stone-600">
                        보기
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer of Page 4 */}
          <div className="flex items-center justify-between text-[11px] text-stone-400 pt-6 border-t border-stone-100 mt-12 font-mono">
            <span>https://bgitthai.golf · smw30103159@gmail.com</span>
            <span>4 / 4</span>
          </div>
        </div>
      </div>
    </div>
  );
};
