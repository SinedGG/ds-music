const { Events } = require("discord.js");

const { connected, prew, stop, skip } = require("../modules/queue-control.js");

module.exports = async (bot) => {
  bot.on(Events.InteractionCreate, (interaction) => {
    if (!interaction.isButton()) return;
    const guild_id = interaction.guild.id;
    if (!connected(guild_id)) return;
    if (interaction.customId === "next") skip(guild_id);
    else if (interaction.customId === "stop") stop(guild_id);
    else if (interaction.customId === "prew") prew(guild_id);
  });
};
