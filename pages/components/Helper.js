
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

export default getCookie;