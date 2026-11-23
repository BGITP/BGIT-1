export interface PattayaHotelInfo {
  id: string;
  name: string;
  grade: string;
  englishName: string;
  image: string;
  homepageUrl: string;
  photoDownloadUrl: string;
  description: string;
  roomInfo: string;
  rateInfo?: string;
}

export interface PattayaGolfCourseInfo {
  id: string;
  name: string;
  grade: string;
  englishName: string;
  image: string;
  homepageUrl: string;
  photoDownloadUrl: string;
  courseInfo: string;
  teeOffTime: string;
  caddyTip: string;
  restaurant: string;
  facilities: string;
  feature: string;
  rateInfo?: string;
}

export interface PattayaUpgradeHotelInfo {
  id: string;
  name: string;
  grade: string;
  englishName: string;
  priceNote: string;
  image: string;
  homepageUrl: string;
  photoDownloadUrl: string;
}

export const PATTAYA_VALUE_HOTELS: PattayaHotelInfo[] = [
  {
    id: 'vista-pattaya',
    name: '비스타 파타야 호텔',
    grade: '4성급',
    englishName: 'Vista Pattaya Hotel',
    image: '/assets/pattaya-value/hotel_vista.jpg',
    homepageUrl: 'https://www.hotelvista.com/pattaya/index.html',
    photoDownloadUrl: 'https://drive.google.com/drive/folders/1_vLSdSzp21eq1M-dsiJ2Ltm8N8BKOFDp?usp=drive_link',
    description:
      '파타야 중심부에 위치한 비스타 호텔은 파타야 해변에서 100m 정도 떨어져 있는 호텔로 해변에서 편하고 한가로운 시간을 보내기에 좋은 조건과 함께 쇼핑 및 바 등 다양한 문화적 즐길 거리와 먹거리를 만끽할 수 있어 여행객 사이에서 인기가 높은 호텔입니다. 2020년 전 객실을 현대적인 인테리어와 따스한 분위기의 조명으로 리노베이션을 했으며 전기포트와 평면 위성 TV를 갖추고 있습니다. 새로 완비된 각종 운동기구와 피트니스 센터에서 운동을 즐기실 수도 있으며 자전거와 차량도 대여해 드립니다. Patio Bar & Restaurant은 다양한 종류의 유럽 요리와 태국 요리 그리고 씨푸드를 선보입니다. 이 레스토랑은 각종 초밥, 샐러드, 파스타를 비롯한 해산물 바비큐 등이 파타야에서 맛이 있기로 이름난 레스토랑입니다. 또한 해수 수영장 옆에 있는 Café Du Prom에서는 상쾌한 특별 음료를 즐기실 수도 있고 Pedro Gastrobar에서는 시내에서 가장 맛있는 타파스를 맛보실 수 있습니다. 파타야 워킹 스트리트, 센트럴 마리나 등 유명 관광지와 쇼핑센터가 가까이 위치하고 있어 이동이 편리합니다.',
    roomInfo: '슈페리어 룸 - 32sqm / 씨티뷰 & 풀뷰',
    rateInfo: '호텔 요금\n1박 - 1,800바트 / 조식포함  주중.주말 요금동일\n(3박 예약시 5% 할인)',
  },
  {
    id: 'm-pattaya',
    name: '엠 파타야 호텔',
    grade: '4성급',
    englishName: 'M Pattaya Hotel',
    image: '/assets/pattaya-value/hotel_mpattaya.jpg',
    homepageUrl: 'https://www.mhotel.co.th/',
    photoDownloadUrl: 'https://drive.google.com/drive/folders/1uFimCE4GBq1STHyU2Mmg8hSEcIHH4M-m?usp=drive_link',
    description:
      '2019년 오픈한 아주 깔끔하고 세련된 호텔입니다. M Pattaya Hotel에서는 5성급 호텔이 갖춰야 할 야외 수영장, 전용 주차장, 피트니스 센터, 정원 등 모든 시설을 갖추고 있어 이용하실 때 전혀 불편함이 없이 지내실 수가 있습니다. 또한 파타야 웡아맛 비치에서 도보로 10분 거리에 위치해 있어 바닷가 해변 여가를 즐기기에도 안성맞춤입니다. 룸에는 테라스가 있어 시티뷰·풀뷰·씨뷰 등의 다양한 룸들을 제공하고 있습니다. 레스토랑에서 저녁식사를 즐기거나 바에서 음료 및 주류들도 드실 수가 있습니다. 매일 조식으로 미국식, 아시아식 또는 채식 메뉴가 준비되어 있고, 숙소 근처에는 나클루아 비치, 센트럴 페스티벌 파타야 비치, 티파니 쇼 등의 주요 명소가 있습니다. 새로 오픈한 호텔인 만큼 깔끔해 한국 고객님들에게 인기가 많은 호텔입니다.',
    roomInfo: '슈페리어 룸 - 28sqm / 씨티뷰 & 풀뷰',
    rateInfo: '호텔 요금\n1박 - 2,000바트 / 조식포함  주중.주말 요금동일\n(3박 예약시 5% 할인)',
  },
  {
    id: 'the-proud-pattaya',
    name: '더 프라우드 파타야 호텔',
    grade: '4성급',
    englishName: 'The Proud Hotel Pattaya',
    image: '/assets/pattaya-value/hotel_proud.jpg',
    homepageUrl: 'https://www.theproudpattayahotel.com/',
    photoDownloadUrl: 'https://drive.google.com/drive/folders/1zfhyUwr7dDj7eVMa0yzS2KFHjmfIo2GP?usp=drive_link',
    description:
      '더 프라우드 호텔은 2021년 오픈한 총 8층, 220개의 객실을 갖춘 4.5성급 호텔입니다. 가격 대비 상당히 좋은 객실과 부대시설을 갖추고 있어 한국 골퍼님들에게는 만족도가 아주 높은 호텔입니다. 야외 수영장, 헬스장, 스팀룸 등을 구비하고 있고 2개의 식당이 호텔 내에 있어 다양한 여러 나라의 음식을 맛보실 수도 있습니다. 또한 야외 테라스가 갖춰져 있어 편안하게 휴식을 취할 수 있습니다. 안정적인 서비스와 전문적인 직원을 배치하여 손님에게 불편함을 느낄 수 없게 최선을 다하는 프라우드 파타야 호텔입니다.',
    roomInfo: '슈페리어 룸 - 32sqm / 씨티뷰 & 풀뷰',
    rateInfo: '호텔 요금\n1박 - 1,800바트 / 조식포함  주중.주말 요금동일\n(3박 예약시 5% 할인)',
  },
  {
    id: 'new-wing-pattaya',
    name: '블루 캐빈 호텔',
    grade: '4성급',
    englishName: 'Blue Cabin Hotel',
    image: '/assets/pattaya-value/hotel_newwing.jpg',
    homepageUrl: 'https://www.a-onehotel.com/aonenewwinghotel/',
    photoDownloadUrl: 'https://drive.google.com/drive/folders/1Ze9qGFawcTMedwBKAfShD0Q8CGD2snzi?usp=drive_link',
    description:
      '블루 캐빈 호텔은 264개의 객실을 갖추고 있는 A-one 그룹에서 선보인 4.5성급 호텔입니다. 모든 객실에 딸린 전용 발코니에서 전망을 감상하실 수 있으며 파타야 비치 바로 맞은편에 위치한 호텔로 독특한 항해 테마로 꾸며진 호텔입니다. 야외 수영장과 스파 등 각종 편의시설을 갖추고 있으며 파타야 비치를 걸어서 1분이면 갈 수 있는 위치에 있고 워킹스트리트, 로열 가든 플라자, 센트럴 페스티벌 몰까지 무료 셔틀버스도 운행됩니다. 피트니스 센터, 사우나와 스파 욕조 등 5성급 호텔에서 제공되는 모든 Facilities도 비치되어 있어 호텔에 머무는 동안 편하게 시설을 이용할 수 있습니다. Boat Music Place에서는 춤과 라이브 공연도 즐기실 수 있습니다.',
    roomInfo: '슈페리어 룸 - 32sqm 씨티뷰 & 풀뷰',
    rateInfo: '호텔 요금\n1박 - 2,900바트 / 조식포함  주중.주말 요금동일\n(3박 예약시 5% 할인)',
  },
];

