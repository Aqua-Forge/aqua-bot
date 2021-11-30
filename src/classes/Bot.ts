import {
  Client,
  Intents,
  TextChannel,
  Message,
  ApplicationCommandPermissionData,
} from "discord.js";
import { getFullDate, sleep } from "../auxiliary";

const intents = [
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MEMBERS,
  Intents.FLAGS.GUILD_MESSAGES,
];

class Bot {
  public static client: Client;
  private cmdPrefix: string = "$";
  private channelsIds: { [channelName: string]: string } = {
    logs: "914620820616278016",
  };

  constructor(private token: string, private guildId: string) {
    Bot.client = new Client({ intents });

    Bot.client.on("ready", async () => {
      if (Bot.client.user) {
        await this.givePermissionsToSlashCommands();
        let hello = `${Bot.client.user.tag} ligado em ${getFullDate()}!`;
        console.log(hello);
        this.sendMessage(hello, this.channelsIds["logs"]);
      }
    });

    // Registrando os comandos admin do Bot
    Bot.client.on("messageCreate", async (msg) => {
      if (msg.content.startsWith(this.cmdPrefix)) {
        // $clear - Apagar mensagens de um canal.
        if (msg.content === this.cmdPrefix + "clear") {
          this.checkPermission(msg, ["manager", "admin"], () => {
            this.clear(msg);
            this.sendMessage(
              `Mensagens do canal <#${msg.channel.id.toString()}> foram apagadas por ${msg.author.toString()}!`,
              this.channelsIds["logs"]
            );
          });
        }

        // $sayhi - Fazer com que o bot se apresente.
        else if (msg.content === this.cmdPrefix + "sayhi") {
          this.sendMessage(
            "Oi, eu sou o AquaBot! Digite /comandos para ver meus comandos!",
            msg.channel.id
          );
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

  private async checkPermission(
    msg: Message,
    roles: string[],
    onSuccess: Function
  ) {
    if (msg.member.roles.cache.some((role) => roles.includes(role.name))) {
      onSuccess();
    } else {
      msg.delete();
      let response = await msg.channel.send(
        "Você não tem permissão para usar este comando!"
      );
      await sleep(5);
      response.delete();
      this.sendMessage(
        `O usuário ${msg.author.toString()} tentou usar o comando ${msg.toString()}!`,
        this.channelsIds["logs"]
      );
    }
  }

  private async givePermissionsToSlashCommands() {
    let guild = Bot.client.guilds.cache.get(this.guildId);

    const permissions: ApplicationCommandPermissionData[] = [
      {
        id: guild.roles.everyone.id,
        type: "ROLE",
        permission: true,
      },
    ];

    let commandsList = await guild.commands.fetch();
    commandsList.forEach((slashCommand) => {
      // console.log(`Alterando permissão do comando ${slashCommand.name}`);
      slashCommand.permissions.add({ permissions });
    });

    console.log(`Permissões de comandos slash configuradas!`);
  }

  public start() {
    Bot.client.login(this.token);
  }
}

export default Bot;
