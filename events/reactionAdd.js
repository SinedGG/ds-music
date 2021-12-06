const commands = require("../commands/main.js")

function r(bot) {
    bot.on("messageReactionAdd", (reaction, user) => {
        if (user.bot) return;
        if (reaction.message.channel != process.env.MUSIC_CHANNEL) return;
        switch (reaction.emoji.name) {
          case "⏮":
            break;
          case "⏹️":
            commands.stop(reaction.message, bot.servers);
            break;
          case "⏭":
            commands.skip(reaction.message, bot.servers);
            break;
        }
      });
  }
  module.exports = r;