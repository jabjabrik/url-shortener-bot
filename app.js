import 'dotenv/config';
import { bot } from './src/bot.js';
import config from './src/config/index.js';

const { PORT, CYCLIC_URL, BOT_TOKEN, isProduction } = config;

if (!BOT_TOKEN) throw new Error('"BOT_TOKEN" env var is required!');

if (isProduction) {
    await bot.launch({ webhook: { domain: CYCLIC_URL, port: PORT } });
    console.info(`The bot ${bot.botInfo.username} is running on server port ${PORT}`);
} else {
    await bot.launch();
    console.info(`The bot ${bot.botInfo.username} is running locally`);
}
