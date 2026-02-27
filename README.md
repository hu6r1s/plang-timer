# Plang Timer
React + TypeScript 기반의 목표 시간 설정이 가능한 스톱워치 타이머입니다.

## 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm start
```

---

## 기술 스택

| 기술 | 용도 |
|---|---|
| React | UI 컴포넌트 |
| TypeScript | 정적 타입 |
| Tailwind CSS v3 | 스타일링 |
| Zustand | 전역 상태 관리 |
| Web Audio API | 목표 시간 도달 알림음 |

---

## 기술 스택 선택 이유

### Tailwind CSS v3
기존 CSS-in-JS 방식은 런타임에 스타일을 생성하기 때문에 성능 오버헤드가 있고, 일반 CSS 파일은 컴포넌트마다 클래스 네이밍 규칙을 별도로 관리해야 합니다.

Tailwind를 선택한 이유는 두 가지입니다.

- **컴포넌트와 스타일의 응집**: 별도 CSS 파일 없이 JSX 안에서 스타일을 바로 확인하고 수정 가능
- **CRA 호환성**: v4는 CRA 환경에서 설정이 복잡하고 공식 지원이 불안정하여 CRA와 안정적으로 통합되는 v3를 선택

### Zustand
React의 기본 상태 관리 방법인 `useState` + Context API는 상태가 변경될 때 해당 Context를 구독하는 모든 컴포넌트가 리렌더링됩니다.

Redux는 강력하지만 action, reducer, selector를 각각 정의해야 해서 타이머처럼 작은 프로젝트에는 과한 설정이 필요합니다.

Zustand를 선택한 이유는 두 가지입니다.

- **적은 boilerplate**: action 타입 정의 없이 store 안에 상태와 액션을 함께 선언
- **`getState()` 지원**: 컴포넌트 외부(interval 콜백 등)에서도 클로저 문제 없이 최신 상태를 참조 가능

### Web Audio API
목표 시간 도달 시 알림음을 위해 외부 라이브러리나 오디오 파일 없이 브라우저 내장 API만으로 소리를 생성했습니다.

- **외부 의존성 없음**: 별도 패키지 설치나 오디오 파일 관리 불필요
- **커스텀 가능**: 주파수, 지속 시간, 페이드 아웃 등을 코드로 직접 제어

```ts
const oscillator = ctx.createOscillator();
oscillator.frequency.setValueAtTime(880, ctx.currentTime); // 주파수 설정
gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15); // 페이드 아웃
```

---

## 주요 기능

- 타이머 시작 / 일시정지 / 초기화
- 목표 시간 설정 (시 / 분 / 초)
- 목표 시간 도달 시 알림음과 함께 자동 정지
- 목표 시간 대비 진행률 표시

---

## 상태 모델

타이머는 4가지 상태를 가집니다.

```
IDLE ──[start]──▶ RUNNING ──[pause]──▶ PAUSED
  ▲                   │                    │
  └──────[reset]──────┴──────[start]───────┘
  ▲
  └──────[reset] ◀── COMPLETED
                     (목표 시간 도달)
```

| 상태 | 설명 |
|---|---|
| `IDLE` | 초기 상태. 타이머가 시작된 적 없거나 reset된 상태 |
| `RUNNING` | 타이머 동작 중 |
| `PAUSED` | 일시정지. 경과 시간 유지 |
| `COMPLETED` | 목표 시간 도달. elapsedMs는 goalMs로 고정 |

`COMPLETED`를 별도 상태로 분리한 이유는 `IDLE`과 구분이 필요하기 때문입니다. 목표 도달 후에는 Start 버튼을 비활성화하고 Reset 버튼을 활성화해야 하는데, 이를 `IDLE`로 처리하면 두 상태를 구분할 수 없었습니다.

---

## 시간 계산 방식

### 왜 `setInterval`의 카운트를 쓰지 않는가

`setInterval(fn, 1000)`은 정확히 1000ms마다 실행된다는 보장이 없습니다. 브라우저 탭이 백그라운드로 전환되거나 메인 스레드가 바쁠 경우 지연이 발생하고, 이 오차가 누적됩니다.

### 해결 방법: `performance.now()` 기준점 비교

시작 시점을 `performance.now()`로 기록하고, tick마다 현재 시각과의 차이를 직접 계산합니다.<br />
`Date.now()`도 있지만, 이는 시스템 시계 기반이라 사용자가 시스템 시간을 변경하는 등에 의해 값이 바뀔 수 있습니다.

```ts
// 시작 시점 기록
startedAtRef.current = performance.now();

// 매 tick마다 실제 경과 시간 계산
const elapsed = baseElapsedMs + (performance.now() - startedAtRef.current);
```

interval이 늦게 실행되더라도 실제 경과 시간을 직접 측정하기 때문에 오차가 보정됩니다.

### Pause / Resume 처리

일시정지 시 현재까지의 경과 시간을 `baseElapsedMs`에 누적하고, Resume 시 이를 기준으로 다시 계산합니다.

```
Start  → baseElapsed = 0,    startedAt = T1
Pause  → baseElapsed = 3000ms (T1로부터 3초 경과)
Resume → baseElapsed = 3000ms, startedAt = T2
Tick   → elapsed = 3000 + (now - T2)  ← 이어서 증가
```

---

## 설계 구조

### 레이어 분리

```
components  →  hooks  →  store  →  types / utils
```

의존성은 단방향으로 흐르며, 하위 레이어는 상위 레이어를 참조하지 않습니다.

### 역할 분리

| 레이어 | 파일 | 책임 |
|---|---|---|
| 상태 | `store/timerStore.ts` | 상태 보관 + 액션 정의. 시간 계산은 하지 않음 |
| 로직 | `hooks/useTimer.ts` | setInterval 관리, performance.now() 기반 시간 계산, 목표 도달 감지 |
| UI | `components/Timer/` | store에서 받은 값을 렌더링. 비즈니스 로직 없음 |

### Zustand `getState()`를 사용하는 이유

`useEffect` 내부의 `setInterval` 콜백은 등록 시점의 값을 클로저로 캡처합니다.<br />`goalMs`처럼 실행 중에 변경될 수 있는 값을 클로저로 캡처하면 변경이 반영되지 않습니다.

```ts
// 클로저에 고정된 goalMs — 변경 시 반영 안 됨
if (elapsed >= goalMs) { ... }

// 매 tick마다 store에서 최신값을 읽음
const { goalMs } = useTimerStore.getState();
if (elapsed >= goalMs) { ... }
```

### 파일 구조

```
src/
├── types/
│   └── timer.ts              # TimerStatus enum, TimerState 타입
├── utils/
│   ├── formatTime.ts         # 시간 포매터 (순수 함수)
│   └── sound.ts              # Web Audio API 알림음
├── store/
│   └── timerStore.ts         # Zustand store
├── hooks/
│   └── useTimer.ts           # interval 관리 + 시간 계산
└── components/
    └── Timer/
        ├── Timer.tsx          # 조립 (useTimer 호출 후 props 배포)
        ├── Button.tsx         # 타이머 버튼 재사용 컴포넌트
        ├── TimerSettingButton.tsx         # 목표 시간 설정 버튼 컴포넌트
        ├── TimerDisplay.tsx   # 시간 + 진행률 표시
        ├── TimerControls.tsx  # Start / Pause / Reset 버튼
        ├── TimerStatusBar.tsx # 상단 상태 바
        ├── TimerIndicator.tsx # 하단 상태 인디케이터
        └── TimerSettingModal.tsx  # 목표 시간 설정 모달
```
