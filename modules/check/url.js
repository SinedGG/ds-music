module.exports = (interaction) => {
  const param = interaction.options.getString("url-or-name");
  if (param.includes("youtube.com") || param.includes("youtu.be")) return true;
  interaction.reply("URL не підтримується");
};
