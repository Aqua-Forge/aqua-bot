import Bot from "./classes/Bot";
import { config } from "dotenv";

config();

const init = () => {
  if (!process.env.TOKEN) {
    console.error("O Token do BOT não foi encontrado!");
    return;
  }

  const bot = new Bot(process.env.TOKEN);
  bot.start();
};

init();
