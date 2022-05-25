module.exports = {
  del: function (message, time) {
    setTimeout(() => {
      message.delete().catch((error) => {});
    }, time * 1000);
  },
  react: function (message, reaction) {
    message.react(reaction).catch((error) => {});
  },
};
