import React, { useEffect, useMemo } from "react";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import rtlPlugin from "stylis-plugin-rtl";

interface RTLType {
  children: React.ReactNode;
  direction: string;
}

const createStyleCache = () =>
  createCache({
    key: "rtl",
    prepend: true,
    stylisPlugins: [rtlPlugin],
  });

export const RTL: React.FC<RTLType> = ({ children, direction }) => {
  useEffect(() => {
    document.dir = direction;
  }, [direction]);

  // 캐시를 메모이제이션하여 불필요한 재생성을 방지
  const cache = useMemo(
    () => (direction === "rtl" ? createStyleCache() : null),
    [direction],
  );

  if (direction === "rtl" && cache) {
    return <CacheProvider value={cache}>{children}</CacheProvider>;
  }

  return children;
};
