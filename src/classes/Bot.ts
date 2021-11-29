import { Client, Intents, TextChannel, Message } from "discord.js";
import { generatePresentationText, getFullDate } from "../auxiliary";

const intents = [
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MEMBERS,
  Intents.FLAGS.GUILD_MESSAGES,
];

interface BotConfig {
  token: string;
  cmdPrefix: string;
  channelsIds: { [channelName: string]: string };
}

class Bot {
  public static client: Client;
  private token: string;
  private cmdPrefix: string;
  private channelsIds: { [channelName: string]: string };
  private presentationText: string;

  constructor(configs: BotConfig) {
    Bot.client = new Client({ intents });

    this.token = configs.token;
    this.cmdPrefix = configs.cmdPrefix;
    this.channelsIds = configs.channelsIds;

    let cmds = {
      sayhi: "Apresenta o AquaBot e seus comandos.",
      clear: "Limpa as mensagens do canal.",
    };
    this.presentationText = generatePresentationText(cmds);

    Bot.client.on("ready", () => {
      if (Bot.client.user) {
        let hello = `${Bot.client.user.tag} ligado em ${getFullDate()}!`;
        console.log(hello);
        this.sendMessage(hello, this.channelsIds["logs"]);
      }
    });

    // Registrando os comandos do Bot
    Bot.client.on("messageCreate", async (msg) => {
      if (msg.content.startsWith(this.cmdPrefix)) {
        // $clear - Apagar mensagens de um canal.
        if (msg.content === this.cmdPrefix + "clear") {
          this.clear(msg);
          this.sendMessage(
            `Mensagens do canal <#${msg.channel.id.toString()}> foram apagadas por ${msg.author.toString()}!`,
            this.channelsIds["logs"]
          );
        }

        // $sayhi - Fazer com que o bot se apresente.
        else if (msg.content === this.cmdPrefix + "sayhi") {
          this.sendMessage(this.presentationText, msg.channel.id);
        }
      }
    });
  }

  private async clear(msg: Message) {
    await msg.channel.messages
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
