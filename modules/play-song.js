const {
  createAudioPlayer,
  createAudioResource,
  getVoiceConnection,
  AudioPlayerStatus,
} = require("@discordjs/voice");
const ytdl = require("ytdl-core");
const queue = require("./queue-control.js");

function playSong(guild_id, song) {
  var server = queue.sessions[guild_id];
  const stream = ytdl(song.url, {
    highWaterMark: 1024 * 1024 * 64,
    filter: "audioonly",
    quality: "highestaudio",
  })
    .on("error", (err) => {
      console.log("ytdl err", err);
      next(guild_id);
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
  const connection = getVoiceConnection(guild_id);
  connection.subscribe(server.player);
  server.player.play(resource);

  server.player.on(AudioPlayerStatus.Idle, () => {
    next(guild_id);
  });
}

async function next(guild_id) {
  const song = queue.next(guild_id);
  await require("./remove-buttons.js")(guild_id);
  if (!song) return connection.destroy();
  playSong(guild_id, song);
}

module.exports = playSong;
