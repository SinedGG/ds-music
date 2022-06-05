const queueControl = require("../modules/queueControl.js"),
  checkСriterion = require("../modules/checkСriterion.js"),
  serchSong = require("../modules/serchSong.js"),
  command = require("../commands/index.js"),
  msgCon = require("../modules/messageControl.js");

module.exports = (bot, db) => {
  bot.on("messageCreate", (message) => {
    if (message.author.bot) return;

    var args = message.content.split(" ");

    switch (args[0]) {
      case "1play":
        if (checkСriterion(bot, message)) {
          serchSong(bot, message, message.content.replace("1play ", ""));
        }
        break;
      case "1skip":
        msgCon.del(message, 15);
        queueControl.skip(message, bot.servers);
        break;
      case "1stop":
        msgCon.del(message, 15);
        queueControl.stop(message, bot.servers);
        break;
      case "1prew":
        msgCon.del(message, 15);
        queueControl.prew(message, bot.servers);
        break;
      case "1pause":
        msgCon.del(message, 15);
        queueControl.pause(message, bot.servers);
        break;
      case "1resume":
        msgCon.del(message, 15);
        queueControl.resume(message, bot.servers);
        break;
      case "1insert":
        msgCon.del(message, 15);
        queueControl.insert(message, bot.servers);
        break;
      case "1mix":
        msgCon.del(message, 15);
        queueControl.mix(message, bot.servers);
        break;
      case "1help":
        command.help(message);
        break;
      case "1setchannel":
        command.setChannel(message, db);
        break;
      default:
        if (
          message.content.includes("youtube.com") ||
          message.content.includes("youtu.be")
        ) {
          db.query(
            `SELECT * FROM channels WHERE guild_id = ${message.guild.id}`,
            (err, rows) => {
              if (err) {
                console.log(err);
              } else {
                if (rows.length > 0) {
                  if (
                    message.channel == rows[0].channel_id &&
                    checkСriterion(bot, message)
                  ) {
                    serchSong(
                      bot,
                      message,
                      message.content.replace("1play ", "")
                    );
                    return;
                  }
                } else {
                  //to do something
                }
              }
            }
          );
        }
        break;
    }
  });
};
