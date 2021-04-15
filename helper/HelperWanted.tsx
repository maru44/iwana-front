import { destroyCookie, parseCookies } from 'nookies';

import Router from 'next/router';
import User from '../types/any';

import { getCsrfOfDjango } from './Helper';

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

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
        mode: "cors",
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
    const cookies = parseCookies();
    const csrf = await getCsrfOfDjango();
    const res = await fetch(`${baseUrl}/api/wanted/${slug}/`, {
        method: "PUT",
        mode: "cors",
        headers: {
            "X-CSRFToken": csrf['token'],
            "Authorization": `Bearer ${cookies['iwana_user_token']}`,
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
    const cookies = parseCookies();
    const csrf = await getCsrfOfDjango();
    const res = await fetch(`${baseUrl}/api/wanted/${slug}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
            "X-CSRFToken": csrf['token'],
            "Authorization": `Bearer ${cookies['iwana_user_token']}`,
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
        mode: "cors",
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

// change is gotten
export const gottenChange = async (e: any) => {
    const slug = e.target.getAttribute('data-wanted');
    const res = await fetch(`${baseUrl}/api/gotten/${slug}`);
    const ret = await res.json();

    return ret['is_'];
}
