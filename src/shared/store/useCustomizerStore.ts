import { create } from "zustand";

interface CustomizerState {
  activeDir: string; // 현재 활성화된 방향 (ltr: 왼쪽에서 오른쪽, rtl: 오른쪽에서 왼쪽)
  activeMode: string; // 현재 활성화된 모드 (light: 밝은 모드, dark: 어두운 모드)
  activeTheme: string; // 현재 활성화된 테마
  SidebarWidth: number; // 사이드바의 너비 (픽셀)
  MiniSidebarWidth: number; // 축소된 사이드바의 너비 (픽셀)
  TopbarHeight: number; // 상단 바의 높이 (픽셀)
  isCollapse: boolean; // 사이드바가 축소되었는지 여부
  isLayout: string; // 레이아웃 타입 (full: 전체, boxed: 박스형)
  isSidebarHover: boolean; // 사이드바에 마우스가 호버되었는지 여부
  isMobileSidebar: boolean; // 모바일 사이드바가 활성화되었는지 여부
  isHorizontal: boolean; // 수평 레이아웃이 활성화되었는지 여부
  isLanguage: string; // 현재 선택된 언어
  isCardShadow: boolean; // 카드에 그림자 효과를 적용할지 여부
  borderRadius: number; // 전역 테두리 반경 값 (픽셀)
  setTheme: (theme: string) => void; // 테마 설정 함수
  setDarkMode: (mode: string) => void; // 다크 모드 설정 함수
  setDir: (dir: string) => void; // 방향 설정 함수
  setLanguage: (language: string) => void; // 언어 설정 함수
  setCardShadow: (isCardShadow: boolean) => void; // 카드 그림자 설정 함수
  toggleSidebar: () => void; // 사이드바 토글 함수
  hoverSidebar: (isSidebarHover: boolean) => void; // 사이드바 호버 상태 설정 함수
  toggleMobileSidebar: () => void; // 모바일 사이드바 토글 함수
  toggleLayout: (layout: string) => void; // 레이아웃 타입 토글 함수
  toggleHorizontal: (isHorizontal: boolean) => void; // 수평 레이아웃 토글 함수
  setBorderRadius: (borderRadius: number) => void; // 전역 테두리 반경 설정 함수
}

const useCustomizerStore = create<CustomizerState>((set) => ({
  activeDir: "ltr", // 기본 방향: 왼쪽에서 오른쪽
  activeMode: "light", // 기본 모드: 밝은 모드
  activeTheme: "BLUE_THEME", // 기본 테마: 파란색
  SidebarWidth: 270, // 기본 사이드바 너비
  MiniSidebarWidth: 87, // 기본 축소된 사이드바 너비
  TopbarHeight: 70, // 기본 상단 바 높이
  isCollapse: false, // 기본적으로 사이드바 펼침
  isLayout: "full", // 기본 레이아웃: 전체
  isSidebarHover: false, // 기본적으로 사이드바 호버 비활성화
  isMobileSidebar: false, // 기본적으로 모바일 사이드바 비활성화
  isHorizontal: false, // 기본적으로 수직 레이아웃
  isLanguage: "kr", // 기본 언어: 한국어
  isCardShadow: true, // 기본적으로 카드 그림자 활성화
  borderRadius: 7, // 기본 테두리 반경
  setTheme: (theme) => set({ activeTheme: theme }), // 테마 설정
  setDarkMode: (mode) => set({ activeMode: mode }), // 다크 모드 설정
  setDir: (dir) => set({ activeDir: dir }), // 방향 설정
  setLanguage: (language) => set({ isLanguage: language }), // 언어 설정
  setCardShadow: (isCardShadow) => set({ isCardShadow }), // 카드 그림자 설정
  toggleSidebar: () => set((state) => ({ isCollapse: !state.isCollapse })), // 사이드바 토글
  hoverSidebar: (isSidebarHover) => set({ isSidebarHover }), // 사이드바 호버 상태 설정
  toggleMobileSidebar: () =>
    set((state) => ({ isMobileSidebar: !state.isMobileSidebar })), // 모바일 사이드바 토글
  toggleLayout: (layout) => set({ isLayout: layout }), // 레이아웃 타입 설정
  toggleHorizontal: (isHorizontal) => set({ isHorizontal }), // 수평 레이아웃 설정
  setBorderRadius: (borderRadius) => set({ borderRadius }), // 테두리 반경 설정
}));

export default useCustomizerStore;
