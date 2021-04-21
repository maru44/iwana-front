import { parseCookies, setCookie, destroyCookie } from "nookies";

export const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

// get csrftoken from serverside
export const getCsrfOfDjango = async () => {
  const res = await fetch(`${baseUrl}/api/csrf/`);
  const data = await res.json();

  setCookie(null, "csrftoken", data["token"], {
    maxAge: 60 * 24 * 60 * 60,
  });

  return data;
};

// post inquiry
export const fetchInquiry = async (e: any) => {
  const data = {
    name: e.target.inq_name.value,
    mail: e.target.inq_mail.value,
    category: e.target.inq_category.value,
    content: e.target.inq_content.value,
  };
  const csrf = await getCsrfOfDjango();
  const res = await fetch(`${baseUrl}/api/inquiry/`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-CSRFToken": csrf["token"],
    },
    body: JSON.stringify(data),
  });
  const ret = await res.json();
  destroyCookie(null, "csrftoken");
  return ret;
};

export const fetchScrape = async (e: any) => {
  e.preventDefault ? e.preventDefault() : (e.returnValue = false);
  const target = e.target;

  if (target.keyword.value == null || target.keyword.value == "") {
    const res = "need";
    return res;
  }

  const res = await fetch(
    `${baseUrl}/api/scrape/?keyword=${target.keyword.value}&sold=${target.sold.value}&category=${target.category.value}`
  );
  let ret = await res.json();

  if (ret["mercari"] == [] && ret["rakuma"] == [] && ret["yahoo"] == []) {
    ret = "条件に合致する商品がありませんでした。";
    return ret;
  }
  return ret;
};

export const localizeTime = (date: string): any => {
  const cookies = parseCookies();
  const timeZone = cookies["timezone"];
  const dt = new Date(date).toLocaleString("ja-JP", {
    timeZone: timeZone,
    hour12: false,
  });
  return dt;
};

export const matchLink = (str: string): boolean => {
  return /((https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi.test(
    str
  );
};
