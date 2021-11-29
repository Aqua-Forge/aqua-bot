import { SlashCommandBuilder } from "@discordjs/builders";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import Command from "../interfaces/Command";

class Rest {
  private rest: REST;
  private commands: Command[] = [];

  constructor(private token: string, private clientId: string, private guildId: string) {
    this.rest = new REST({ version: "9" }).setToken(this.token);
  }

  registerCommands(commands: Command[]) {
    this.commands = commands;
  }

  async start() {
    try {
      console.log("Inicializando os comandos de barra...");
      await this.rest.put(Routes.applicationGuildCommands(this.clientId, this.guildId), {
        body: this.commands.map((command) => {
          const data = new SlashCommandBuilder()
            .setName(command.name.toLowerCase())
            .setDescription(command.description);
          return data.toJSON();
        }),
      });
      console.log("Os comandos de barra foram inicializados com sucesso!");
    } catch (error) {
      console.error(error);
    }
  }
}

export default Rest;
