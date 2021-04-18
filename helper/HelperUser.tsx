import { parseCookies, setCookie, destroyCookie } from "nookies";
import { getCsrfOfDjango, baseUrl } from "./Helper";

import Router from "next/router";
import { User } from "../types/any";

interface postData {
  username: string;
  password: string;
}

// login excute
export const getJwtToken = async (postData: postData, nextPage: string) => {
  const csrf = await getCsrfOfDjango();

  const params: any = {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-CSRFToken": csrf["token"],
    },
    body: JSON.stringify(postData),
  };

  const res = await fetch(`${baseUrl}/api/user/login/`, params);
  const data = await res.json();

  setCookie(null, "iwana_user_token", data["access"], {
    maxAge: 30 * 24 * 60 * 60,
  });
  setCookie(null, "iwana_refresh", data["refresh"], {
    maxAge: 30 * 24 * 60 * 60,
  });
  destroyCookie(null, "csrftoken");

  return data;
};

const reviveToken = (accessToken: string) => {
  destroyCookie(null, "iwana_user_token");
  setCookie(null, "iwana_user_token", accessToken, {
    maxAge: 30 * 24 * 60 * 60,
  });
};

// refresh token
export const refreshToken = async () => {
  const cookies = parseCookies();
  const refreshKey = cookies["iwana_refresh"];
  const csrf = await getCsrfOfDjango();

  const res = await fetch(`${baseUrl}/api/user/refresh/`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-CSRFToken": csrf["token"],
    },
    body: JSON.stringify({ refresh: refreshKey }),
  });
  const ret = await res.json();

  reviveToken(ret["access"]);
  destroyCookie(null, "csrftoken");

  return ret;
};

// get user by token
const tokenToUser = async (tk: string) => {
  const tkList = tk.split(".");
  const res = await fetch(
    `${baseUrl}/api/user/profile/?head=${tkList[0]}&pay=${tkList[1]}&signature=${tkList[2]}`
  );
  const ret = await res.json();
  return ret;
};

// get CurrentUser information by jwt
export const fetchCurrentUser = async (token: string) => {
  try {
    const user = await tokenToUser(token);
    return user;
  } catch {
    const data = await refreshToken();
    const user = await tokenToUser(data["access"]);
    return user;
  }
};

// update profile
export const updateProfile = async (e: any, user: User) => {
  let formData = new FormData();

  formData.set("email", user.email);
  formData.set("username", user.username);
  formData.set("name", e.target.name.value);
  formData.set("intro", e.target.intro.value);

  e.target.picture.files.length !== 0 &&
    formData.set("picture", e.target.picture.files[0]);

  const csrf = await getCsrfOfDjango();

  const res = await fetch(`${baseUrl}/api/user/profile/${user.pk}/`, {
    method: "PUT",
    mode: "cors",
    credentials: "include",
    headers: {
      "X-CSRFToken": csrf["token"],
    },
    body: formData,
  });

  const ret = await res.json();

  destroyCookie(null, "csrftoken");

  Router.reload();
};

// register
export const fetchRegist = async (e: any) => {
  const data = {
    username: e.target.username.value,
    email: e.target.email.value,
    password: e.target.password.value,
    password2: e.target.password2.value,
  };
  const csrf = await getCsrfOfDjango();
  try {
    const res = await fetch(`${baseUrl}/api/user/register/`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "X-CSRFToken": csrf["token"],
      },
      body: JSON.stringify(data),
    });
    destroyCookie(null, "iwana_user_token");
    const ret = await res.json();
    return ret;
  } catch (ex: any) {
    const ret: { [key: string]: any } = {
      status: "400",
    };
    return ret;
  } finally {
    destroyCookie(null, "csrftoken");
  }

  /*
  setCookie(null, "iwana_user_token", ret["access"], {
    maxAge: 30 * 24 * 60 * 60,
  });
  setCookie(null, "iwana_refresh", ret["refresh"], {
    maxAge: 30 * 24 * 60 * 60,
  });
  */
};

export const registed = async () => {
  const csrf = await getCsrfOfDjango();
  const cookies = parseCookies();
  const res = await fetch(`${baseUrl}/api/user/profile/`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-CSRFToken": csrf["token"],
      Authorization: `Bearer ${cookies["iwana_user_token"]}`,
    },
  });
  destroyCookie(null, "csrftoken");
  const ret = await res.json();
  return ret;
};
