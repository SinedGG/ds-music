const logTrack = require("./output/sendTrack.js");
const queueControl = require("./queueControl.js");
const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
} = require("@discordjs/voice");
const ytdl = require("ytdl-core");

function playSong(bot, message) {
  var server = bot.servers[message.guild.id];

 

  const stream = ytdl(
    server.queue.url[server.queue.position],
    {
      highWaterMark: 1024 * 1024 * 64,
      filter: "audioonly",
    }
  );
  const resource = createAudioResource(stream, {
    inlineVolume: true,
  });
  resource.volume.setVolume(1);
  server.dispatcher = createAudioPlayer();
  server.connection.subscribe(server.dispatcher);
 
  logTrack(message, bot.servers, server.queue.position);
  server.dispatcher.play(resource);
  server.queue.position++;

  server.dispatcher.on("error", (error) => {
    console.log(error);
    if (server.last_message) server.last_message.reactions.removeAll();
    if (server.queue.url[server.queue.position]) {
      playSong(bot, message);
    } else {
      queueControl.stop(message, bot.servers);
    }
  });

  server.dispatcher.on("idle", () => {
    if (server.last_message) server.last_message.reactions.removeAll();
    if (server.queue.url[server.queue.position]) {
      playSong(bot, message);
    } else {
      queueControl.stop(message, bot.servers);
    }
  });
}
module.exports = playSong;
