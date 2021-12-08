const logPlaylist = require("../output/sendPlaylist.js")
const YouTubeAPI = require("simple-youtube-api");
const ytdl = require("ytdl-core");

async function searchSong(bot, message, url, callback) {
  const youtube = new YouTubeAPI(bot.config.YT_TOKEN);
  var server = bot.servers[message.guild.id];

  if (url.includes("youtube.com")|| url.includes("youtu.be")) {
    var playlist_size = 1000;
    if (url.includes("list=RD")) playlist_size = 30;
    try {
      var playlist = await youtube.getPlaylist(url, { part: "snippet" });
      var videos = await playlist.getVideos(playlist_size, { part: "snippet" });

      for (let i = 0; i < videos.length; i++) {
        server.queue.url.push(videos[i].url);
        server.queue.reuested.push(message.author);
      }
      logPlaylist(message, videos.length, url);
      callback();
    } catch (error) {
      console.error(error);

      try {
        ytdl.getBasicInfo(url).then((info) => {
          server.queue.url.push(info.videoDetails.video_url);
          server.queue.reuested.push(message.author);
          callback();
        });
      } catch (error) {
        console.error(error);
      }
    }
  }
}
module.exports = searchSong;
