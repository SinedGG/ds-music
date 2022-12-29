const { Events } = require("discord.js");
const { stop } = require("../modules/queue-control.js");

module.exports = {
  name: Events.VoiceStateUpdate,
  execute(oldState, newState) {
    if (oldState.member.user.bot && oldState.channelId && !newState.channelId)
      stop(oldState.guild.id);
  },
};