export const PATTAYA_VALUE_GOLF_COURSES: PattayaGolfCourseInfo[] = [
  {
    id: 'pleasant-valley',
    name: '프레젠트밸리 컨트리 클럽',
    grade: '4성급',
    englishName: 'Pleasant Valley Golf & Country Club',
    image: '/assets/pattaya-value/golf_pleasantvalley.jpg',
    homepageUrl: 'https://www.facebook.com/Pleasantvalleygolf/',
    photoDownloadUrl: 'https://drive.google.com/drive/folders/1gczYgJwxLbl90OFES4lTH-rXYKFCAI3x?usp=drive_link',
    courseInfo: '18홀 / 72 파 / 7,002 야드',
    teeOffTime: '1부 06:30~08:57 / 2부 12:00~13:30',
    caddyTip: '18홀당 400~500바트 / 캐디에게 직접 전달',
    restaurant: '태국식 · 인터내셔널',
    facilities: '드라이빙 레인지 / 퍼팅그린 / 벙커샷 / 프로샵 / 마사지',
    feature:
      '파타야 지역의 3대 골프장 중 하나로 소개되는 구장입니다. 챔피언십 코스를 갖춘 구장으로 대부분의 홀이 워터 해저드를 끼고 있어 약간의 방심이 스코어와 직결되는 코스를 가지고 있습니다. 위험한 벙커들이 많아 생각만큼 쉽지 않은 구장입니다.',
    rateInfo:
      '주중 - 1,800 바트 / 그린 캐디 카트  포함\n주말 - 2,050 바트 / 그린 캐디 카트  포함',
  },
  {
    id: 'eastern-star',
    name: '이스턴스타 골프 리조트',
    grade: '4성급',
    englishName: 'Eastern Star Golf Resort',
    image: '/assets/pattaya-value/golf_easternstar.jpg',
    homepageUrl: 'https://www.easternstargolfcourse.com/easternstargolfcourse.com/easternstar/html/color1/index.html',
    photoDownloadUrl: 'https://drive.google.com/drive/folders/1YBkhJQNOanSKkZKAvQ3Ohk3AIMZbFwEu?usp=drive_link',
    courseInfo: '18홀 / 72 파 / 7,134 야드',
    teeOffTime: '1부 06:30~09:30 / 2부 12:00~13:30',
    caddyTip: '18홀당 400~500바트 / 캐디에게 직접 전달',
    restaurant: '태국식 · 인터내셔널',
    facilities: '드라이빙 레인지 / 퍼팅그린 / 피트니스 / 프로샵 / 마사지',
    feature:
      '기가 막히게 구성된 페어웨이 언듀레이션과 워터 해저드가 조화를 이루고 있어 어렵지 않게 라운딩을 즐길 수 있는 구장입니다. 그러나 라운딩이 거듭될수록 전략을 세워 공략해야 하는 난이도가 점점 높아지는 골프코스입니다.',
    rateInfo:
      '주중 - 2,350 바트 / 그린 캐디 카트  포함\n주말 - 2,650 바트 / 그린 캐디 카트  포함',
  },
  {
    id: 'greenwood',
    name: '그린우드 골프 리조트',
    grade: '4성급',
    englishName: 'Green Wood Golf & Resort',
    image: '/assets/pattaya-value/golf_greenwood.jpg',
    homepageUrl: 'http://www.gwgolfclub.com/',
    photoDownloadUrl: 'https://drive.google.com/drive/folders/1DfpWgejJXLCe55toSDLcC_SB43Alu9VB?usp=drive_link',
    courseInfo: '27홀 / 108 파 / 10,380 야드',
    teeOffTime: '1부 · 2부 / 06:32~14:00',
    caddyTip: '18홀당 400~500바트 / 캐디에게 직접 전달',
    restaurant: '태국식 · 인터내셔널',
    facilities: '드라이빙 레인지 / 퍼팅그린 / 피트니스 / 프로샵 / 마사지',
    feature:
      '워터해저드가 많지는 않지만 대신 각종 크기의 벙커가 많아 약간은 어려운 구장입니다. 특히 항아리 벙커는 골퍼들에게 큰 골칫거리이면서도 역시 도전을 하게 만드는 재미있는 코스로 손꼽힙니다. 시그니처 홀인 C코스 9번 홀(파4, 420야드) 코스는 티박스에서 가슴을 설레게 합니다.',
    rateInfo:
      '주중 - 1,800 바트 / 그린 캐디 카트  포함\n주말 - 2,000 바트 / 그린 캐디 카트  포함',
  },
  {
    id: 'silky-oak',
    name: '실키오크 컨트리 클럽',
    grade: '4성급',
    englishName: 'Silky Oak Country Club',
    image: '/assets/pattaya-value/golf_silkyoak.jpg',
    homepageUrl: 'http://www.standrews2000golf.com/',
    photoDownloadUrl: 'https://drive.google.com/drive/folders/1BOcwL_dFEtooudf2r7uNgvdCufGXsf2y?usp=drive_link',
    courseInfo: '18홀 / 72 파 / 7,041 야드',
    teeOffTime: '1부 · 2부 / 06:00~14:00',
    caddyTip: '18홀당 400~500바트 / 캐디에게 직접 전달',
    restaurant: '태국식 · 인터내셔널',
    facilities: '드라이빙 레인지 / 퍼팅그린 / 피트니스 / 프로샵 / 마사지',
    feature:
      '까다로운 몇몇 홀들과 평탄하지 않은 페어웨이들로 수준급의 골퍼도 플레이를 하실 수 있는 곳이며 아름다운 배경과 함께 자연스러우면서도 어려운 레이아웃은 도전해 볼 만한 코스로 한국 골퍼들이 좋아하는 코스로 이루어져 있습니다.',
    rateInfo:
      '주중 - 2,650 바트 / 그린 캐디 카트  포함\n주말 - 2,850 바트 / 그린 캐디 카트  포함',
  },
  {
    id: 'pattavia',
    name: '파타비아 센츄리 골프클럽',
    grade: '4성급',
    englishName: 'Pattavia Century Golf Club',
    image: '/assets/pattaya-value/golf_pattavia.jpg',
    homepageUrl: 'http://www.pattaviagolf.com/',
    photoDownloadUrl: 'https://drive.google.com/drive/folders/1Ulu-NLqjrAGd4MovHrlvNFwUHy_nw_TT?usp=drive_link',
    courseInfo: '18홀 / 72 파 / 6,892 야드',
    teeOffTime: '1부 · 2부 / 06:00~14:00',
    caddyTip: '18홀당 400~500바트 / 캐디에게 직접 전달',
    restaurant: '태국식 · 인터내셔널',
    facilities: '퍼팅그린 / 프로샵 / 마사지',
    feature:
      '2014년에 새롭게 단장한 파타비아 CC는 그린, 티박스, 페어웨이, 벙커, 러프, 워터해저드 등 모든 골프코스를 리노베이션하여 많은 골퍼들에게 선보이면서 더욱 인기 있는 골프장으로 이름을 알리고 있습니다. 전체적으로 그린 스피드는 빠른 편이고 잔디 관리 상태가 아주 우수한 편입니다.',
    rateInfo:
      '주중 - 1,980 바트 / 그린 캐디 카트  포함\n주말 - 2,380 바트 / 그린 캐디 카트  포함',
  },
  {
    id: 'treasure-hill',
    name: '트레저 힐 컨트리 클럽',
    grade: '4성급',
    englishName: 'Treasure Hill Golf & Country Club',
    image: '/assets/pattaya-value/golf_treasurehill.jpg',
    homepageUrl: 'http://www.treasurehill.co.th/',
    photoDownloadUrl: 'https://drive.google.com/drive/folders/1Nqr_tXb282DD8n0Qr_arKj7XzRQ9sbDV?usp=drive_link',
    courseInfo: '18홀 / 72 파 / 7,264 야드',
    teeOffTime: '1부 06:00~08:30 / 2부 11:00~14:00',
    caddyTip: '18홀당 400~500바트 / 캐디에게 직접 전달',
    restaurant: '태국식 · 일식 · 중식',
    facilities: '퍼팅그린 / 프로샵 / 마사지',
    feature:
      '트레저힐은 나무가 많고 산악형 골프장이어서 한국 골퍼들에게는 친숙한 골프장입니다. 페어웨이 중간에 위치한 큰 나무들이 그린 공략에 약간의 난이도를 더하는 구장이며, 특히 16번 홀은 악어처럼 길게 구부러진 모양의 도그렉홀인데 악어처럼 생겼다고 해서 라코스테 홀이라고 부릅니다.',
    rateInfo:
      '주중 - 1,880 바트 / 그린 캐디 카트  포함\n주말 - 1,980 바트 / 그린 캐디 카트  포함',
  },
];

