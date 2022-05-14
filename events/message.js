const queueControl = require("../modules/queueControl.js");
const checkСriterion = require("../modules/checkСriterion.js");
const serchSong = require("../modules/serchSong.js");
const command = require("../commands/index.js")


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
        setTimeout(() => message.delete(), 15000);
        queueControl.skip(message, bot.servers);
        break;
      case "1stop":
        setTimeout(() => message.delete(), 15000);
        queueControl.stop(message, bot.servers);
        break;
      case "1prew":
        setTimeout(() => message.delete(), 15000);
        queueControl.prew(message, bot.servers);
        break;
      case "1setchannel":
        command.setChannel(message, db);
        break;
      default:
        db.query(
          `SELECT * FROM channels WHERE guild_id = ${message.guild.id}`,
          (err, rows) => {
            if (err) {
              console.log(err);
            } else {
              if (rows.length > 0) {
                if (
                  message.channel == rows[0].channel_id  &&
                  checkСriterion(bot, message) && (message.content.includes("youtube.com") ||
                  message.content.includes("youtu.be"))
                ) {
                  serchSong(bot, message, args[0]);
                  return;
                } else {
                  //setTimeout(() => message.delete(), 15000);
                }
              } else {
                //to do something 
              }
            }
          }
        );
        break;
    }
  });
};
