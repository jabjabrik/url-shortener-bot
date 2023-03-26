import { Telegraf } from 'telegraf';
import * as utils from './utils/index.js';
import config from './config/index.js';

const { BOT_TOKEN } = config;

export const bot = new Telegraf(BOT_TOKEN);

bot.start(async (ctx) => {
    const { id } = ctx.chat;
    const name = ctx.chat.first_name;
    const msg = utils.getTemplateMsg('start', { name });
    bot.telegram.sendMessage(id, msg, { parse_mode: 'HTML' });
});

bot.help(async (ctx) => {
    const { id } = ctx.chat;
    const msg = utils.getTemplateMsg('help');
    bot.telegram.sendMessage(id, msg, { parse_mode: 'HTML' });
});

bot.on('text', async (ctx) => {
    ctx.replyWithChatAction('typing');
    const { id } = ctx.chat;
    const url = ctx.message.text;
    const isValidUrl = utils.validateUrl(url);
    if (!isValidUrl) {
        const msg = utils.getTemplateMsg('invalidUrl');
        bot.telegram.sendMessage(id, msg, { parse_mode: 'HTML' });
        return;
    }
    const [bitly, cuttly, cleanUrl, tinyUrl] = await Promise.all([
        utils.getShortUrlFromBitly(url),
        utils.getShortUrlFromCuttly(url),
        utils.getShortUrlFromCleanUrl(url),
        utils.getShortUrlFromTinyUrl(url),
    ]);
    const msg = utils.getTemplateMsg('sendResult', { bitly, cuttly, cleanUrl, tinyUrl });
    bot.telegram.sendMessage(id, msg, { parse_mode: 'HTML' });
});

bot.telegram.setMyCommands([
    { command: 'start', description: 'Start bot' },
    { command: 'help', description: 'How to use bot' },
]);

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
