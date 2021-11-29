import Bot from "./classes/Bot";
import { config } from "dotenv";
import * as channelsIds from "../channels.json";

config();

let configs = {
  token: process.env.TOKEN,
  cmdPrefix: "$",
  channelsIds,
};

const init = () => {
  if (!process.env.TOKEN) {
    console.error("O Token do BOT não foi encontrado!");
    return;
  }

  const bot = new Bot(configs);
  bot.start();
};

init();
