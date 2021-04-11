import { NextPageContext } from 'next';
import { parseCookies, setCookie, destroyCookie } from 'nookies';

import { atomFamily, useSetRecoilState } from 'recoil';
import { CurrentUserState } from '../states/CurrentUser';
import Router from 'next/router';
import User from '../types/any';

export const isBrowser = () => typeof window !== 'undefined';

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

// get csrftoken from serverside
export const getCsrfOfDjango = async () => {
    const res = await fetch(`${baseUrl}/api/csrf/`);
    const data = await res.json();

    setCookie(null, 'csrftoken', data['token'], {
        maxAge: 60 * 24 * 60 * 60,
    });

    return data;
}


interface postData {
    username: string,
    password: string,
}

// loginの実処理を行う関数
/**
 * 
 * @param {Array} postData username & passworrd
 * @param {String or null} nextPage next page
 * @returns data (key is access)
 */
export const getJwtToken = async (postData: postData, nextPage: string) => {

    const csrf = await getCsrfOfDjango();

    const params: any = {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "X-CSRFToken": csrf['token'],
        },
        body: JSON.stringify(postData),
    }

    const res = await fetch(`${baseUrl}/api/user/login/`, params);
    const data = await res.json();

    setCookie(null, 'iwana_user_token', data['access']);
    setCookie(null, 'iwana_refresh', data['refresh']);
    destroyCookie(null, 'csrftoken');

    return data;
}

const reviveToken = (accessToken: string) => {
    destroyCookie(null, 'iwana_user_token');
    setCookie(null, 'iwana_user_token', accessToken);
}

