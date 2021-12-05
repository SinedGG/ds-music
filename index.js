const Discord = require("discord.js");
require("dotenv").config();
const bot = new Discord.Client();
const { MessageEmbed } = require("discord.js");

const ytdl = require("ytdl-core");
const toNormalTime = require("./utils/toNormalTime.js");

const YouTubeAPI = require("simple-youtube-api");
const youtube = new YouTubeAPI(process.env.YT_TOKEN);

var servers = {};

function preCheck(message, url) {
  //message.delete({ timeout: 2000 });
  if(!message.content.includes("youtube.com")) return message.channel.send(
    "Я тимчасово не підтримую пошук треків. Використайте URL посилання"
  );
  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel)
    return message.channel.send(
      "Ви повинні перебувати у голосовому каналі щоб скористатись комндаю!"
    );
  if (!voiceChannel.permissionsFor(message.client.user).has("CONNECT"))
    return message.channel.send(
      "У мене немає дозволу на приєднання до цього каналу!"
    );
  if (!voiceChannel.permissionsFor(message.client.user).has("SPEAK"))
    return message.channel.send(
      "У мене немає дозволу говорити в цьому каналі!"
    );
  if (!servers[message.guild.id])
    servers[message.guild.id] = { queue: { url: [], reuested: [] }, last_message: null};

  searchSong(message, url, () => {
    if (bot.voice.connections.size == 0)
      message.member.voice.channel.join().then((connection) => {
        playVoice(connection, message);
      });
  });
}

async function searchSong(message, url, callback) {
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
      logPlaylist(message, videos.length);
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
    if(server.last_message) server.last_message.reactions.removeAll();
    if (server.queue.url[0]) {
      playVoice(connection, message);
    } else {
      connection.disconnect();
    }
  });
}

function skip(message) {
  var server = servers[message.guild.id];
  if (server.dispatcher) server.dispatcher.end();
}

function stop(message) {
  servers[message.guild.id].queue = { url: [], reuested: [] };
  servers[message.guild.id].dispatcher.end();
}

function logPlaylist(message, count) {
  message.channel.send(`В чергу додано ${count} записів `);
}

async function logTrack(message, url, author) {
  var ytdata = await ytdl.getBasicInfo(url);
  message.channel
    .send(
      new MessageEmbed()
        .setColor("#f6971c")
        .setAuthor(
          "Зараз грає",
          "https://img.icons8.com/office/16/000000/cd--v2.gif"
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
        .addField("URL", ytdata.videoDetails.video_url)
        .setTimestamp()
        .setFooter("SDED Community ")
    )
    .then((embedMessage) => {
      servers[message.guild.id].last_message = embedMessage;
      reactionPanel(embedMessage);
    });
}

function reactionPanel(embed) {
  embed.react("⏮");
  embed.react("⏹️");
  embed.react("⏭");
}

bot.on("message", (message) => {
  var args = message.content.split(" ");

  if (message.channel == process.env.MUSIC_CHANNEL && !message.author.bot && !message.content.startsWith("1")) {
    preCheck(message, args[0]);
  }

  switch (args[0]) {
    case "1play":
      preCheck(message, args[1]);
      break;
    case "1skip":
      skip(message);
      break;
    case "1stop":
      stop(message);
      break;
  }
});

bot.on("messageReactionAdd", (reaction, user) => {
  if (user.bot) return;
  if (reaction.message.channel != process.env.MUSIC_CHANNEL) return;
  switch (reaction.emoji.name) {
    case "⏮":
      break;
    case "⏹️":
      skip(reaction.message);
      break;
    case "⏭":
      skip(reaction.message);
      break;
  }
});


bot.on("message" , (message) =>{
if(message.content =="test"){
  reactionPanel(message)
  setTimeout(() => {
    message.reactions.removeAll();
  }, 2500);
}
})


bot.on("ready", () => {
  console.log(`Logged in as ${bot.user.tag}`);
});

bot.login(process.env.TOKEN);
