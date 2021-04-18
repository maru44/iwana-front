/// <reference types="next" />
/// <reference types="next/types/global" />

interface page_path {
  [key: string]: string;
}

interface Window {
  gtag(type: "config", googleAnalyticsId: string, page_path: page_path);
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
