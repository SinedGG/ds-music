const searchSong = require("./play/serchURL.js")
const playSong = require("./play/playSong.js")

function preCheck(bot , message) {
  
    //message.delete({ timeout: 15000 });
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
      return message.channel.send(
        "Ви повинні перебувати у голосовому каналі щоб скористатись комндаю!"
      );
    if (!voiceChannel.permissionsFor(message.client.user).has("CONNECT"))
      return message.channel.send(
        "У мене немає дозволу на приєднання до цього каналу!"
      );
    if (!voiceChannel.permissionsFor(message.client.user).has("SPEAK"))
      return message.channel.send(
        "У мене немає дозволу говорити в цьому каналі!"
      );
    if (!bot.servers[message.guild.id]) bot.servers[message.guild.id] = { queue: { url: [], reuested: [] }, last_message: null, connection: null};
    return true;
  }

  module.exports = preCheck;