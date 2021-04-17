export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
export const existsGaId = GA_ID !== "";

export const pageview = (path: string): void => {
  window.gtag("config", GA_ID, {
    page_path: path,
  });
};

type GaEventProps = {
  action: string;
  category: string;
  label: string;
  value?: number;
};

export const event = ({
  action,
  category,
  label,
  value,
}: GaEventProps): void => {
  if (!existsGaId) {
    return;
  }

  window.gtag("event", action, {
    event_category: category,
    event_lavel: JSON.stringify(label),
    value,
  });
};
