import jungangImg from "@/assets/museum.png.asset.json";
import mmcaImg from "@/assets/mmca-museum.png.asset.json";
import myeongpumImg from "@/assets/exhibit-myeongpum.png.asset.json";
import koreanImg from "@/assets/exhibit-korean.png.asset.json";
import mmca1 from "@/assets/mmca-poster-1.png.asset.json";
import mmca2 from "@/assets/mmca-poster-2.png.asset.json";
import mmca3 from "@/assets/mmca-poster-3.png.asset.json";

/** 작품 중요도 등급 — 시간 맞춤 추천의 핵심 기준
 *  must   : 그 전시의 핵심 대표작. 30분 짧은 코스에도 무조건 포함
 *  rec    : 시간 여유 있으면 보면 좋은 작품 (1~2시간 코스에 추가)
 *  option : 2시간 + 풀코스에서만 포함 */
export type Tier = "must" | "rec" | "option";

export type Artwork = {
  id: string;
  /** 명품 30선 카탈로그 번호 (없으면 0) */
  no: number;
  title: string;
  tier: Tier;
  /** 동선 정렬용 — 1·2·3층 */
  floor: number;
  /** 동선 정렬용 — 전시실 번호 (작을수록 먼저) */
  room: number;
  /** 화면 표시용 위치 — 예: "2층 · 사유의 방" */
  place: string;
  /** 국보 / 보물 등 지정 표시 (없으면 생략) */
  treasure?: string;
  meta: { k: string; v: string }[];
  description: string;
  /** 감상 소요 시간(분). 비우면 등급별 기본값 사용 */
  viewMinutes?: number;
};

export type Exhibit = {
  id: string;
  title: string;
  subtitle: string;
  blurb: string;
  tags: string[];
  image: string;
  artworks: Artwork[];
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
};

/** 국립중앙박물관 「명품 30선」 — 박물관 추천 동선(museum.go.kr) + 전시안내 리플렛 기준.
 *  층/전시실 위치는 리플렛 평면도, 작품 정보는 박물관 명품30선 페이지를 따랐습니다. */