export const PATTAYA_VALUE_UPGRADE_HOTELS: PattayaUpgradeHotelInfo[] = [
  {
    id: 'grand-palazzo',
    name: '그랜드 팔라조 파타야 호텔',
    grade: '5성급',
    englishName: 'The Grand Palazzo Hotel Pattaya',
    priceNote: '3박 / 1인당 : 요금문의',
    image: '/assets/pattaya-value/hotel_grandpalazzo.jpg',
    homepageUrl: 'http://www.grandpalazzohotel.com/',
    photoDownloadUrl: 'https://drive.google.com/drive/folders/1WstOQEHs03p3QKiRIrR0Nq1ltIbgyzFL?usp=drive_link',
  },
  {
    id: 'brighton-grand',
    name: '브라이튼 그랜드 파타야 호텔',
    grade: '5성급',
    englishName: 'Brighton Grand Pattaya Hotel',
    priceNote: '3박 / 1인당 : 요금문의',
    image: '/assets/pattaya-value/hotel_brighton.jpg',
    homepageUrl: 'http://pattaya.brightonhotelgroup.com/',
    photoDownloadUrl: 'https://drive.google.com/drive/folders/15ZAPQot9yVVqfb1huwjWkG9G2yMZHy88?usp=drive_link',
  },
  {
    id: 'mytt-beach',
    name: '미트비치 파타야 호텔',
    grade: '5성급',
    englishName: 'Mytt Hotel Pattaya',
    priceNote: '3박 / 1인당 : 요금문의',
    image: '/assets/pattaya-value/hotel_mytt.jpg',
    homepageUrl: 'https://www.mytthotel.com/',
    photoDownloadUrl: 'https://drive.google.com/drive/folders/1CFy88CoJLtWJ1fscrYsKBhJVCGXBxaKL?usp=drive_link',
  },
];
