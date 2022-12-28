const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Provides information about the user."),
  async execute(interaction) {
    // interaction.user is the object representing the User who ran the command
    // interaction.member is the GuildMember object, which represents the user in the specific guild
    console.log("interaction");
    console.log(interaction);

    const {
      ActionRowBuilder,
      ButtonBuilder,
      ButtonStyle,
    } = require("discord.js");

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("prew")
        .setLabel("⏮")
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId("stop")
        .setLabel("⏹")
        .setStyle(ButtonStyle.Danger),
      new ButtonBuilder()
        .setCustomId("next")
        .setLabel("⏭")
        .setStyle(ButtonStyle.Success)
    );
    await interaction.reply({
      content: "I think you should,",
      components: [row],
    });
  },
};
