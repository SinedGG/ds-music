const single_url = require("./search/single.js");
const list = require("./search/list.js");
const name = require("./search/name.js");
const log_playlist = require("./output/sendPlaylist.js");
module.exports = (interaction, param) => {
  return new Promise(async (resolve, reject) => {
    var output;
    try {
      if (param.includes("youtube.com") || param.includes("youtu.be")) {
        if (param.includes("playlist?")) {
          const list_id = new URL(param).searchParams.get("list");
          output = await list(list_id);
          log_playlist(interaction, list_id, output.length);
        } else output = await single_url(param);
      } else output = await name(param);

      resolve(output);
    } catch (error) {
      console.log(error);
      reject();
    }
  });
};
