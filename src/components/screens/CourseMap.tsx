import type { Artwork } from "./museums";

/** 국립중앙박물관 평면도(리플렛 기준)를 단순화한 SVG 지도.
 *  각 층은 [왼쪽 날개 · 중앙 복도 · 오른쪽 날개] 구조다.
 *  배열 순서 = 위에서 아래로 표시되는 순서. */
type Room = { room: number; label: string };
type FloorDef = {
  floor: number;
  left: Room[];
  right: Room[];
  landmark?: string; // 중앙 홀 랜드마크 (예: 경천사 십층석탑)
  entrance?: boolean; // 1층 입구 표시
};

const PLAN: FloorDef[] = [
  {
    floor: 1,
    landmark: "경천사 십층석탑",
    entrance: true,
    left: [
      { room: 113, label: "고려" },
      { room: 114, label: "고려" },
      { room: 117, label: "조선" },
      { room: 119, label: "조선" },
      { room: 120, label: "대한제국" },
    ],
    right: [
      { room: 111, label: "통일신라" },
      { room: 107, label: "신라·가야" },
      { room: 106, label: "백제" },
      { room: 105, label: "고구려" },
      { room: 104, label: "고조선·삼한" },
      { room: 103, label: "청동기" },
      { room: 102, label: "신석기" },
      { room: 101, label: "구석기" },
    ],
  },
  {
    floor: 2,
    left: [
      { room: 204, label: "목칠공예" },
      { room: 203, label: "불교회화" },
      { room: 202, label: "서화" },
      { room: 201, label: "의궤·서화" },
    ],
    right: [
      { room: 208, label: "기증문화재" },
      { room: 209, label: "사유의 방" },
    ],
  },
  {
    floor: 3,
    left: [
      { room: 301, label: "불교조각" },
      { room: 302, label: "금속공예" },
      { room: 303, label: "청자" },
      { room: 304, label: "분청사기" },
      { room: 305, label: "백자" },
    ],
    right: [
      { room: 310, label: "일본" },
      { room: 309, label: "중국" },
      { room: 308, label: "인도·동남아" },
      { room: 307, label: "중앙아시아" },
    ],
  },
];

const roomKey = (floor: number, room: number) => `${floor}-${room}`;

// SVG 레이아웃 상수 (viewBox 단위)
const VB_W = 200;
const ROOM_H = 26;
const GAP = 7;
const TOP = 46;
const BOT = 34;
const LEFT_X = 10;
const RIGHT_X = 114;
const ROOM_W = 76;

// 테마 색 (앱의 초록 계열과 맞춤)
const C = {
  course: "oklch(0.55 0.15 142)",
  courseDeep: "oklch(0.42 0.12 142)",
  courseText: "oklch(0.98 0.01 142)",
  room: "oklch(0.96 0.008 85)",
  roomStroke: "oklch(0.86 0.015 85)",
  roomText: "oklch(0.5 0.02 85)",
  corridor: "oklch(0.98 0.005 85)",
  outline: "oklch(0.82 0.02 85)",
  route: "oklch(0.45 0.13 142)",
  current: "oklch(0.83 0.14 92)",
  restBg: "oklch(0.95 0.03 350)",
  restStroke: "oklch(0.78 0.1 350)",
  rest: "oklch(0.58 0.14 350)",
};

/** 휴식 좌석(안락의자) 아이콘 — 중앙 복도에 배치 */
function RestSeat({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g transform={`translate(${cx} ${cy})`} aria-label="휴식 공간">
      <circle r={7.5} fill={C.restBg} stroke={C.restStroke} strokeWidth={0.6} />
      <rect x={-3.5} y={-3.4} width={7} height={2.2} rx={1} fill={C.rest} />
      <rect x={-3.5} y={-1.4} width={7} height={3} rx={1} fill={C.rest} />
      <rect x={-4.4} y={-3} width={1.6} height={4.6} rx={0.7} fill={C.rest} />
      <rect x={2.8} y={-3} width={1.6} height={4.6} rx={0.7} fill={C.rest} />
    </g>
  );
}

function floorHeight(f: FloorDef) {
  return TOP + Math.max(f.left.length, f.right.length) * (ROOM_H + GAP) + BOT;
}

function roomCenter(wing: "L" | "R", i: number) {
  const x = (wing === "L" ? LEFT_X : RIGHT_X) + ROOM_W / 2;
  const y = TOP + i * (ROOM_H + GAP) + ROOM_H / 2;
  return { x, y };
}

