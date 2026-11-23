export interface YouTubeShortsItem {
  id: number;
  videoId: string;
  title: string;
  mp4Path: string;
}

// Helper to extract YouTube video ID from various URL formats
export function getYouTubeVideoId(urlOrId: string): string {
  if (!urlOrId) return '';
  const trimmed = urlOrId.trim();
  
  // If it's already an 11-char video ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }
  
  // youtube.com/shorts/VIDEO_ID
  const shortsMatch = trimmed.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
  if (shortsMatch && shortsMatch[1]) return shortsMatch[1];
  
  // youtu.be/VIDEO_ID
  const youtuMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (youtuMatch && youtuMatch[1]) return youtuMatch[1];
  
  // youtube.com/watch?v=VIDEO_ID
  const watchMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch && watchMatch[1]) return watchMatch[1];
  
  // Fallback regex for any 11-char ID in the URL
  const anyMatch = trimmed.match(/([a-zA-Z0-9_-]{11})/);
  return anyMatch ? anyMatch[1] : trimmed;
}

// 10 BGIT Thai Golf YouTube Shorts with Name & Handicap
export const INITIAL_YOUTUBE_SHORTS: YouTubeShortsItem[] = [
  {
    id: 1,
    videoId: '7Vl_obSVcRQ',
    title: 'Ling - 핸디 25개',
    mp4Path: '/assets/aistudio/Ling_-____25__0ea81580.mp4',
  },
  {
    id: 2,
    videoId: 'hAlfTxcEVb4',
    title: 'Jaja - 핸디 15개',
    mp4Path: '/assets/aistudio/Jaja_-____15__504840ec.mp4',
  },
  {
    id: 3,
    videoId: 'buBFFxXcw_I',
    title: 'Mint - 핸디 20개',
    mp4Path: '/assets/aistudio/Mint_-____20__b2c2dc0f.mp4',
  },
  {
    id: 4,
    videoId: 'a6oK-zLb7nQ',
    title: 'Yu - 핸디 15개',
    mp4Path: '/assets/aistudio/Yu_-____15__a978156f.mp4',
  },
  {
    id: 5,
    videoId: 'dLkxmzrD-_E',
    title: 'Siri - 핸디 15개',
    mp4Path: '/assets/aistudio/Siri_-____15__c3a4a767.mp4',
  },
  {
    id: 6,
    videoId: 'Eee7qebk_Lo',
    title: 'Oi - 핸디 15개',
    mp4Path: '/assets/aistudio/Oi_-____15__062e64b3.mp4',
  },
  {
    id: 7,
    videoId: 'Lm81Os8o4J4',
    title: 'Nong - 핸디 15개',
    mp4Path: '/assets/aistudio/Nong_-____15__60b36e2f.mp4',
  },
  {
    id: 8,
    videoId: 'jJXnaz5_3P0',
    title: 'Mook - 핸디 15개',
    mp4Path: '/assets/aistudio/Mook_-____15__a91c451d.mp4',
  },
  {
    id: 9,
    videoId: 'eKsSlM8hRfw',
    title: 'May - 핸디 15개',
    mp4Path: '/assets/aistudio/May_-____15__ee0a5af5.mp4',
  },
  {
    id: 10,
    videoId: '6PX1b9zc_Jk',
    title: 'Kim - 핸디 15개',
    mp4Path: '/assets/aistudio/Kim_-____15__cbbac9f5.mp4',
  },
];
