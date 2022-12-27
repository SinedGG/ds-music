const single_url = require("./search/single.js");
const list = require("./search/list.js");

module.exports = (param) => {
  return new Promise(async (resolve, reject) => {
    var output;
    try {
      if (param.includes("youtube.com") || param.includes("youtu.be")) {
        if (param.includes("playlist?")) output = await list(param);
        else output = await single_url(param);
      } else {
        console.log(`search by name `);
      }
      resolve(output);
    } catch (error) {
      console.log(error);
      reject();
    }
  });
};
