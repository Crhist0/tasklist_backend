import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";

export class TelegramBot {
    private BOT_TOKEN: string;
    private CHAT_ID: string;
    bot: Telegraf<Context<Update>>;
    constructor() {
        this.BOT_TOKEN = process.env.BOT_TOKEN as string;
        this.CHAT_ID = process.env.CHAT_ID as string;
        this.bot = new Telegraf(this.BOT_TOKEN);
    }

    sendMessage = (message: string) => {
        return this.bot.telegram.sendMessage(this.CHAT_ID, message);
    };
}
