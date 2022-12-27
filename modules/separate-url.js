const queue = require("./queue-control.js");
const ytdl = require("ytdl-core");

module.exports = (message) => {
  return new Promise(async (resolve, reject) => {
    const param = message.options.getString("url-or-name");

    if (param.includes("youtube.com") || param.includes("youtu.be")) {
      try {
        const info = await ytdl.getBasicInfo(param);
        const id = info.videoDetails.videoId;
        queue.push(message, id);
        console.log(queue.sessions);
        resolve();
      } catch (error) {
        console.log(error);
      }
    }
  });
};
