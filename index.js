const Discord = require("discord.js");
require("dotenv").config();
const bot = new Discord.Client();
const { MessageEmbed } = require("discord.js");

const ytdl = require("ytdl-core");
const toNormalTime = require("./utils/toNormalTime.js");

const YouTubeAPI = require("simple-youtube-api");
const youtube = new YouTubeAPI(process.env.YT_TOKEN);

var servers = {};

function preCheck(message, url ){

  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel)
    return message.channel.send(
      "Ви повинні перебувати у голосовому каналі щоб скористатись комндаю!"
    );
  if (!voiceChannel.permissionsFor(message.client.user).has("CONNECT"))
    return message.channel.send(
      "I don't have permission to join the voice channel"
    );
  if (!voiceChannel.permissionsFor(message.client.user).has("SPEAK"))
    return message.channel.send(
      "I don't have permission to speak in the voice channel"
    );
  if (!servers[message.guild.id])
    servers[message.guild.id] = { queue: { url: [], reuested: [] } };
    
    searchSong(message, url, () =>{
      try {
        if (!message.guild.voice.channelID)
          message.member.voice.channel.join().then((connection) => {
          playVoice(connection, message);
          });
      } catch (error) {
        message.member.voice.channel.join().then((connection) => {
          playVoice(connection, message);
        });
      }
    })
}

async function searchSong(message,url, callback) {
  var server = servers[message.guild.id];

  if (url.includes("youtube.com")) {
    var playlist_size = 1000;
    if (url.includes("list=RD")) playlist_size = 25;
    try {
      var playlist = await youtube.getPlaylist(url, { part: "snippet" });
      var videos = await playlist.getVideos(playlist_size, { part: "snippet" });

      for (let i = 0; i < videos.length; i++) {
        server.queue.url.push(videos[i].url);
        server.queue.reuested.push(message.author);
      }
      logPlaylist(message, videos.length)
      callback();
    } catch (error) {
      console.error(error);
    }
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

function play(message, url) {

  servers[message.guild.id].queue.url.push(url);
  servers[message.guild.id].queue.reuested.push(message.author);

  try {
    if (!message.guild.voice.channelID)
      message.member.voice.channel.join().then((connection) => {
        playVoice(connection, message);
      });
  } catch (error) {
    message.member.voice.channel.join().then((connection) => {
      playVoice(connection, message);
    });
  }
}

function playVoice(connection, message) {
  var server = servers[message.guild.id];

  const source = ytdl(server.queue.url[0], {
    filter: "audioonly",
    quality: "highestaudio",
    //opusEncoded: true,
  });

  logTrack(message, server.queue.url[0], server.queue.reuested[0]);
  server.dispatcher = connection.play(source);
  server.queue.url.shift();
  server.queue.reuested.shift();
  server.dispatcher.on("finish", () => {
    console.log("Queue end");
    if (server.queue.url[0]) {
      playVoice(connection, message);
    } else {
      connection.disconnect();
    }
  });
}

function skip(message) {
  var server = servers[message.guild.id];
  console.log(server);
  if (server.dispatcher) server.dispatcher.end();
}

function stop(message) {
  servers[message.guild.id].queue = { url: [], reuested: [] };
  servers[message.guild.id].dispatcher.end();
}

function logPlaylist(message, count){
  message.channel.send(`В чергу додано ${count} записів `)
}

async function logTrack(message, url, author) {
  var ytdata = await ytdl.getBasicInfo(url);
  message.channel.send(
    new MessageEmbed()
      .setColor("#f6971c")
      .setAuthor(
        "Зараз грає",
        "https://cdn.dribbble.com/users/1366755/screenshots/6493370/attachments/1388539/player.gif?compress=1&resize=400x300"
      )
      .setThumbnail(
        ytdata.player_response.videoDetails.thumbnail.thumbnails[0].url
      )
      .addField("Назва", ytdata.videoDetails.title)
      .addField("Переглядів", ytdata.videoDetails.viewCount, true)
      .addField(
        "Тривалість",
        toNormalTime(ytdata.videoDetails.lengthSeconds),
        true
      )
      .addField("Запит", author, true)
      .setTimestamp()
      .setFooter("SDED Community ")
  );
}

bot.on("message", (message) => {
  var args = message.content.split(" ");

  if (message.channel == process.env.MUSIC_CHANNEL) {
    preCheck(message, args[0]);
  }

  switch (args[0]) {
    case "play":
      preCheck(message, args[1]);
      break;
    case "skip":
      skip(message);
      break;
    case "stop":
      stop(message);
      break;
  }
});


bot.on("ready", () => {
  console.log(`Logged in as ${bot.user.tag}`);
});

bot.login(process.env.TOKEN);
