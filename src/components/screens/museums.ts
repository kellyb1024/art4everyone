import jungangImg from "@/assets/museum.png.asset.json";
import mmcaImg from "@/assets/mmca-museum.png.asset.json";
import myeongpumImg from "@/assets/exhibit-myeongpum.png.asset.json";
import koreanImg from "@/assets/exhibit-korean.png.asset.json";
import mmca1 from "@/assets/mmca-poster-1.png.asset.json";
import mmca2 from "@/assets/mmca-poster-2.png.asset.json";
import mmca3 from "@/assets/mmca-poster-3.png.asset.json";

export type Exhibit = {
  id: string;
  title: string;
  subtitle: string;
  blurb: string;
  tags: string[];
  image: string;
};

export type Artwork = {
  badge: string;
  title: string;
  meta: { k: string; v: string }[];
  description: string;
  nextStep: string;
};

export type Museum = {
  id: string;
  name: string;
  nameLines: [string, string];
  location: string;
  image: string;
  recommendedTime: string;
  stats: { label: string; value: string }[];
  exhibits: Exhibit[];
  artwork: Artwork;
};

export const MUSEUMS: Museum[] = [
  {
    id: "jungang",
    name: "국립중앙박물관",
    nameLines: ["국립", "중앙 박물관"],
    location: "용산구, 서울",
    image: jungangImg.url,
    recommendedTime: "2시간 이상",
    stats: [
      { label: "오늘 휴관", value: "아니오" },
      { label: "입장료", value: "무료" },
      { label: "휴식 공간", value: "12곳" },
    ],
    exhibits: [
      {
        id: "myeongpum30",
        title: "명품 30선",
        subtitle: "Top 30 Treasures",
        blurb: "고려청자 · 금동대향로 · 반가사유상 등 국보급 30점",
        tags: ["국보", "도자기", "불교 조각"],
        image: myeongpumImg.url,
      },
      {
        id: "korean24",
        title: "한국 문화의 독창성 24선",
        subtitle: "Uniquely Korean · 24 works",
        blurb: "한글 · 백자 · 민속 조각으로 보는 한국만의 시선",
        tags: ["민속", "한글", "회화"],
        image: koreanImg.url,
      },
    ],
    artwork: {
      badge: "작품 #1 도착",
      title: "금동 반가사유상",
      meta: [
        { k: "시대", v: "삼국 7C" },
        { k: "국보", v: "제 83호" },
        { k: "재질", v: "금동" },
      ],
      description:
        "깊은 명상에 잠긴 보살의 미소. 한국 불교 조각의 정수로 꼽히는 작품이에요.",
      nextStep: "초록 길을 따라 두 번째 전시실로 이동하세요 (약 40초).",
    },
  },
  {
    id: "mmca",
    name: "MMCA 국립현대미술관 서울",
    nameLines: ["국립현대미술관", "서울"],
    location: "종로구, 서울",
    image: mmcaImg.url,
    recommendedTime: "2시간 이상",
    stats: [
      { label: "오늘 휴관", value: "아니오" },
      { label: "입장료", value: "4,000원" },
      { label: "휴식 공간", value: "8곳" },
    ],
    exhibits: [
      {
        id: "geuraedo",
        title: "그래도 해보던 날들",
        subtitle: "The Days We Still Tried",
        blurb:
          "작품과 상시워크숍을 통해 만들고, 실패하고, 반복하며 다시 시도하는 창작의 과정을 경험할 수 있는 교육 전시.",
        tags: ["MMCA 아이공간", "어린이"],
        image: mmca1.url,
      },
      {
        id: "tamjeong",
        title: "MMCA 다원예술 2026: 탐정의 시간",
        subtitle: "Deep Time, Chasing Clues",
        blurb:
          "AI의 효율성에 대비하여, 탐정처럼 미세한 단서를 쫓으며 인간 고유의 깊고 느린 시간을 감각하는 다원예술 프로젝트.",
        tags: ["탐정", "깊은", "시간"],
        image: mmca2.url,
      },
      {
        id: "hirst",
        title: "데이미언 허스트",
        subtitle: "Damien Hirst",
        blurb:
          "삶과 죽음, 아름다움에 대한 인간의 복합적 감정을 조명하는 허스트의 전시.",
        tags: ["생명", "죽음", "믿음"],
        image: mmca3.url,
      },
    ],
    artwork: {
      badge: "작품 #1 도착",
      title: "자연의 거울",
      meta: [
        { k: "작가", v: "데이미언 허스트" },
        { k: "연도", v: "1991" },
        { k: "기법", v: "혼합 매체" },
      ],
      description:
        "유리 진열장 속 상어를 통해 삶과 죽음의 경계를 직시하게 하는 현대 회화·설치 작품. 가까이에서 색면과 질감을 천천히 살펴보세요.",
      nextStep: "초록 길을 따라 다음 전시실로 이동하세요 (약 50초).",
    },
  },
];