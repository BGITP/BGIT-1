export type RegionId = 'bangkok' | 'pattaya' | 'huahin' | 'phuket' | 'chiangmai';

export interface GolfRegion {
  id: RegionId;
  nameKr: string;
  nameEn: string;
  courses: string[];
  features: string;
  recommendedSeason: string;
  driveFromAirport: string;
  highlightCourse: string;
}

export type PackageCategory = 
  | 'women-join'
  | 'pattaya-value' 
  | 'pattaya-premium'
  | 'pattaya-luxury' 
  | 'pattaya-poolvilla' 
  | 'pattaya-golftel'
  | 'bangkok-value' 
  | 'bangkok-luxury' 
  | 'entry-meeting-schedule'
  | 'guide';

export interface GolfPackage {
  id: string;
  category: PackageCategory;
  categoryLabel: string;
  price: number;
  priceFormatted: string;
  title: string;
  hotel: string;
  hotelGrade: string;
  duration: string; // e.g. 3박 4일
  courses: string[];
  inclusions: string[];
  exclusions: string[];
  isJoin?: boolean;
  isPoolVilla?: boolean;
  recommendedFor: string;
  fileSize?: string;
  downloadFilename: string;
  pdfPath?: string;
}

export interface InquiryFormData {
  customerName: string;
  phone: string;
  email: string;
  kakaoId: string;
  packageId: string;
  travelDateStart: string;
  travelDateEnd: string;
  numberOfGolfer: number;
  numberOfRooms: number;
  preferredRegion: RegionId | 'all';
  needsGuideEscort: boolean;
  notes: string;
}
