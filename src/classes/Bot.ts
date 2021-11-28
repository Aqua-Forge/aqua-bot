import {
  Client,
  Intents,
  TextChannel,
  DMChannel,
  PartialDMChannel,
  NewsChannel,
  ThreadChannel,
} from "discord.js";
import { getFullDate } from "../auxiliary";

const intents = [
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MEMBERS,
  Intents.FLAGS.GUILD_MESSAGES,
];

const cmdPrefix = "$";
const channelsMap = {
  logs: "914620820616278016",
};

class Bot {
  public static client: Client;

  constructor(private token: string) {
    Bot.client = new Client({ intents });

    Bot.client.on("ready", () => {
      if (Bot.client.user) {
        let hello = `${Bot.client.user.tag} ligado em ${getFullDate()}!`;
        console.log(hello);
        this.sendMessage(hello, channelsMap["logs"]);
      }
    });

    // Comandos
    Bot.client.on("messageCreate", async (msg) => {
      // $clear - Apagar mensagens de um canal.
      if (msg.content.toLowerCase().startsWith(cmdPrefix + "clear")) {
        this.clear(msg.channel);
        this.sendMessage(
          `Mensagens do canal <#${msg.channel.id.toString()}> foram apagadas por ${msg.author.toString()}!`,
          channelsMap["logs"]
        );
      }
    });
  }

  private async clear(
    channel:
      | DMChannel
      | PartialDMChannel
      | TextChannel
      | NewsChannel
      | ThreadChannel
  ) {
    await channel.messages
      .fetch({ limit: 100 })
      .then((messages) => {
        messages.forEach((msg) => {
          msg.delete();
        });
      })
      .catch(console.error);
  }

  private async sendMessage(msg: string, channelId: string) {
    Bot.client.channels.fetch(channelId).then((channel) => {
      (channel as TextChannel).send(msg);
    });
  }

  public start() {
    Bot.client.login(this.token);
  }
}

export default Bot;
