import { NextPageContext } from 'next';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import nookies from 'nookies';

import { useSetRecoilState } from 'recoil';
import { CurrentUserState } from '../states/CurrentUser';

const isBrowser = () => typeof window !== 'undefined';

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const getCookie = (name: string) => {
    if (isBrowser) {
        if (document.cookie && document.cookie !== '') {
            for (const cookie of document.cookie.split(';')) {
                const [key, value] = cookie.trim().split('=');
                if (key === name) {
                    return decodeURIComponent(value);
                }
            }
        }
    }
}

export const getCsrfOfDjango = async (ctx?: NextPageContext) => {
    const res = await fetch(`${baseUrl}/api/csrf/`);
    const data = await res.json();

    setCookie(null, 'csrftoken', data['token'], {
        maxAge: 60 * 24 * 60 * 60,
    });
    /*
    nookies.set(ctx, 'csrftoken', data['token'], {
        maxAge: 60 * 24 * 60 * 60,
    })
    */

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
 * @returns data (key is token)
 */
export const getJwtToken = async (postData: postData, nextPage?: string) => {

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

    return data;
}


export const fetchCurrentUser = async (token: string) => {
    const tokenList = token.split('.');
    const head = tokenList[0];
    const pay = tokenList[1];
    const signature = tokenList[2];

    const res = await fetch(`${baseUrl}/api/user/profile/?head=${head}&pay=${pay}&signature=${signature}`);
    const user = await res.json();

    return user;
}

export const dCookie = (name: string, ctx?: NextPageContext): void => {
    destroyCookie(ctx, name);
}

export const modalOpen = () => {
    document.querySelector(".modal").classList.remove('off');
    document.querySelector('.modalCon').classList.remove('off');
}

export const modalClose = () => {
    document.querySelector(".modal").classList.add('off');
    document.querySelector('.modalCon').classList.add('off');
}

export default getCookie;