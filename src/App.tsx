import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { RegionalScorecard } from './components/RegionalScorecard';
import { SeasonCostGuide } from './components/SeasonCostGuide';
import { PackageList } from './components/PackageList';
import { BgitDifferentiators } from './components/BgitDifferentiators';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ReservationModal } from './components/ReservationModal';
import { PdfExactView } from './components/PdfExactView';
import { KakaoShareModal } from './components/KakaoShareModal';
import { GolfPackage, PackageCategory, RegionId } from './types/golf';
import { COMPANY_INFO } from './data/golfData';
import { Phone, MessageCircle, FileText, Share2 } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<'interactive' | 'pdf'>('interactive');
  const [selectedPackage, setSelectedPackage] = useState<GolfPackage | null>(null);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isKakaoPreviewOpen, setIsKakaoPreviewOpen] = useState(false);
  const [reservationPackageId, setReservationPackageId] = useState<string | undefined>(undefined);
  const [packageCategoryFilter, setPackageCategoryFilter] = useState<PackageCategory | 'all'>('all');

  const handleOpenReservation = (packageId?: string) => {
    setReservationPackageId(packageId);
    setIsReservationOpen(true);
  };

  const handleSelectRegionForFilter = (regionId: RegionId) => {
    if (regionId === 'bangkok') {
      setPackageCategoryFilter('bangkok-value');
    } else if (regionId === 'pattaya') {
      setPackageCategoryFilter('pattaya-value');
    } else {
      setPackageCategoryFilter('all');
    }
    // Scroll smoothly to package list section
    const el = document.getElementById('packages');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-stone-800 flex flex-col font-sans selection:bg-emerald-800 selection:text-white">
      {/* Top Bar Header */}
      <Header
        onOpenReservation={handleOpenReservation}
        activeView={activeView}
        onToggleView={setActiveView}
        onOpenKakaoPreview={() => setIsKakaoPreviewOpen(true)}
      />

      {/* Main Content: Depending on activeView */}
      {activeView === 'pdf' ? (
        <main className="flex-1">
          <PdfExactView
            onSelectPackage={setSelectedPackage}
            onOpenReservation={handleOpenReservation}
            onBackToInteractive={() => setActiveView('interactive')}
          />
        </main>
      ) : (
        <main className="flex-1">
          {/* Hero Section */}
          <HeroSection
            onOpenReservation={() => handleOpenReservation()}
            onViewPdfMode={() => setActiveView('pdf')}
          />

          {/* Regional Scorecard Section (PDF Page 1 & 2) */}
          <RegionalScorecard
            onSelectRegionForFilter={handleSelectRegionForFilter}
            onOpenReservation={(region) => handleOpenReservation()}
          />

          {/* Season & Cost Guide (PDF Page 2 & Screenshot 1) */}
          <SeasonCostGuide />

          {/* Package List & Download Center (PDF Page 3 & 4) */}
          <PackageList
            onSelectPackage={setSelectedPackage}
            onOpenReservation={handleOpenReservation}
            initialCategory={packageCategoryFilter}
          />

          {/* BGIT Differentiators, Inclusions/Exclusions, Peak Season & Notes */}
          <BgitDifferentiators />
        </main>
      )}

      {/* Footer */}
      <Footer />

      {/* Product Detail Modal */}
      <ProductDetailModal
        packageData={selectedPackage}
        onClose={() => setSelectedPackage(null)}
        onOpenReservation={handleOpenReservation}
      />

      {/* Reservation & Quote Inquiry Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        selectedPackageId={reservationPackageId}
      />

      {/* KakaoTalk Share Preview Modal */}
      <KakaoShareModal
        isOpen={isKakaoPreviewOpen}
        onClose={() => setIsKakaoPreviewOpen(false)}
      />

      {/* Floating Quick Action Widget on Mobile & Desktop */}
      <div className="fixed bottom-5 right-5 z-30 flex flex-col items-end gap-2.5 print:hidden">
        {/* Kakao Share Preview Trigger */}
        <button
          type="button"
          onClick={() => setIsKakaoPreviewOpen(true)}
          className="px-3 py-2 bg-[#FEE500] hover:bg-[#FDD800] text-[#191919] rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5 transition-transform hover:scale-105 cursor-pointer"
          title="카카오톡 링크 공유 미리보기"
        >
          <span className="w-2 h-2 rounded-full bg-[#191919]" />
          <span>카톡 공유 카드</span>
        </button>

        {/* Toggle to PDF or Interactive quick pill */}
        <button
          type="button"
          onClick={() => setActiveView(activeView === 'interactive' ? 'pdf' : 'interactive')}
          className="px-3.5 py-2 bg-stone-900/90 hover:bg-stone-900 text-white rounded-full text-xs font-semibold shadow-lg backdrop-blur-xs flex items-center gap-1.5 transition-transform hover:scale-105 cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5 text-emerald-400" />
          <span>{activeView === 'interactive' ? 'PDF 원본 양식 뷰' : '웹 인터랙티브 뷰'}</span>
        </button>

        {/* Quick Line / Kakao Chat Float */}
        <a
          href={`https://line.me/ti/p/~${COMPANY_INFO.line}`}
          target="_blank"
          rel="noreferrer"
          className="p-3 bg-[#06C755] hover:bg-[#05b34c] text-white rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center cursor-pointer"
          title="라인 실시간 현지 상담"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
}
