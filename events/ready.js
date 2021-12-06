function r(bot) {
  bot.on("ready", () => {
    console.log(`Logged in as ${bot.user.tag}`);
    console.log(bot.servers)
  });
}
module.exports = r;