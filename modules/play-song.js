const {
  createAudioPlayer,
  createAudioResource,
  getVoiceConnection,
  AudioPlayerStatus,
} = require("@discordjs/voice");
const ytdl = require("ytdl-core");
const queue = require("./queue-control.js");

function playSong(guild_id) {
  var server = queue.sessions[guild_id];
  const song = queue.next(guild_id);
  if (!song) return queue.stop(guild_id);
  const stream = ytdl(song.url, {
    highWaterMark: 1024 * 1024 * 64,
    filter: "audioonly",
    quality: "highestaudio",
  })
    .on("error", (err) => {
      console.log("ytdl err", err);
    })
    .on("info", (info) => {
      require("./output/sendTrack.js")(
        info,
        song.requested,
        "699526377635971103"
      );
    });
  const resource = createAudioResource(stream, {
    inlineVolume: true,
  });
  server.player = createAudioPlayer();
  getVoiceConnection(guild_id).subscribe(server.player);
  server.player.play(resource);

  server.player.on(AudioPlayerStatus.Idle, () => {
    playSong(guild_id);

    //require("./remove-buttons.js")(guild_id);
  });
}

module.exports = playSong;
