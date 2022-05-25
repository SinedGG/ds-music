const ytdl = require("ytdl-core");
const express = require("express");
const app = express();
const port = process.env.PORT || 80;

module.exports = (bot) => {
  app.get("/play", (req, res) => {
    var guild = req.query.guild;
    var url = req.query.url;
    var server = bot.servers[guild];

    if (guild && url && server && server.connection) {
      ytdl
        .getBasicInfo(url)
        .then((info) => {
          server.queue.url.push(info.videoDetails.video_url);
          server.queue.requested.push("web");
        })
        .catch((err) => {});
    }
    res.send("<script>window.close();</script>");
  });

  function voiceXP(bot, db) {
    const Guilds = bot.guilds.cache.get("534488687426404372");
    const voiceChannels = Guilds.channels.cache.filter(
      (m) => m.type === "GUILD_VOICE"
    );

    for (const [id, voiceChannel] of voiceChannels) {
      if (voiceChannel.id != Guilds.afkChannelId) {
        var active_user_count = 0;
        for (const [id, Guildmember] of voiceChannel.members) {
          if (
            !Guildmember.user.bot &&
            !Guilds.voiceStates.cache.get(Guildmember.id).selfDeaf
          ) {
            active_user_count++;
          }
        }
        if (active_user_count > 1) {
          for (const [id, Guildmember] of voiceChannel.members) {
            if (
              !Guildmember.user.bot &&
              !Guilds.voiceStates.cache.get(Guildmember.id).selfDeaf
            ) {
              if (Guilds.voiceStates.cache.get(Guildmember.id).selfMute) {
                addXP(Guildmember.user.tag, Guildmember.id, 1, db, bot);
              } else {
                addXP(
                  Guildmember.user.tag,
                  Guildmember.id,
                  cfgXP.voice,
                  db,
                  bot
                );
              }
            }
          }
        }
      }
    }
  }

  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
};
