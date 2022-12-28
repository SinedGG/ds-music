const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

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

module.exports = row;