// refresh token
export const refreshToken = async ()=> {
    const cookies = parseCookies();
    const refreshKey = cookies['iwana_refresh'];
    const csrf = await getCsrfOfDjango();
    
    const res = await fetch(`${baseUrl}/api/user/refresh/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "X-CSRFToken": csrf['token'],
        },
        body: JSON.stringify({"refresh": refreshKey}),
    })
    const ret = await res.json();

    reviveToken(ret['access']);
    destroyCookie(null, 'csrftoken');

    return ret;
}

// get user bt token
const tokenToUser = async (tk: string) => {
    const tkList = tk.split('.');
    const res = await fetch(`${baseUrl}/api/user/profile/?head=${tkList[0]}&pay=${tkList[1]}&signature=${tkList[2]}`);
    const ret = await res.json();
    return ret;
}

// get CurrentUser information by jwt
export const fetchCurrentUser = async (token: string) => {
    try {
        console.log('first');
        const user = await tokenToUser(token);
        return user;
    } catch {
        console.log('second');
        const data = await refreshToken();
        const user = await tokenToUser(data['access']);
        return user;
    }
}

// update profile
export const updateProfile = async (e: any, user: User) => {

    let formData = new FormData();

    formData.set('email', user.email);
    formData.set('username', user.username);

    if (e.target.name.value !== "") {
        formData.set('name', e.target.name.value);
    }
    if (e.target.intro.value !== "") {
        formData.set('intro', e.target.intro.value);
    }
    if (e.target.picture.files.length !== 0) {
        formData.set('picture', e.target.picture.files[0]);
    }

    const csrf = await getCsrfOfDjango();
    
    const res = await fetch(`${baseUrl}/api/user/profile/${user.pk}/`, {
        method: "PUT",
        credentials: 'include',
        headers: {
          "X-CSRFToken": csrf['token'],
        },
        body: formData,
    })

    const ret = await res.json();

    destroyCookie(null, 'csrftoken');

    Router.reload();
}

// change is gotten
export const gottenChange = async (e: any) => {
    const slug = e.target.getAttribute('data-wanted');
    const res = await fetch(`${baseUrl}/api/gotten/${slug}`);
    const ret = await res.json();

    return ret['is_'];
}

// post wanted
export const postWanted = async (e:any, wanted_plat: string[], user: User) => {
    let formData = new FormData();
    // user pk
    formData.set('user_pk', user.pk.toString());

    formData.set('want_name', e.target.want_name.value);
    formData.set('want_price', e.target.want_price.value);
    for (let i = 0; i < wanted_plat.length; i++) {
        formData.append('plat[]', wanted_plat[i]);
    }
    formData.set('want_intro', e.target.want_intro.value);
    if (e.target.picture.files.length !== 0) {
        formData.set('picture', e.target.picture.files[0])
    }

    const csrf = await getCsrfOfDjango();
    
    const res = await fetch(`${baseUrl}/api/wanted/`, {
        method: "POST",
        credentials: 'include',
        headers: {
            //"Content-Type": "multipart/form-data",
            "X-CSRFToken": csrf['token'],
        },
        body: formData,
    })

    const ret = await res.json();
    destroyCookie(null, 'csrftoken');

    Router.push('/wanted');
}

// update wanted
export const updateWanted = async (e:any, wanted_plat: string[], user: User) => {
    let formData = new FormData();
    // user pk
    formData.set('user_pk', user.pk.toString());

    formData.set('want_name', e.target.want_name.value);
    formData.set('want_price', e.target.want_price.value);
    for (let i = 0; i < wanted_plat.length; i++) {
        formData.append('plat[]', wanted_plat[i]);
    }
    formData.set('want_intro', e.target.want_intro.value);
    if (e.target.picture.files.length !== 0) {
        formData.set('picture', e.target.picture.files[0])
    }

    console.log(formData);

    const slug = e.target.getAttribute('data-wanted');
    const csrf = await getCsrfOfDjango();
    const res = await fetch(`${baseUrl}/api/wanted/${slug}/`, {
        method: "PUT",
        credentials: 'include',
        headers: {
            "X-CSRFToken": csrf['token'],
        },
        body: formData,
    });

    const ret = await res.json();
    destroyCookie(null, 'csrftoken');

    // Router.push(`/wanted/${slug}`);
    Router.back();
}

// delete wanted
export const deleteWanted = async (e: any) => {
    const slug = e.target.getAttribute('data-wanted');
    const csrf = await getCsrfOfDjango();
    const res = await fetch(`${baseUrl}/api/wanted/${slug}`, {
        method: "DELETE",
        credentials: 'include',
        headers: {
            "X-CSRFToken": csrf['token'],
        },
    });
    destroyCookie(null, 'csrftoken');

    Router.back();
}

// post offer
export const postOffer = async (e: any, wanted_slug: string, user: User) => {
    let data: { [key: string]: any } = {
        "offer_url": e.target.offer_url.value,
    }
    if (user) {
        data['user'] = user.pk;
    }
    const csrf = await getCsrfOfDjango();
    const res = await fetch(`${baseUrl}/api/offering/${wanted_slug}/`, {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "X-CSRFToken": csrf['token'],
        },
        body: JSON.stringify(data),
    })
    const ret = await res.json();
    destroyCookie(null, 'csrftoken');
    return ret;
}

// post inquiry
export const fetchInquiry = async (e: any) => {
    const data = {
        'name': e.target.inq_name.value,
        'mail': e.target.inq_mail.value,
        'category': e.target.inq_category.value,
        'content': e.target.inq_content.value,
    }
    const csrf = await getCsrfOfDjango();
    const res = await fetch(`${baseUrl}/api/inquiry/`, {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "X-CSRFToken": csrf['token'],
        },
        body: JSON.stringify(data),
    })
    const ret = await res.json();
    destroyCookie(null, 'csrftoken');
    return ret;
}

export const fetchRegist = async (e: any) => {
    const data = {
        'username': e.target.username.value,
        'email': e.target.email.value,
        'password': e.target.password.value,
        'password2': e.target.password2.value,
    }
    const csrf = await getCsrfOfDjango();
    const res = await fetch(`${baseUrl}/api/user/register/`, {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "X-CSRFToken": csrf['token'],
        },
        body: JSON.stringify(data),
    })
    destroyCookie(null, 'iwana_user_token');
    const ret = await res.json();
    
    setCookie(null, 'iwana_user_token', ret['access']);
    setCookie(null, 'iwana_refresh', ret['refresh']);
    destroyCookie(null, 'csrftoken');
    return ret;
}

export default getCsrfOfDjango;