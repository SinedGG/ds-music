function r (message){
  message.channel
    .send(
      new MessageEmbed()
        .setColor("#f6971c")
        .setFooter("SDED Community ")
    )
}
module.exports = r;