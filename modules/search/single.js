const ytdl = require("ytdl-core");

module.exports = (url) => {
  return new Promise(async (resolve, reject) => {
    try {
      const info = await ytdl.getBasicInfo(url);
      const id = info.videoDetails.videoId;
      resolve(id);
    } catch (err) {
      reject(new Error());
    }
  });
};
