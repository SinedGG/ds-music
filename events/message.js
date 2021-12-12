const commands = require("../commands/main.js");
const cheackСriterion = require("../modules/cheackСriterion.js");
const serchURL = require("../modules/play/serchURL.js");
const sertchByName = require("../modules/play/serchByName.js")


function r(bot) {
  bot.on("message", (message) => {
    if (message.channel != bot.config.music_channel) return;

    var args = message.content.split(" ");

    if (
      !message.author.bot &&
      message.content.startsWith("https://") &&
      (args[0].includes("youtube.com") || args[0].includes("youtu.be"))
    ) {
      if (cheackСriterion(bot, message)) {
        serchURL(bot, message, args[0]);
      }
    }
    switch (args[0]) {
      case "1play":
        if (cheackСriterion(bot, message)) {
          sertchByName(bot, message, message.content.replace("1play ", ""));
        }
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
