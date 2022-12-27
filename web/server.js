const ytdl = require("ytdl-core");
const express = require("express");
const app = express();
const port = process.env.PORT || 80;

module.exports = (bot) => {
  app.get("/play", (req, res) => {
    var guild = req.query.guild;
    var url = req.query.url;
    var server = bot.servers[guild];

    if (guild && url && server && server.connection) {
      ytdl
        .getBasicInfo(url)
        .then((info) => {
          server.queue.url.push(info.videoDetails.video_url);
          server.queue.requested.push("web");
        })
        .catch((err) => {});
    }
    res.send("<script>window.close();</script>");
  });

  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
};
