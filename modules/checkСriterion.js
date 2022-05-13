function preCheck(bot, message) {
  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel) {
    message.channel.send(
      "Ви повинні перебувати у голосовому каналі щоб скористатись комндаю!"
    );
    return false;
  }
  if (!voiceChannel.permissionsFor(message.client.user).has("CONNECT")) {
    message.channel.send("У мене немає дозволу на приєднання до цього каналу!");
    return false;
  }
  if (!voiceChannel.permissionsFor(message.client.user).has("SPEAK")) {
    message.channel.send("У мене немає дозволу говорити в цьому каналі!");
    return false;
  }

  if (!bot.servers[message.guild.id])
    bot.servers[message.guild.id] = {
      queue: { url: [], requested: [], position: 0 },
      last_message: null,
      connection: null
    };
  return true;
}

module.exports = preCheck;
