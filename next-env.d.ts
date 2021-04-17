/// <reference types="next" />
/// <reference types="next/types/global" />

interface Window {
  gtag(type: "config", googleAnalyticsId: string, { page_path: string });
  gtag(
    type: "event",
    eventAction: string,
    fieldObject: {
      label: string;
      category: string;
      value?: string;
    }
  );
}
