const { Events } = require("discord.js");
const { destroy } = require("../modules/queue-control.js");

module.exports = {
  name: Events.VoiceStateUpdate,
  execute(oldState, newState) {
    if (
      oldState.member.id == oldState.guild.members.me &&
      oldState.channelId &&
      !newState.channelId
    ) {
      destroy(oldState.guild.id);
    }
  },
};
