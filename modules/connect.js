const { joinVoiceChannel, VoiceConnectionStatus } = require("@discordjs/voice");
const queue = require("../modules/queue-control.js");

module.exports = (voice) => {
  return new Promise((resolve, reject) => {
    const connection = joinVoiceChannel({
      channelId: voice.channel.id,
      guildId: voice.channel.guild.id,
      adapterCreator: voice.channel.guild.voiceAdapterCreator,
    });

    connection.on(VoiceConnectionStatus.Ready, () => {
      console.log(
        `Successfully joined in voice channel - ${voice.channel.name} in guild - ${voice.channel.guild}`
      );
      queue.set_voice(voice.channel.guild.id, voice.channel.id);
      resolve();
    });
  });
};
