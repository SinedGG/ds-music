const logPlaylist = require("./output/sendPlaylist.js");
const YouTubeAPI = require("simple-youtube-api");
const ytdl = require("ytdl-core");
var youtube;
var server;

const connect = require("./connect.js");

function main(bot, message, searchContent) {
  youtube = new YouTubeAPI(bot.config.YT_TOKEN);
  server = bot.servers[message.guild.id];
  if (
    (message.content.includes("youtube.com") ||
      message.content.includes("youtu.be")) &&
    message.content.includes("https://")
  ) {
    if (message.content.includes("list")) {
      serchList(bot, message, searchContent);
    } else {
      validateURL(bot, message, searchContent);
    }
  } else {
    serchByName(bot, message, searchContent);
  }
}

async function serchList(bot, message, searchContent) {

  var playlist_size = 1000;
  if (searchContent.includes("list=RD")) playlist_size = 30;
  try {
    var playlist = await youtube.getPlaylist(searchContent, {
      part: "snippet",
    });
    var videos = await playlist.getVideos(playlist_size, { part: "snippet" });

    for (let i = 0; i < videos.length; i++) {
      server.queue.url.push(videos[i].url);
      server.queue.requested.push(message.author);
    } 

      logPlaylist(message, videos.length, searchContent);
   
    message.react("✔️");
    message.react("📃");
    setTimeout(() => message.delete(), 15000);
    connect(bot, message);
  } catch (error) {
    if (!error.message.includes("No playlist ID found in URL")) {
      console.error(error.message);
    }
  }
}

function validateURL(bot, message, searchContent) {
  ytdl
    .getBasicInfo(searchContent)
    .then((info) => {
      server.queue.url.push(info.videoDetails.video_url);
      server.queue.requested.push(message.author);
      message.react("✔️");
      setTimeout(() => message.delete(), 15000);
      connect(bot, message);
    })
    .catch((err) => {
      console.log(err);
      message.react("❌");
      setTimeout(() => message.delete(), 15000);
    });
}

function serchByName(bot, message, searchContent) {
  youtube
    .searchVideos(searchContent, 1)
    .then((results) => {
      setTimeout(() => message.delete(), 15000);
      if (results == 0) return message.react("❌");
      server.queue.url.push(results[0].url);
      server.queue.requested.push(message.author);
      connect(bot, message);
      message.react("✔️");
    })
    .catch(console.log);
}

module.exports = main;
