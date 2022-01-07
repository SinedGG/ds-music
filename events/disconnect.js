function r(bot) {
  bot.on("voiceStateUpdate", (oldState, newState) => {
    if (!oldState.channelID) return;
    if (newState.channelID) return;
    if (newState.id !== bot.user.id) return;
    
    bot.servers[oldState.guild.id].queue = { url: [], reuested: [] };
    bot.servers[oldState.guild.id].dispatcher.end();
    bot.servers[oldState.guild.id] = null;
  });
}
module.exports = r;
