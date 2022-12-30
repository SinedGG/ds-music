require("dotenv").config();

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
  const connection = getVoiceConnection(guild_id);

  const stream = ytdl(song.url, {
    highWaterMark: 1024 * 1024 * 64,
    filter: "audioonly",
    quality: "highestaudio",
    requestOptions: {
      headers: {
        cookie: process.env.COOKIE,
      },
    },
  })
    .on("error", (err) => {
      console.log("ytdl err", err.message);
    })
    .on("info", (info) => {
      require("./output/sendTrack.js")(
        info,
        song.requested,
        "699526377635971103"
      );
    });
  const resource = createAudioResource(stream);
  server.player = createAudioPlayer();
  connection.subscribe(server.player);
  server.player.play(resource);

  server.player.on(AudioPlayerStatus.Idle, async () => {
    await require("./remove-buttons.js")(guild_id);
    const song = queue.next(guild_id);
    if (!song) return connection.destroy();
    playSong(guild_id, song);
  });
  server.player.on("error", (err) => {});
}

module.exports = playSong;
