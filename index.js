const  Discord = require("discord.js");
require("dotenv").config();
const bot = new Discord.Client();

const ytdl = require("discord-ytdl-core");

var servers = {}

bot.on("message", (message) => {

  var args = message.content.split(" ")

  function play (connection, message){
    var server = servers[message.guild.id];

    const source = ytdl(server.queue[0], {
      filter: "audioonly",
      quality: "highestaudio",
      //highWaterMark: 1 << 25,
      opusEncoded: true,
    });

    server.dispatcher = connection.play(source , { type: "opus" , volume : 1 });

    server.queue.shift();

    server.dispatcher.on("end", () =>{
      if(server.queue[0]){
        play(connection, message);
      }else{
        connection.disconnect();
      }
    })
  }

  function skip(){
    servers[message.guild.id].dispatcher.end();
  }

  function stop(){
    servers[message.guild.id].queue = [];
    servers[message.guild.id].dispatcher.end();
  }

  switch (args[0]) {
    case "play":

      const voiceChannel = message.member.voice.channel;

      if (!voiceChannel) return message.channel.send("Ви повинні перебувати у голосовому каналі щоб скористатись комндаю!");
      if (!voiceChannel.permissionsFor(message.client.user).has("CONNECT")) return message.channel.send("I don't have permission to join the voice channel");
      if (!voiceChannel.permissionsFor(message.client.user).has("SPEAK")) return message.channel.send("I don't have permission to speak in the voice channel");
      if(!servers[message.guild.id]) servers[message.guild.id] = {queue: []}

      servers[message.guild.id].queue.push(args[1]);

      try {
        if(!message.guild.voice.channelID) message.member.voice.channel.join().then( (connection) =>{
          play(connection, message)
        })
      } catch (error) {
        message.member.voice.channel.join().then( (connection) =>{
          play(connection, message)
        })
      }
     

      break;
      
   case "skip":
      skip();
     break;
  }
});

bot.on("ready", () => {
  console.log(`Logged in as ${bot.user.tag}`);

});


bot.login(process.env.TOKEN);