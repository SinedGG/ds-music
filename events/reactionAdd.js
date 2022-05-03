const queueControl = require("../modules/queueControl.js");

module.exports = (bot) => {
  bot.on("messageReactionAdd", (reaction, user) => {
    if (user.bot) return;
    if (reaction.message.channel != process.env.MUSIC_CHANNEL) return;
    switch (reaction.emoji.name) {
      case "⏮":
        queueControl.prew(reaction.message, bot.servers);
        break;
      case "⏹️":
        queueControl.stop(reaction.message, bot.servers);
        break;
      case "⏭":
        queueControl.skip(reaction.message, bot.servers);
        break;
    }
  });
};
