const commands = require("../commands/main.js")
const play = require("../modules/cheackMessage.js")

function r(bot) {
    bot.on("message", (message) => {
        if(message.channel != bot.config.music_channel) return;

        var args = message.content.split(" ");
      
        if (!message.author.bot && !message.content.startsWith("1")) {
            play(bot, message, args[0]);
            
        }
        switch (args[0]) {
          case "1play":
            play(bot ,message, args[1]);
            console.log("123")
            break;
          case "1skip":
            commands.skip(message, bot.servers);
            break;
          case "1stop":
            commands.stop(message, bot.servers);
            break;
        }
      });
  }
  module.exports = r;