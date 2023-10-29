"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export const useNavigate = (fn) => {
  const pathname = usePathname();
  const pathnameRef = useRef(pathname);

  useEffect(() => {
    if (pathnameRef.current !== pathname) {
      pathnameRef.current = pathname;
      fn();
    }
  }, [pathname, fn]);
};
