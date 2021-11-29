import Command from "../interfaces/Command";

export const serverInfo: Command = {
  name: "serverinfo",
  description: "Dá informações sobre o servidor",
  run: async (interaction) => {
    await interaction.reply({
      content: `Nome do servidor: ${interaction.guild.name}\nNúmero de membros: ${interaction.guild.memberCount}\n`,
      ephemeral: true,
    });
  },
};
