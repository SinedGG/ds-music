const { get_text, get_message } = require("./queue-control.js");
const bot = require("../index.js");

module.exports = (guild_id) => {
  return new Promise(async (resolve, reject) => {
    const channel = await bot.channels.cache.get(get_text(guild_id));
    const message = await channel.messages.fetch(get_message(guild_id));
    await message.edit({ components: [] });
    resolve();
  });
};
