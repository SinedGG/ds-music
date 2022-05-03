const logTrack = require("../output/sendTrack.js");
const queueControl = require("../queueControl.js");

const ytdl = require("ytdl-core");

function playSong(bot, message) {
  var server = bot.servers[message.guild.id];

  const stream = ytdl(server.queue.url[server.queue.position], {
    filter: "audioonly",
    quality: "highestaudio",
  });

  logTrack(message, bot.servers, server.queue.position);
  server.dispatcher = server.connection.play(stream);
  server.queue.position++;
  
  server.dispatcher.on("finish", () => {
    console.log('finis')
    if (server.last_message) server.last_message.reactions.removeAll();
    if (server.queue.url[server.queue.position]) {
      playSong(bot, message);
    } else {
      queueControl.stop(message, bot.servers);
    }
  }).on('error', err =>{
    console.log('Player error',err);
    if (server.last_message) server.last_message.reactions.removeAll();
    if (server.queue.url[server.queue.position]) {
      playSong(bot, message);
    } else {
      queueControl.stop(message, bot.servers);
    }
  });
  
}
module.exports = playSong;
