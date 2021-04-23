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
/*
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

  //reviveToken(ret["access"]);
  destroyCookie(null, "csrftoken");

  return ret;
};
*/

export const refreshToken = async () => {
  const res = await fetch(`${baseUrl}/api/user/refresh/`, {
    credentials: "include",
  });
  const ret = await res.json();
  return ret;
};

// get user by token
const tokenToUser = async () => {
  const res = await fetch(`${baseUrl}/api/user/`, {
    credentials: "include",
  });
  const ret = await res.json();
  if (res.status === 400) {
    throw ret;
  }
  return ret;
};

// get CurrentUser information by jwt
export const fetchCurrentUser = async () => {
  try {
    const user = await tokenToUser();
    return user;
  } catch (e) {
    if (e["error"] === "Activations link expired") {
      const refresh = await refreshToken();
      if (refresh["status"] === 200) {
        const user = await tokenToUser();
        return user;
      }
    }
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
};

export const registed = async () => {
  const csrf = await getCsrfOfDjango();
  const res = await fetch(`${baseUrl}/api/user/profile/`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-CSRFToken": csrf["token"],
    },
  });
  destroyCookie(null, "csrftoken");
  const ret = await res.json();
  return ret;
};
