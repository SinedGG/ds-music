const { getVoiceConnection } = require("@discordjs/voice");
var sessions = {};

module.exports = {
  sessions,
  connected: (guild_id) => {
    return sessions[guild_id] && sessions[guild_id].voice_id ? true : false;
  },

  create: (guild_id) => {
    if (!sessions[guild_id]) {
      sessions[guild_id] = {
        queue: [],
        position: 0,
        last_message: null,
        voice_id: null,
        text_id: null,
        player: null,
      };
    }
  },
  set_voice: (guild_id, voice_id) => {
    sessions[guild_id].voice_id = voice_id;
  },

  set_text: (guild_id, text_id) => {
    sessions[guild_id].text_id = text_id;
  },

  set_message: (guild_id, message_id) => {
    sessions[guild_id].last_message = message_id;
  },

  get_message: (guild_id) => {
    return sessions[guild_id].last_message;
  },

  get_text: (guild_id) => {
    return sessions[guild_id].text_id;
  },

  push: (guild_id, member_id, id) => {
    if (typeof id != "string") {
      for (let i = 0; i < id.length; i++) {
        sessions[guild_id].queue.push({ url: id[i], requested: member_id });
      }
    } else sessions[guild_id].queue.push({ url: id, requested: member_id });
  },

  next: (guild_id) => {
    var server = sessions[guild_id];
    const song = server.queue[server.position];
    sessions[guild_id].position++;
    return song;
  },

  stop: async (guild_id) => {
    await require("./remove-buttons.js")(guild_id);
    sessions[guild_id].player.stop();
    sessions[guild_id] = null;
    console.log(`Stopped in guild ${guild_id}`);
  },
  skip: async (guild_id, number) => {
    await require("./remove-buttons.js")(guild_id);
    if (number) sessions[guild_id].position += number - 1;
    sessions[guild_id].player.stop();
    console.log(`Skipped in guild ${guild_id}`);
  },

  prew: function (guild_id, number) {
    if (sessions[guild_id].position - 1 < 0) return;
    if (number) sessions[guild_id].position -= number;
    else sessions[guild_id].position -= 2;
    sessions[guild_id].player.stop();
  },

  mix: function (guild_id) {
    var server = servers[message.guild.id];
    for (var i = server.queue.url.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = sessions[guild_id].queue[i];
      sessions[guild_id].queue[i] = server.queue.url[j];
      sessions[guild_id].queue[j] = temp;
    }
  },
};
