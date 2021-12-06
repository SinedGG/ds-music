const logTrack = require("../output/sendTrack.js")
const ytdl = require("ytdl-core");

function playSong(bot, connection, message) {
    console.log(message.guild)
    var server = bot.servers[message.guild.id];
    
    console.log(server)

    const source = ytdl(server.queue.url[0], {
      filter: "audioonly",
      quality: "highestaudio",
      //opusEncoded: true,
    });
  
    logTrack(message, server.queue.url[0], server.queue.reuested[0], bot.servers);
    server.dispatcher = connection.play(source);
    server.queue.url.shift();
    server.queue.reuested.shift();
    server.dispatcher.on("finish", () => {
      if(server.last_message) server.last_message.reactions.removeAll();
      if (server.queue.url[0]) {
        playSong(bot, connection, message);
      } else {
        connection.disconnect();
      }
    });
  }
module.exports = playSong;