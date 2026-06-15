import type { Artwork, Tier } from "./museums";

/** 관람 시간(분) 예산. "120+"는 전체 코스 */
const BUDGET: Record<string, number> = {
  "30": 30,
  "60": 60,
  "120": 120,
  "120+": Infinity,
};

/** 등급별 기본 감상 시간(분). 작품에 viewMinutes가 있으면 그 값을 우선 사용.
 *  option 값을 키우면 2시간 코스의 작품 수가 줄고, 줄이면 늘어난다. */
const VIEW_MINUTES: Record<Tier, number> = {
  must: 8,
  rec: 6,
  option: 6,
};

/** 작품 사이 이동 시간(분) */
const WALK_MINUTES = 2;
/** 층이 바뀔 때 추가되는 이동 시간(분) */
const FLOOR_CHANGE_MINUTES = 1.5;

const TIER_RANK: Record<Tier, number> = { must: 0, rec: 1, option: 2 };

const viewMin = (a: Artwork) => a.viewMinutes ?? VIEW_MINUTES[a.tier];

/** 동선 정렬 키 — 층 → 전시실 번호 순 (실제 관람 동선) */
const routeKey = (a: Artwork) => a.floor * 1000 + a.room;

/** 한 작품을 추가할 때 드는 시간(이동 포함) */
function stepCost(art: Artwork, prev: Artwork | null) {
  if (!prev) return viewMin(art);
  const floorChange = prev.floor !== art.floor ? FLOOR_CHANGE_MINUTES : 0;
  return viewMin(art) + WALK_MINUTES + floorChange;
}

export type Recommendation = {
  /** 실제 관람 순서(층·실 순)대로 정렬된 추천 작품 */
  route: Artwork[];
  count: number;
  /** 예상 소요 시간(분, 반올림) */
  minutes: number;
  /** 전체 작품 수 (이 전시의 총 작품) */
  total: number;
};

/**
 * 관람 시간 예산에 맞춰 작품을 추천한다.
 * 1) 중요도(must→rec→option) 순으로, 시간 예산 안에서 담는다. (필수 작품은 항상 포함)
 * 2) 고른 작품을 실제 동선(층·실) 순서로 다시 정렬해 돌려준다.
 */
export function recommendRoute(artworks: Artwork[], durationId: string | null): Recommendation {
  const budget = durationId ? (BUDGET[durationId] ?? Infinity) : Infinity;

  // 중요도 우선, 같은 등급이면 동선 순서로 후보 정렬
  const candidates = [...artworks].sort(
    (a, b) => TIER_RANK[a.tier] - TIER_RANK[b.tier] || routeKey(a) - routeKey(b),
  );

  const picked: Artwork[] = [];
  let time = 0;
  // 담은 작품을 동선 순으로 보면서 비용을 계산하기 위해, 매 단계 동선 정렬 후 재측정
  for (const art of candidates) {
    const trial = [...picked, art].sort((a, b) => routeKey(a) - routeKey(b));
    let trialTime = 0;
    for (let i = 0; i < trial.length; i++) {
      trialTime += stepCost(trial[i], i === 0 ? null : trial[i - 1]);
    }
    if (art.tier === "must" || trialTime <= budget) {
      picked.push(art);
      time = trialTime;
    }
  }

  const route = picked.sort((a, b) => routeKey(a) - routeKey(b));
  return {
    route,
    count: route.length,
    minutes: Math.round(time),
    total: artworks.length,
  };
}

/** 등급 표시용 라벨 */
export const TIER_LABEL: Record<Tier, string> = {
  must: "필수",
  rec: "추천",
  option: "선택",
};
