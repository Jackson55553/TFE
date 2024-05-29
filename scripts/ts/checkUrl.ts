const expres =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
export const regexUrl = new RegExp(expres);
export const isUrl = async (url) => {
    try {
        const res = await fetch(url, { method: 'GET' });
        console.log(res);
        return true;
    } catch (error) {
        return false;
    }
};
