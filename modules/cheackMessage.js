const searchSong = require("./play/serchSong.js")
const playSong = require("./play/playSong.js")

function preCheck(bot ,message, url) {
    message.delete({ timeout: 2000 });
    if(!message.content.includes("youtube.com")) return message.channel.send(
      "Я тимчасово не підтримую пошук треків. Використайте URL посилання"
    );
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
    if (!bot.servers[message.guild.id]) bot.servers[message.guild.id] = { queue: { url: [], reuested: [] }, last_message: null};
    searchSong(bot, message, url, () => {
      if (bot.voice.connections.size == 0)
        message.member.voice.channel.join().then((connection) => {
          playSong(bot, connection, message);
        });
    });
  }

  module.exports = preCheck;