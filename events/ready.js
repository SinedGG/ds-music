
function r(bot) {
  bot.on("ready", () => {
    console.log(`Logged in as ${bot.user.tag}`);
  });
}
module.exports = r;