export function CourseMap({
  route,
  currentKey,
}: {
  route: Artwork[];
  /** AR에서 현재 보고 있는 작품의 전시실 (테두리 강조) */
  currentKey?: string;
}) {
  // 코스가 거치는 전시실을 방문 순서대로 번호 매김 (같은 방은 한 번만)
  const order = new Map<string, number>();
  let n = 0;
  for (const a of route) {
    const k = roomKey(a.floor, a.room);
    if (!order.has(k)) order.set(k, ++n);
  }

  // 코스에 포함된 층만 표시
  const floors = PLAN.filter((f) =>
    [...f.left, ...f.right].some((r) => order.has(roomKey(f.floor, r.room))),
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3 text-xs font-semibold text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <span className="size-3 rounded" style={{ backgroundColor: C.course }} /> 추천 코스
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-3 rounded border" style={{ backgroundColor: C.room, borderColor: C.roomStroke }} /> 그 외 전시실
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-3 rounded-full border" style={{ backgroundColor: C.restBg, borderColor: C.restStroke }} /> 휴식 공간
        </span>
      </div>

      {floors.map((f) => (
        <FloorPlan key={f.floor} floor={f} order={order} currentKey={currentKey} />
      ))}
    </div>
  );
}

function FloorPlan({
  floor,
  order,
  currentKey,
}: {
  floor: FloorDef;
  order: Map<string, number>;
  currentKey?: string;
}) {
  const H = floorHeight(floor);

  // 휴식 공간 표시 위치(중앙 복도). 리플렛에 방별 위치가 없어 적절히 배치.
  const restYs = [TOP + 34, H - BOT - 24];

  // 이 층에서 하이라이트된 방들을 방문 순서대로 → 경로 선
  const pathPoints = [
    ...floor.left.map((r, i) => ({ r, wing: "L" as const, i })),
    ...floor.right.map((r, i) => ({ r, wing: "R" as const, i })),
  ]
    .map((x) => {
      const ord = order.get(roomKey(floor.floor, x.r.room));
      return ord != null ? { ...roomCenter(x.wing, x.i), ord } : null;
    })
    .filter((p): p is { x: number; y: number; ord: number } => p != null)
    .sort((a, b) => a.ord - b.ord);

  const polyline = pathPoints.map((p) => `${p.x},${p.y}`).join(" ");

  const renderWing = (rooms: Room[], wing: "L" | "R") =>
    rooms.map((r, i) => {
      const k = roomKey(floor.floor, r.room);
      const ord = order.get(k);
      const on = ord != null;
      const current = currentKey === k;
      const x = wing === "L" ? LEFT_X : RIGHT_X;
      const y = TOP + i * (ROOM_H + GAP);
      return (
        <g key={r.room}>
          <rect
            x={x}
            y={y}
            width={ROOM_W}
            height={ROOM_H}
            rx={4}
            fill={on ? C.course : C.room}
            stroke={current ? C.current : on ? C.courseDeep : C.roomStroke}
            strokeWidth={current ? 2.5 : 1}
          />
          <text
            x={x + ROOM_W / 2}
            y={y + ROOM_H / 2 + 0.5}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="9.5"
            fontWeight={on ? 700 : 500}
            fill={on ? C.courseText : C.roomText}
          >
            {r.label}
          </text>
          {on && (
            <>
              <circle cx={x + 9} cy={y + 9} r={6.5} fill={C.courseText} />
              <text
                x={x + 9}
                y={y + 9.5}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="8"
                fontWeight={800}
                fill={C.courseDeep}
              >
                {ord}
              </text>
            </>
          )}
        </g>
      );
    });

  return (
    <div className="rounded-2xl border border-border bg-card p-2">
      <svg viewBox={`0 0 ${VB_W} ${H}`} className="w-full h-auto" role="img" aria-label={`${floor.floor}층 코스 지도`}>
        {/* 건물 외곽 */}
        <rect x="2" y="2" width={VB_W - 4} height={H - 4} rx={12} fill="none" stroke={C.outline} strokeWidth={1.5} />
        {/* 중앙 복도 */}
        <rect x="90" y="8" width="20" height={H - 16} rx={5} fill={C.corridor} stroke={C.roomStroke} strokeWidth={0.75} />

        {/* 층 표시 */}
        <text x="100" y="26" textAnchor="middle" fontSize="15" fontWeight={900} fill={C.courseDeep}>
          {floor.floor}층
        </text>

        {/* 휴식 공간 (중앙 복도에 표시) */}
        {restYs.map((ry, i) => (
          <RestSeat key={i} cx={100} cy={ry} />
        ))}

        {/* 입구 (1층) */}
        {floor.entrance && (
          <text x="100" y={H - 12} textAnchor="middle" fontSize="8" fontWeight={700} fill={C.courseDeep}>
            ▲ 입구
          </text>
        )}

        {/* 코스 경로 선 */}
        {pathPoints.length > 1 && (
          <polyline
            points={polyline}
            fill="none"
            stroke={C.route}
            strokeWidth={2}
            strokeDasharray="4 3"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.7}
          />
        )}

        {renderWing(floor.left, "L")}
        {renderWing(floor.right, "R")}
      </svg>
    </div>
  );
}
