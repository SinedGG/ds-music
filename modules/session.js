var sessions = {};

module.exports = {
  get: (guild_id) => {
    return sessions[guild_id];
  },

  create: (guild_id) => {
    if (!this.get(guild_id))
      sessions[guild_id] = {
        queue: { url: [], requested: [], position: 0 },
        last_message: null,
        connection: null,
      };
  },
};
