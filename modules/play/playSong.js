const logTrack = require("../output/sendTrack.js")
const activity = require("../output/setActivity.js")

const ytdl = require("ytdl-core");

function playSong(bot, message) {
    var server = bot.servers[message.guild.id];

    const source = ytdl(server.queue.url[0], {
      filter: "audioonly",
      quality: "highestaudio",
      //opusEncoded: true,
    });
  
    logTrack(message, server.queue.url[0], server.queue.reuested[0], bot.servers);
    activity(bot, server.queue.url[0])
    server.dispatcher = server.connection.play(source);
    server.queue.url.shift();
    server.queue.reuested.shift();
    server.dispatcher.on("finish", () => {
      if(server.last_message) server.last_message.reactions.removeAll();
      if (server.queue.url[0]) {
        playSong(bot, message);
      } else {
        server.connection.disconnect();
        bot.user.setPresence({
          activity: {
            name: "Окей лестгоу!",
            type: "LISTENING",
          },
        })
      }
    });
  }
module.exports = playSong;