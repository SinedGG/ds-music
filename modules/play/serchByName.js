const YouTubeAPI = require("simple-youtube-api");
const connect = require("../connect.js");

function serchByName(bot, message, arg) {
  const youtube = new YouTubeAPI(bot.config.YT_TOKEN);
  var server = bot.servers[message.guild.id];

  youtube
    .searchVideos(arg, 1)
    .then((results) => {
        message.delete({ timeout: 15000 });
        if(results == 0) return message.react("❌")
        server.queue.url.push(results[0].url);
        server.queue.reuested.push(message.author);
        connect(bot, message);
        message.react("✔️");
    })
    .catch(console.log);
}
module.exports = serchByName;