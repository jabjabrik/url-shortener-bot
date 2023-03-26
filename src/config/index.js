export default {
    isProduction: process.env.NODE_ENV === 'production',
    PORT: process.env.PORT,
    CYCLIC_URL: process.env.CYCLIC_URL,
    BOT_TOKEN: process.env.BOT_TOKEN,
    API_KEY: {
        tinyUrl: process.env.API_KEY_TINYURL,
        bitly: process.env.API_KEY_BITLY,
        cuttly: process.env.API_KEY_CUTTLY,
    },
};