const MYEONGPUM_30: Artwork[] = [
  {
    id: "jumeokdokki",
    no: 1,
    title: "주먹도끼",
    tier: "option",
    floor: 1,
    room: 101,
    place: "1층 · 선사고대관 구석기실",
    meta: [
      { k: "시대", v: "구석기" },
      { k: "출토", v: "연천 전곡리" },
      { k: "재질", v: "석기" },
    ],
    description:
      "세계 구석기 문화사를 바꾼 연천 전곡리 주먹도끼예요. 한 손에 쥐고 자르고 찍던, 인류의 가장 오래된 도구 중 하나랍니다.",
  },
  {
    id: "bitsalmunui",
    no: 2,
    title: "빗살무늬 토기",
    tier: "rec",
    floor: 1,
    room: 102,
    place: "1층 · 선사고대관 신석기실",
    meta: [
      { k: "시대", v: "신석기" },
      { k: "출토", v: "서울 암사동" },
      { k: "재질", v: "흙" },
    ],
    description:
      "뾰족한 바닥에 빗살무늬를 새긴 신석기 시대의 대표 토기예요. 강가 모래에 꽂아 두고 곡식과 음식을 저장했답니다.",
  },
  {
    id: "nonggyeongmun",
    no: 3,
    title: "농경문 청동기",
    tier: "option",
    floor: 1,
    room: 103,
    place: "1층 · 선사고대관 청동기실",
    meta: [
      { k: "시대", v: "초기철기" },
      { k: "재질", v: "청동" },
      { k: "주제", v: "농경 의례" },
    ],
    description:
      "밭을 갈고 수확하는 모습이 새겨진 작은 청동기예요. 풍요를 비는 의례에 쓰였던 것으로 보입니다.",
  },
  {
    id: "dahori",
    no: 4,
    title: "창원 다호리 1호 무덤 출토품",
    tier: "option",
    floor: 1,
    room: 104,
    place: "1층 · 선사고대관 고조선·삼한실",
    meta: [
      { k: "시대", v: "초기철기" },
      { k: "재질", v: "청동·철" },
      { k: "성격", v: "변한 수장" },
    ],
    description:
      "변한 지배자의 무덤에서 나온 칠기·붓·동전 묶음이에요. 이미 이 시기에 글을 쓰고 교역했음을 보여 줍니다.",
  },
  {
    id: "howu",
    no: 5,
    title: "호우 글자 청동 그릇",
    tier: "option",
    floor: 1,
    room: 105,
    place: "1층 · 선사고대관 고구려실",
    meta: [
      { k: "시대", v: "고구려" },
      { k: "출토", v: "경주 호우총" },
      { k: "재질", v: "청동" },
    ],
    description:
      "바닥에 광개토대왕을 기리는 글자가 새겨진 그릇이에요. 고구려와 신라의 교류를 알려 주는 귀한 자료입니다.",
  },
  {
    id: "gwankkumigae",
    no: 6,
    title: "관꾸미개 (금제)",
    tier: "option",
    floor: 1,
    room: 106,
    place: "1층 · 선사고대관 백제실",
    treasure: "국보",
    meta: [
      { k: "시대", v: "백제" },
      { k: "출토", v: "무령왕릉" },
      { k: "재질", v: "금" },
    ],
    description:
      "무령왕릉에서 나온 금제 관 장식이에요. 불꽃처럼 솟아오른 무늬에서 백제 금속공예의 우아함이 느껴집니다.",
  },
  {
    id: "gaya-gabot",
    no: 7,
    title: "가야 갑옷",
    tier: "option",
    floor: 1,
    room: 107,
    place: "1층 · 선사고대관 가야실",
    meta: [
      { k: "시대", v: "삼국" },
      { k: "출토", v: "고령 지산동" },
      { k: "재질", v: "철" },
    ],
    description:
      "철판을 이어 만든 가야의 갑옷과 투구예요. 철을 자유롭게 다루던 가야의 뛰어난 기술을 보여 줍니다.",
  },
  {
    id: "geumgwan",
    no: 8,
    title: "금관과 금허리띠",
    tier: "must",
    floor: 1,
    room: 107,
    place: "1층 · 선사고대관 신라실",
    treasure: "국보",
    meta: [
      { k: "시대", v: "신라" },
      { k: "재질", v: "금" },
      { k: "상징", v: "신라 왕권" },
    ],
    description:
      "나뭇가지와 사슴뿔 모양으로 솟은 신라 금관이에요. 곱은옥과 금붙이가 빛나는, 신라 왕실의 권위를 상징하는 최고의 보물입니다.",
  },
  {
    id: "gyeongcheonsa",
    no: 9,
    title: "경천사 십층석탑",
    tier: "rec",
    floor: 1,
    room: 113,
    place: "1층 · 역사의 길",
    treasure: "국보",
    meta: [
      { k: "시대", v: "고려 1348" },
      { k: "재질", v: "대리석" },
      { k: "높이", v: "13.5m" },
    ],
    description:
      "박물관 중앙을 꿰뚫고 선 13.5m의 대리석 탑이에요. 1층에서도, 위층에서도 올려다보이는 명품 30선의 랜드마크입니다.",
  },
  {
    id: "cheolbul",
    no: 10,
    title: "철불 좌상",
    tier: "option",
    floor: 1,
    room: 111,
    place: "1층 · 선사고대관 통일신라실",
    meta: [
      { k: "시대", v: "통일신라" },
      { k: "재질", v: "철" },
      { k: "특징", v: "현존 최고(最古)" },
    ],
    description:
      "우리나라에 남아 있는 가장 오래된 철불 가운데 하나예요. 묵직한 철의 질감 속에서도 부처의 온화함이 살아 있습니다.",
  },
  {
    id: "daejanggyeong",
    no: 11,
    title: "재조대장경 인쇄 경전",
    tier: "option",
    floor: 1,
    room: 114,
    place: "1층 · 중근세관 고려실",
    meta: [
      { k: "시대", v: "고려" },
      { k: "재질", v: "종이" },
      { k: "관련", v: "팔만대장경" },
    ],
    description:
      "팔만대장경 경판으로 찍어 낸 불교 경전이에요. 한 글자도 틀림없는 정교함에서 고려 인쇄 문화의 깊이가 느껴집니다.",
  },
  {
    id: "eulhaeja",
    no: 12,
    title: "을해자 한글 금속활자",
    tier: "rec",
    floor: 1,
    room: 117,
    place: "1층 · 중근세관 조선실",
    meta: [
      { k: "시대", v: "조선 1461" },
      { k: "재질", v: "금속" },
      { k: "의미", v: "현존 최고 한글활자" },
    ],
    description:
      "현재 남아 있는 가장 오래된 한글 금속활자예요. 만든 지 얼마 안 된 한글을 활자로 찍어 널리 퍼뜨리려 했던 노력이 담겨 있습니다.",
  },
  {
    id: "daedongyeojido",
    no: 13,
    title: "대동여지도 목판",
    tier: "rec",
    floor: 1,
    room: 119,
    place: "1층 · 중근세관 조선실",
    treasure: "보물",
    meta: [
      { k: "시대", v: "조선 1861" },
      { k: "제작", v: "김정호" },
      { k: "재질", v: "나무" },
    ],
    description:
      "김정호가 우리나라 전체를 새긴 지도 목판이에요. 이 판을 찍고 이어 붙이면 6m가 넘는 전국 지도가 완성됩니다.",
  },
  {
    id: "uigwe",
    no: 14,
    title: "외규장각 의궤",
    tier: "option",
    floor: 2,
    room: 201,
    place: "2층 · 서화관 의궤실",
    meta: [
      { k: "시대", v: "조선" },
      { k: "재질", v: "종이" },
      { k: "성격", v: "왕실 기록화" },
    ],
    description:
      "왕실의 중요한 행사를 그림과 글로 꼼꼼히 남긴 기록이에요. 프랑스에 있다 돌아온, 조선 기록문화의 정수입니다.",
  },
  {
    id: "chikmyeongjibo",
    no: 15,
    title: "칙명지보 (황제의 인장)",
    tier: "option",
    floor: 1,
    room: 120,
    place: "1층 · 중근세관 대한제국실",
    meta: [
      { k: "시대", v: "대한제국" },
      { k: "재질", v: "금속" },
      { k: "용도", v: "황제 어보" },
    ],
    description:
      "대한제국 황제의 명령에 찍던 도장이에요. 조선이 황제의 나라로 나아가려 했던 시대를 증언합니다.",
  },
  {
    id: "taejasa-bi",
    no: 16,
    title: "태자사 낭공대사 비석",
    tier: "option",
    floor: 2,
    room: 201,
    place: "2층 · 서화관 서화실",
    meta: [
      { k: "글씨", v: "김생 집자" },
      { k: "시대", v: "신라·고려" },
      { k: "재질", v: "돌" },
    ],
    description:
      "신라 명필 김생의 글씨를 모아 새긴 비석이에요. 천 년 전 글씨의 힘과 멋을 그대로 느낄 수 있습니다.",
  },
  {
    id: "nosongdo",
    no: 17,
    title: "노송도",
    tier: "option",
    floor: 2,
    room: 202,
    place: "2층 · 서화관 서화실",
    meta: [
      { k: "작가", v: "강세황" },
      { k: "시대", v: "조선" },
      { k: "재질", v: "종이" },
    ],
    description:
      "굵은 노송을 시원하게 그려 낸 조선 후기 회화예요. 먹의 농담만으로 소나무의 기개를 담아냈습니다.",
  },
  {
    id: "byeonsangdo",
    no: 18,
    title: "변상도",
    tier: "option",
    floor: 2,
    room: 203,
    place: "2층 · 서화관 불교회화실",
    meta: [
      { k: "시대", v: "고려" },
      { k: "재질", v: "종이" },
      { k: "주제", v: "경전 그림" },
    ],
    description:
      "경전의 내용을 정밀한 선으로 그린 고려 불교 그림이에요. 금니로 그은 가는 선에서 고려 불화의 섬세함이 빛납니다.",
  },
  {
    id: "najeon-sangja",
    no: 19,
    title: "나전 칠 연꽃넝쿨무늬 옷상자",
    tier: "option",
    floor: 2,
    room: 204,
    place: "2층 · 서화관 목칠공예실",
    treasure: "보물",
    meta: [
      { k: "시대", v: "조선" },
      { k: "재질", v: "나전·옻칠" },
      { k: "기법", v: "자개 상감" },
    ],
    description:
      "옻칠 위에 자개를 박아 연꽃넝쿨을 수놓은 옷상자예요. 빛에 따라 영롱하게 반짝이는 자개의 멋이 일품입니다.",
  },
  {
    id: "songgijeong-tugu",
    no: 20,
    title: "손기정 기증 청동 투구",
    tier: "rec",
    floor: 2,
    room: 208,
    place: "2층 · 기증관 기증문화재실",
    treasure: "보물",
    meta: [
      { k: "시대", v: "고대 그리스" },
      { k: "기증", v: "손기정" },
      { k: "재질", v: "청동" },
    ],
    description:
      "베를린 올림픽 마라톤 우승자 손기정 선수가 받은 그리스 청동 투구예요. 오랜 세월을 돌아 우리 곁에 온 감동적인 사연을 품고 있습니다.",
  },
  {
    id: "gamsansa",
    no: 21,
    title: "감산사 미륵보살·아미타불",
    tier: "rec",
    floor: 3,
    room: 301,
    place: "3층 · 조각공예관 불교조각실",
    treasure: "국보",
    meta: [
      { k: "시대", v: "통일신라 719" },
      { k: "재질", v: "화강암" },
      { k: "성격", v: "발원 조상" },
    ],
    description:
      "만든 시기와 사연이 또렷이 새겨진 통일신라의 두 불상이에요. 풍만하고 자비로운 모습에서 신라 조각의 절정이 보입니다.",
  },
  {
    id: "bangasayusang",
    no: 22,
    title: "금동 반가사유상",
    tier: "must",
    floor: 2,
    room: 209,
    place: "2층 · 사유의 방",
    treasure: "국보 제83호",
    meta: [
      { k: "시대", v: "삼국 7C" },
      { k: "재질", v: "금동" },
      { k: "공간", v: "사유의 방" },
    ],
    description:
      "한쪽 다리를 올리고 깊은 생각에 잠긴 보살이에요. 어둑한 '사유의 방'에서 마주하는 그 미소는 한국 불교 조각의 정수로 꼽힙니다. 천천히 머무르며 바라보세요.",
    viewMinutes: 10,
  },
  {
    id: "jeongbyeong",
    no: 23,
    title: "물가풍경무늬 정병",
    tier: "option",
    floor: 3,
    room: 302,
    place: "3층 · 조각공예관 금속공예실",
    treasure: "국보",
    meta: [
      { k: "시대", v: "고려" },
      { k: "재질", v: "청동·은입사" },
      { k: "용도", v: "정수 그릇" },
    ],
    description:
      "은실을 박아 물가 풍경을 그린 고려의 물병이에요. 버드나무와 오리가 노니는 한 폭의 그림이 금속 위에 펼쳐집니다.",
  },
  {
    id: "chilbo-hyangno",
    no: 24,
    title: "청자 칠보무늬 향로",
    tier: "rec",
    floor: 3,
    room: 303,
    place: "3층 · 조각공예관 청자실",
    treasure: "국보 제95호",
    meta: [
      { k: "시대", v: "고려" },
      { k: "재질", v: "청자" },
      { k: "기법", v: "투각·상감" },
    ],
    description:
      "토끼 세 마리가 떠받친 비취색 고려청자 향로예요. 뚜껑의 투각 장식과 영롱한 빛깔은 고려청자를 대표하는 명품입니다.",
  },
  {
    id: "jara-byeong",
    no: 25,
    title: "분청사기 모란무늬 자라병",
    tier: "option",
    floor: 3,
    room: 304,
    place: "3층 · 조각공예관 분청사기실",
    treasure: "보물",
    meta: [
      { k: "시대", v: "조선" },
      { k: "재질", v: "분청사기" },
      { k: "무늬", v: "모란" },
    ],
    description:
      "자라를 닮은 둥근 병에 모란을 활달하게 그린 분청사기예요. 꾸밈없이 자유로운 붓질이 분청만의 멋을 보여 줍니다.",
  },
  {
    id: "dalhangari",
    no: 26,
    title: "백자 달항아리",
    tier: "must",
    floor: 3,
    room: 305,
    place: "3층 · 조각공예관 백자실",
    treasure: "국보",
    meta: [
      { k: "시대", v: "조선 18C" },
      { k: "재질", v: "백자" },
      { k: "별칭", v: "달항아리" },
    ],
    description:
      "보름달처럼 둥글고 넉넉한 조선 백자예요. 위아래를 따로 빚어 붙여 살짝 비뚤어진 곡선이 오히려 정겨운, 한국미의 상징입니다.",
  },
  {
    id: "bokhui-yeowa",
    no: 27,
    title: "창조신 복희와 여와",
    tier: "option",
    floor: 3,
    room: 307,
    place: "3층 · 세계문화관 중앙아시아실",
    meta: [
      { k: "지역", v: "중앙아시아" },
      { k: "재질", v: "삼베" },
      { k: "주제", v: "창조 신화" },
    ],
    description:
      "상반신은 사람, 하반신은 뱀으로 얽힌 두 창조신을 그린 그림이에요. 멀리 실크로드 너머의 신화를 전해 줍니다.",
  },
  {
    id: "bosal",
    no: 28,
    title: "보살",
    tier: "option",
    floor: 3,
    room: 308,
    place: "3층 · 세계문화관 인도·동남아시아실",
    meta: [
      { k: "지역", v: "간다라(인도)" },
      { k: "재질", v: "돌" },
      { k: "특징", v: "그리스 영향" },
    ],
    description:
      "그리스 조각의 영향이 묻어나는 간다라 보살상이에요. 동서양 문화가 만나 탄생한 불교 미술의 출발점을 보여 줍니다.",
  },
  {
    id: "kkot-jujeonja",
    no: 29,
    title: "꽃 과일무늬 주전자",
    tier: "option",
    floor: 3,
    room: 309,
    place: "3층 · 세계문화관 중국실",
    meta: [
      { k: "지역", v: "중국(송)" },
      { k: "재질", v: "백자" },
      { k: "무늬", v: "꽃·과일" },
    ],
    description:
      "푸른 안료로 꽃과 과일을 그린 중국 도자 주전자예요. 고려·조선 도자에도 영향을 준 청화백자의 멋을 볼 수 있습니다.",
  },
  {
    id: "genji",
    no: 30,
    title: "겐지모노가타리 화첩",
    tier: "option",
    floor: 3,
    room: 310,
    place: "3층 · 세계문화관 일본실",
    meta: [
      { k: "지역", v: "일본(에도)" },
      { k: "재질", v: "종이" },
      { k: "주제", v: "고전 문학" },
    ],
    description:
      "일본 고전 『겐지 이야기』의 장면을 그린 화첩이에요. 화려한 채색과 금박에서 에도 시대 회화의 정취가 느껴집니다.",
  },
];

