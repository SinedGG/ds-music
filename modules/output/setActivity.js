const ytdl = require("ytdl-core");

async function activity(bot, url){
    var ytdata = await ytdl.getBasicInfo(url);
    bot.user.setPresence({
        activity: {
          name: ytdata.videoDetails.title,
          type: "LISTENING",
        },
      })
}

module.exports = activity;