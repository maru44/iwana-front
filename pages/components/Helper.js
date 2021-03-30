import Router from 'next/router';

export const getCookie = name => {
    if (process.browser) {
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
    const res = await fetch(`http://localhost:8000/api/csrf/`);
    const data = await res.json();

    if (process.browser) {
        document.cookie = `csrftoken=${data['token']}`
    }

    return data;
}

export const getJwtToken = async (postData, nextPage) => {

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

    const res = await fetch(`http://localhost:8000/api/user/login/`, params);
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

export default getCookie;