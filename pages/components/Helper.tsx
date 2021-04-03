import Router from 'next/router';
import { parseCookies, setCookie, destroyCookie } from 'nookies';

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
 * @returns data (key is token)
 */
export const getJwtToken = async (postData: postData, nextPage?: string) => {

    const csrf = await getCsrfOfDjango();

    const params = {
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

    if (data.token) {
        if (nextPage) {
            Router.push(nextPage);
        } else {
            Router.push('/');
        }
    } else {}

    return data;
}


export const fetchCurrentUser = async (token: string) => {
    const tokenList = token.split('.');
    const head = tokenList[0];
    const pay = tokenList[1];
    const signature = tokenList[2];

    const res = await fetch(`${baseUrl}/api/user/profile/?head=${head}&pay=${pay}&signature=${signature}`);
    const user = await res.json();

    console.log(user);

    return user;
}

export default getCookie;