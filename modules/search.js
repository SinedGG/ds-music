const single_url = require("./search/single.js");
const list = require("./search/list.js");
const name = require("./search/name.js");
const log_playlist = require("./output/sendPlaylist.js");
module.exports = (param, guild_id, requested) => {
  return new Promise(async (resolve, reject) => {
    var output;
    try {
      if (param.includes("youtube.com") || param.includes("youtu.be")) {
        if (param.includes("playlist?")) {
          output = await list(param);
          log_playlist(guild_id, requested, output.length);
        } else output = await single_url(param);
      } else output = await name(param);

      resolve(output);
    } catch (error) {
      console.log(error);
      reject();
    }
  });
};
