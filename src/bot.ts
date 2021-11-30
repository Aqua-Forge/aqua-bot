import Bot from "./classes/Bot";
import { config } from "dotenv";
import Rest from "./classes/Rest";
import commands from "./commands";
import CommandListener from "./classes/CommandListener";

config();

const init = async () => {
  if (!process.env.TOKEN || !process.env.CLIENT_ID || !process.env.GUILD_ID) {
    console.error("Variável(is) de ambiente faltando!");
    return;
  }

  const bot = new Bot(process.env.TOKEN, process.env.GUILD_ID);
  const rest = new Rest(process.env.TOKEN, process.env.CLIENT_ID, process.env.GUILD_ID);
  const cmdListener = new CommandListener(commands);

  rest.registerCommands(commands);
  await rest.start();
  bot.start();
};

init();
