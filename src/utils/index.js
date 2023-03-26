import axios from 'axios';
import config from '../config/index.js';

const { API_KEY } = config;

export const validateUrl = (url) => {
    const regex =
        /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    return regex.test(url);
};

export const getShortUrlFromCuttly = async (url) => {
    try {
        const { data } = await axios.get(`http://cutt.ly/api/api.php?key=${API_KEY.cuttly}&short=${url}`);
        return data.url.shortLink;
    } catch (err) {
        console.error(err.message);
        return 'something wrong';
    }
};

export const getShortUrlFromCleanUrl = async (url) => {
    try {
        const { data } = await axios.post(`https://cleanuri.com/api/v1/shorten`, { url });
        return data.result_url;
    } catch (err) {
        console.error(err.message);
        return 'something wrong';
    }
};

export const getShortUrlFromBitly = async (url) => {
    try {
        const { data } = await axios.post(
            'https://api-ssl.bitly.com/v4/shorten',
            { long_url: url },
            {
                headers: { Authorization: `Bearer ${API_KEY.bitly}` },
            }
        );
        return data.link;
    } catch (err) {
        console.error(err.message);
        return 'something wrong';
    }
};

export const getShortUrlFromTinyUrl = async (url) => {
    try {
        const { data } = await axios.post(
            `https://api.tinyurl.com/create?api_token=${API_KEY.tinyUrl}`,
            { url },
            { headers: { Authorization: `Bearer ${API_KEY.tinyUrl}` } }
        );
        return data.data.tiny_url;
    } catch (err) {
        console.error(err.message);
        return 'something wrong';
    }
};

export const getTemplateMsg = (action, data = null) => {
    switch (action) {
        case 'start':
            return (
                `Welcome ${data.name}👋👋, Have a Great Day.\n` +
                `Send me the <b>🔗Link</b> and I'll shorten it for you.`
            );
        case 'help':
            return `Just send me a link and I'll shorten it.`;
        case 'invalidUrl':
            return '<b>🚫 Please send valid url</b>\n\nfor example <i>https://www.wikipedia.org</i>';
        case 'sendResult':
            return (
                'Here is your short url ⬇️ ⬇️\n\n' +
                `<b>Short link with Bitly:</b>\n` +
                `🌐 ${data.bitly}\n` +
                `<b>Short link with Cuttly:</b>\n` +
                `🌐 ${data.cuttly}\n` +
                `<b>Short link with Clean Url:</b>\n` +
                `🌐 ${data.cleanUrl}\n` +
                `<b>Short link with TinyURL:</b>\n` +
                `🌐 ${data.tinyUrl}\n`
            );
        default:
    }
};
