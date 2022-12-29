require("dotenv").config();
const axios = require("axios");

module.exports = (url) => {
  return new Promise(async (resolve, reject) => {
    const list_id = new URL(url).searchParams.get("list");
    const api_key = process.env.YT_TOKEN;
    var out = [];
    var page_token = "";

    try {
      do {
        const request = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${list_id}&pageToken=${page_token}&key=${api_key}&maxResults=1000`;
        const res = await axios.get(request);
        for (let j = 0; j < res.data.items.length; j++) {
          var id = res.data.items[j].snippet.resourceId.videoId;
          out.push(id);
        }
        page_token = res.data.nextPageToken;
      } while (page_token);
      resolve(out);
    } catch (err) {
      reject("[list] " + err.response.data.error.message);
    }
  });
};
