import Command from "../interfaces/Command";

export const ping: Command = {
  name: "ping",
  description: 'Responde com pong',
  run: async (interaction) => {
    await interaction.reply("Pong");
  },
};
