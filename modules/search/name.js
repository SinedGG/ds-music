require("dotenv").config();
const axios = require("axios");

module.exports = (q) => {
  return new Promise(async (resolve, reject) => {
    const api_key = process.env.YT_TOKEN;

    try {
      const request = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${q}&safeSearch=none&type=video&key=${api_key}`;
      const res = await axios.get(request);
      const out = res.data.items[0].id.videoId;
      resolve(out);
    } catch (err) {
      reject(err);
    }
  });
};
