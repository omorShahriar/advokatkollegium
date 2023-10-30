"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const useTracking = () => {
  const pathname = usePathname();

  const [lastEvent, setLastEvent] = useState(null);

  const trackEvent = (eventName, eventData) => {
    setLastEvent({ eventName, eventData });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const dataLayer = window.dataLayer || [];

      if (lastEvent) {
        dataLayer.push({
          event: lastEvent.eventName,
          data: {
            page_path: pathname,
            page_location: window.location.href,
            page_title: document.title,
            ...lastEvent.eventData,
          },
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastEvent]);

  return { trackEvent };
};
