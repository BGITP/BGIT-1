import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { BgitSpecialFeatures } from './components/BgitSpecialFeatures';
import { PackageList } from './components/PackageList';
import { BgitDifferentiators } from './components/BgitDifferentiators';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ReservationModal } from './components/ReservationModal';
import { PdfExactView } from './components/PdfExactView';
import { KakaoShareModal } from './components/KakaoShareModal';
import { GolfPackage, PackageCategory } from './types/golf';
import { COMPANY_INFO } from './data/golfData';
import { MessageCircle } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<'interactive' | 'pdf'>('interactive');
  const [selectedPackage, setSelectedPackage] = useState<GolfPackage | null>(null);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isKakaoPreviewOpen, setIsKakaoPreviewOpen] = useState(false);
  const [reservationPackageId, setReservationPackageId] = useState<string | undefined>(undefined);
  const [packageCategoryFilter, setPackageCategoryFilter] = useState<PackageCategory | 'all'>('women-join');

  const handleOpenReservation = (packageId?: string) => {
    setReservationPackageId(packageId);
    setIsReservationOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-stone-900 flex flex-col font-sans selection:bg-emerald-800 selection:text-white">
      {/* Top Bar Header with 9 Menus */}
      <Header
        onOpenReservation={handleOpenReservation}
        onSelectCategory={(cat) => {
          setPackageCategoryFilter(cat);
          const el = document.getElementById('packages');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        activeCategory={packageCategoryFilter}
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

          {/* BGIT Differentiators / Features */}
          <BgitSpecialFeatures />

          {/* Package List & Download Center */}
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
        {/* Quick Line / Kakao Chat Float */}
        <a
          href={`https://line.me/ti/p/~${COMPANY_INFO.line}`}
          target="_blank"
          rel="noreferrer"
          className="p-3.5 bg-[#06C755] hover:bg-[#05b34c] text-white rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center cursor-pointer"
          title="라인 실시간 현지 상담"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
}