/** 국립중앙박물관 「한국 문화의 독창성 24선」 — 박물관 추천 동선(museum.go.kr) + 리플렛 평면도 기준 */
const KOREAN_24: Artwork[] = [
  {
    id: "k-jumeokdokki",
    no: 1,
    title: "주먹도끼",
    tier: "option",
    floor: 1,
    room: 101,
    place: "1층 · 선사고대관 구석기실",
    meta: [
      { k: "시대", v: "구석기" },
      { k: "출토", v: "연천 전곡리" },
    ],
    description: "세계 구석기 문화사를 바꾼 연천 전곡리의 주먹도끼예요. 인류 가장 오래된 도구의 하나입니다.",
  },
  {
    id: "k-bitsalmunui",
    no: 2,
    title: "빗살무늬 토기",
    tier: "rec",
    floor: 1,
    room: 102,
    place: "1층 · 선사고대관 신석기실",
    meta: [
      { k: "시대", v: "신석기" },
      { k: "출토", v: "서울 암사동" },
    ],
    description: "빗살무늬를 새긴 신석기의 대표 발명품이에요. 정착 생활과 저장이 시작됐음을 보여 줍니다.",
  },
  {
    id: "k-sehyeong-geom",
    no: 3,
    title: "세형 동검",
    tier: "option",
    floor: 1,
    room: 104,
    place: "1층 · 선사고대관 고조선·삼한실",
    meta: [
      { k: "시대", v: "초기철기" },
      { k: "재질", v: "청동" },
    ],
    description: "한국식 동검이라 불리는 가늘고 날렵한 청동검이에요. 한반도만의 독자적인 청동기 문화를 상징합니다.",
  },
  {
    id: "k-janmunui-geoul",
    no: 4,
    title: "잔무늬 거울",
    tier: "rec",
    floor: 1,
    room: 104,
    place: "1층 · 선사고대관 고조선·삼한실",
    treasure: "국보",
    meta: [
      { k: "시대", v: "초기철기" },
      { k: "지름", v: "10.5cm" },
    ],
    description: "머리카락보다 가는 선을 수천 개 새긴 청동거울이에요. 오늘날 기술로도 재현이 어려운, 청동기 제작 기술의 정점입니다.",
  },
  {
    id: "k-cheongdong-bangul",
    no: 5,
    title: "청동 방울",
    tier: "option",
    floor: 1,
    room: 104,
    place: "1층 · 선사고대관 고조선·삼한실",
    meta: [
      { k: "시대", v: "청동기" },
      { k: "용도", v: "제사 의례" },
    ],
    description: "제사장이 의식 때 흔들던 화려한 청동 방울이에요. 소리로 하늘과 사람을 잇던 도구입니다.",
  },
  {
    id: "k-sujeong-mokgeori",
    no: 6,
    title: "수정 목걸이",
    tier: "option",
    floor: 1,
    room: 104,
    place: "1층 · 선사고대관 삼한·가야실",
    meta: [
      { k: "시대", v: "가야" },
      { k: "재질", v: "수정" },
    ],
    description: "금·은보다 귀하게 여겨졌던 맑은 수정을 꿰어 만든 목걸이예요. 당시 사람들의 미감과 위세를 보여 줍니다.",
  },
  {
    id: "k-gangseodaemyo",
    no: 7,
    title: "강서대묘 모사도",
    tier: "rec",
    floor: 1,
    room: 105,
    place: "1층 · 선사고대관 고구려실",
    meta: [
      { k: "시대", v: "고구려" },
      { k: "주제", v: "사신도" },
    ],
    description: "고구려 무덤 벽화를 그대로 옮겨 그린 그림이에요. 사신(四神)에 담긴 고구려 사람들의 정신세계를 만날 수 있습니다.",
  },
  {
    id: "k-sansumunui-byeokdol",
    no: 8,
    title: "산수무늬 벽돌",
    tier: "rec",
    floor: 1,
    room: 106,
    place: "1층 · 선사고대관 백제실",
    treasure: "보물",
    meta: [
      { k: "시대", v: "백제" },
      { k: "주제", v: "산수" },
    ],
    description: "산과 구름을 부드럽게 새긴 백제의 벽돌이에요. 불교와 도교가 만난 백제인의 이상향이 담겨 있습니다.",
  },
  {
    id: "k-mineulsoe",
    no: 9,
    title: "미늘쇠",
    tier: "option",
    floor: 1,
    room: 107,
    place: "1층 · 선사고대관 가야실",
    meta: [
      { k: "시대", v: "가야" },
      { k: "재질", v: "철" },
    ],
    description: "새 모양 장식을 단 의례용 철기예요. 철을 자유자재로 다루던 가야 기술력의 상징입니다.",
  },
  {
    id: "k-geumgwan",
    no: 10,
    title: "금관과 금허리띠",
    tier: "must",
    floor: 1,
    room: 107,
    place: "1층 · 선사고대관 신라실",
    treasure: "국보",
    meta: [
      { k: "시대", v: "신라" },
      { k: "재질", v: "금" },
      { k: "높이", v: "49.2cm" },
    ],
    description: "나뭇가지와 곱은옥이 빛나는 신라 금관이에요. '황금의 나라' 신라를 상징하는 최고의 보물입니다.",
  },
  {
    id: "k-silla-togi",
    no: 11,
    title: "신라 토기",
    tier: "option",
    floor: 1,
    room: 107,
    place: "1층 · 선사고대관 신라실",
    meta: [
      { k: "시대", v: "신라" },
      { k: "재질", v: "흙" },
    ],
    description: "굽다리와 토우로 장식한 신라만의 토기예요. 단단하게 구워 낸 회색빛에서 독창적 미감이 느껴집니다.",
  },
  {
    id: "k-sibijisang",
    no: 12,
    title: "십이지상",
    tier: "option",
    floor: 1,
    room: 111,
    place: "1층 · 선사고대관 통일신라실",
    meta: [
      { k: "시대", v: "통일신라" },
      { k: "재질", v: "돌" },
    ],
    description: "쥐·소·호랑이 등 열두 동물을 사람 몸에 새긴 수호상이에요. 무덤을 지키던 통일신라의 독특한 조각입니다.",
  },
  {
    id: "k-sutgarak",
    no: 13,
    title: "숟가락",
    tier: "option",
    floor: 1,
    room: 113,
    place: "1층 · 중근세관 고려실",
    meta: [
      { k: "시대", v: "고려" },
      { k: "재질", v: "청동" },
    ],
    description: "버들잎처럼 휜 고려의 청동 숟가락이에요. 숟가락을 즐겨 쓰던 우리 식문화의 오랜 내력을 보여 줍니다.",
  },
  {
    id: "k-yongbieocheonga",
    no: 14,
    title: "용비어천가",
    tier: "must",
    floor: 1,
    room: 117,
    place: "1층 · 중근세관 조선실",
    meta: [
      { k: "시대", v: "조선 1445" },
      { k: "의미", v: "한글 최초의 책" },
    ],
    description: "한글로 엮은 최초의 책이에요. 갓 만든 한글로 노래 125장을 지어, 우리 글의 첫걸음을 알린 기념비적 책입니다.",
  },
  {
    id: "k-uigwe",
    no: 15,
    title: "외규장각 의궤",
    tier: "rec",
    floor: 2,
    room: 201,
    place: "2층 · 서화관 의궤실",
    meta: [
      { k: "시대", v: "조선" },
      { k: "성격", v: "왕실 기록화" },
    ],
    description: "왕실 행사를 그림과 글로 꼼꼼히 남긴 기록이에요. 프랑스에서 돌아온, 조선 기록문화의 정수입니다.",
  },
  {
    id: "k-eopil-seokgak",
    no: 16,
    title: "어필석각",
    tier: "option",
    floor: 2,
    room: 202,
    place: "2층 · 서화관 서화실",
    meta: [
      { k: "시대", v: "조선" },
      { k: "주제", v: "임금의 글씨" },
    ],
    description: "조선 임금들의 글씨를 돌에 새긴 석각이에요. 왕의 친필에서 시대마다의 기품을 엿볼 수 있습니다.",
  },
  {
    id: "k-gwaebul",
    no: 17,
    title: "괘불",
    tier: "rec",
    floor: 2,
    room: 203,
    place: "2층 · 서화관 불교회화실",
    treasure: "보물",
    meta: [
      { k: "시대", v: "조선" },
      { k: "크기", v: "9m 이상" },
    ],
    description: "법당 밖 야외 의식에 내걸던 거대한 불화예요. 9m가 넘는 화면 가득 부처를 그린 압도적인 그림입니다.",
  },
  {
    id: "k-hwagak-ham",
    no: 18,
    title: "화각 함",
    tier: "option",
    floor: 2,
    room: 204,
    place: "2층 · 서화관 목칠공예실",
    meta: [
      { k: "시대", v: "조선" },
      { k: "기법", v: "화각" },
    ],
    description: "쇠뿔을 얇게 펴 그림을 그려 붙인 한국만의 공예품이에요. 알록달록한 빛깔이 정겨운 독창적 기법입니다.",
  },
  {
    id: "k-buddha-bosal",
    no: 19,
    title: "부처와 보살상",
    tier: "option",
    floor: 3,
    room: 301,
    place: "3층 · 조각공예관 불교조각실",
    meta: [
      { k: "시대", v: "조선" },
      { k: "재질", v: "금동" },
    ],
    description: "수송사에서 나온 소박하고 인간적인 작은 불상들이에요. 친근한 표정에서 조선 불교 조각의 따뜻함이 느껴집니다.",
  },
  {
    id: "k-cheonheungsa-jong",
    no: 20,
    title: "천흥사 종",
    tier: "rec",
    floor: 3,
    room: 302,
    place: "3층 · 조각공예관 금속공예실",
    treasure: "국보",
    meta: [
      { k: "시대", v: "고려 1010" },
      { k: "특징", v: "가장 오래된 고려 종" },
    ],
    description: "지금 남아 있는 가장 오래된 고려 시대 종이에요. 비천상이 새겨진 몸체에서 맑고 긴 울림이 퍼져 나옵니다.",
  },
  {
    id: "k-moran-maebyeong",
    no: 21,
    title: "모란무늬 매병",
    tier: "rec",
    floor: 3,
    room: 303,
    place: "3층 · 조각공예관 청자실",
    meta: [
      { k: "시대", v: "고려" },
      { k: "재질", v: "청자" },
    ],
    description: "붉은빛 모란무늬가 돋보이는 고려청자 매병이에요. 비취색 바탕 위 화사한 무늬가 고려청자의 멋을 보여 줍니다.",
  },
  {
    id: "k-moran-byedul-maebyeong",
    no: 22,
    title: "모란 버들 갈대무늬 매병",
    tier: "option",
    floor: 3,
    room: 303,
    place: "3층 · 조각공예관 청자·백자실",
    meta: [
      { k: "시대", v: "고려" },
      { k: "기법", v: "상감" },
    ],
    description: "모란·버들·갈대를 상감으로 새긴 매병이에요. 청자와 백자 기법이 어우러진 우아한 곡선이 일품입니다.",
  },
  {
    id: "k-mulgogi-janggun",
    no: 23,
    title: "물고기무늬 장군",
    tier: "option",
    floor: 3,
    room: 304,
    place: "3층 · 조각공예관 분청사기실",
    meta: [
      { k: "시대", v: "조선" },
      { k: "재질", v: "분청사기" },
    ],
    description: "옆으로 누운 장군병에 물고기를 생동감 있게 그린 분청사기예요. 거침없는 붓질이 한국적 활달함을 보여 줍니다.",
  },
  {
    id: "k-kkeunmunui-byeong",
    no: 24,
    title: "끈무늬 병",
    tier: "must",
    floor: 3,
    room: 305,
    place: "3층 · 조각공예관 백자실",
    treasure: "보물",
    meta: [
      { k: "시대", v: "조선" },
      { k: "재질", v: "백자" },
    ],
    description: "병목에 끈 하나를 툭 둘러 그린 조선 백자예요. 여백을 살린 단순한 붓질에서 조선의 절제미가 빛납니다.",
  },
];

