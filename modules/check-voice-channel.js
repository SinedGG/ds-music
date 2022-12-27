const { PermissionsBitField } = require("discord.js");

module.exports = (interaction) => {
  const voiceChannel = interaction.member.voice.channel;
  if (!voiceChannel) {
    interaction.reply(
      "Ви повинні перебувати у голосовому каналі щоб скористатись комндаю!"
    );
    return false;
  } else if (
    !voiceChannel
      .permissionsFor(interaction.guild.members.me)
      .has(PermissionsBitField.Flags.Connect)
  ) {
    interaction.reply("У мене немає дозволу на приєднання до цього каналу!");
    return false;
  } else if (
    !voiceChannel
      .permissionsFor(interaction.guild.members.me)
      .has(PermissionsBitField.Flags.Speak)
  ) {
    interaction.reply("У мене немає дозволу говорити в цьому каналі!");
    return false;
  }

  return true;
};
