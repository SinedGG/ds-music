const YouTubeAPI = require("simple-youtube-api"),
  ytdl = require("ytdl-core"),
  logPlaylist = require("./output/sendPlaylist.js"),
  queue = require("./queueControl.js"),
  msgCon = require("./messageControl.js");
var youtube, server;

const connect = require("./connect.js");

function main(bot, message, searchContent) {
  youtube = new YouTubeAPI(bot.config.YT_TOKEN);
  server = bot.servers[message.guild.id];
  if (
    (message.content.includes("youtube.com") ||
      message.content.includes("youtu.be")) &&
    message.content.includes("https://")
  ) {
    serchList(bot, message, searchContent);
  } else {
    serchByName(bot, message, searchContent);
  }
  msgCon.del(message, 15);
}

async function serchList(bot, message, searchContent) {
  var playlist_size = 1000;
  if (searchContent.includes("list=RD")) playlist_size = 30;
  try {
    var playlist = await youtube.getPlaylist(searchContent, {
      part: "snippet",
    });
    var videos = await playlist.getVideos(playlist_size, { part: "snippet" });
  } catch (error) {
    serchSingleURL(bot, message, searchContent);
    return;
  }
  for (let i = 0; i < videos.length; i++) {
    queue.add(server, videos[i].url, message.author);
  }
  logPlaylist(message, videos.length, searchContent);

  msgCon.react(message, "✔️");
  msgCon.react(message, "📃");
  connect(bot, message);
}

function serchSingleURL(bot, message, searchContent) {
  ytdl
    .getBasicInfo(searchContent)
    .then((info) => {
      queue.add(server, info.videoDetails.video_url, message.author);
      msgCon.react(message, "✔️");
      connect(bot, message);
    })
    .catch((err) => {
      console.log("serchSingleURL", err);
      msgCon.react(message, "❌");
    });
}

function serchByName(bot, message, searchContent) {
  youtube
    .searchVideos(searchContent, 1)
    .then((results) => {
      if (results == 0) return msgCon.react(message, "❌");
      queue.add(server, results[0].url, message.author);
      msgCon.react(message, "✔️");
      connect(bot, message);
    })
    .catch((err) => console.log("serchByName", err));
}

module.exports = main;
