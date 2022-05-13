function r(bot) {
  bot.on("voiceStateUpdate", (oldState, newState) => {
    if (
      oldState.channelId &&
      !newState.channelId &&
      oldState.id == bot.user.id
    ) {
      if (bot.servers[oldState.guild.id]) {
        bot.servers[oldState.guild.id].dispatcher.stop();
        bot.servers[oldState.guild.id] = null;
      }
    }
  });
}
module.exports = r;
