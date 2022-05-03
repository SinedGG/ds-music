function check(bot, message){
    if (!bot.servers[message.guild.id].connection.channel.id == message.member.voice.channel.id){
        return true;
    };
    return false;
}