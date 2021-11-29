import Bot from "./classes/Bot";
import { config } from "dotenv";
import Rest from "./classes/Rest";
import commands from "./commands";
import CommandListener from "./classes/CommandListener";

config();

const init = async () => {
  if (!process.env.TOKEN) {
    console.error("O Token do BOT não foi encontrado!");
    return;
  }
  if (!process.env.CLIENT_ID) {
    console.error("O Client ID da Aplicação do Discord não foi encontrado!");
    return;
  }
  if (!process.env.GUILD_ID) {
    console.error("O ID do servidor não foi encontrado!");
    return;
  }

  const bot = new Bot(process.env.TOKEN);
  const rest = new Rest(process.env.TOKEN, process.env.CLIENT_ID, process.env.GUILD_ID);
  const cmdListener = new CommandListener(commands);

  rest.registerCommands(commands);
  await rest.start();
  bot.start();
};

init();
