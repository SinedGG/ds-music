const logTrack = require("../output/sendTrack.js")
const queueControl = require("../queueControl.js");

const ytdl = require("ytdl-core");

function playSong(bot, message) {
    var server = bot.servers[message.guild.id];

    const source = ytdl(server.queue.url[server.queue.position], {
      filter: "audioonly",
      quality: "highestaudio",
      highWaterMark: 1 << 20,
      opusEncoded: true,
    });
  
    logTrack(message, bot.servers, server.queue.position);
    server.dispatcher = server.connection.play(source);
    server.queue.position++;
    server.dispatcher.on("finish", () => {
      if(server.last_message) server.last_message.reactions.removeAll();
      if (server.queue.url[server.queue.position]) {
        playSong(bot, message);
      } else {
        queueControl.stop(message, bot.servers);
      }
    });
  }
module.exports = playSong;