// MMCA 전시 작품 데이터는 아직 확정 출처가 없어 비워 둡니다.
// 실제 작품 리스트가 확보되면 명품30선/24선과 같은 형식으로 채우세요. (임의 작품 추가 금지)

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
        blurb: "고려청자 · 금관 · 반가사유상 등 국보급 명품 30점을 한 동선으로",
        tags: ["국보", "도자기", "불교 조각"],
        image: myeongpumImg.url,
        artworks: MYEONGPUM_30,
      },
      {
        id: "korean24",
        title: "한국 문화의 독창성 24선",
        subtitle: "Uniquely Korean · 24 works",
        blurb: "한글 · 백자 · 민속 조각으로 보는 한국만의 시선",
        tags: ["민속", "한글", "회화"],
        image: koreanImg.url,
        artworks: KOREAN_24,
      },
    ],
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
        artworks: [],
      },
      {
        id: "tamjeong",
        title: "MMCA 다원예술 2026: 탐정의 시간",
        subtitle: "Deep Time, Chasing Clues",
        blurb:
          "AI의 효율성에 대비하여, 탐정처럼 미세한 단서를 쫓으며 인간 고유의 깊고 느린 시간을 감각하는 다원예술 프로젝트.",
        tags: ["탐정", "깊은", "시간"],
        image: mmca2.url,
        artworks: [],
      },
      {
        id: "hirst",
        title: "데이미언 허스트",
        subtitle: "Damien Hirst",
        blurb: "삶과 죽음, 아름다움에 대한 인간의 복합적 감정을 조명하는 허스트의 전시.",
        tags: ["생명", "죽음", "믿음"],
        image: mmca3.url,
        artworks: [],
      },
    ],
  },
];
