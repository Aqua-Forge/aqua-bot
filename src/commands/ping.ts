import Command, { OptionType } from "../interfaces/Command";

export const ping: Command = {
  name: "ping",
  description: "Responde com pong",
  options: [
    {
      name: "nome",
      description: "nome da pessoa que vai receber o pong",
      type: OptionType.String,
    },
  ],
  run: async (interaction) => {
    const nome = interaction.options.getString("nome") || "";
    await interaction.reply(`Pong ${nome}`);
  },
};
