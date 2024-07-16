const { texts, DM} = require("../config.json");
const { EmbedBuilder } = require("discord.js");
const { db } = require("../database.js");

module.exports = {
  application: {
    name: "balance",
    description: "get balance",
  },
  start(bot, msg, args) {
    try {
      if (!db().users[msg.member.id]) {
        db().users[msg.member.id] = { coins: 0 };
      }
      if (!db().users[msg.member.id].coins) {
        db().users[msg.member.id].coins = 0;
      }
      const userCoins = db().users[msg.member.id].coins;
      const embed = new EmbedBuilder()
        .setColor("#30fc03")
        .setTitle(texts.balance.sc + userCoins);
      msg.reply({
        content: "",
        embeds: [embed]
      });
    } catch (error) {
      console.error("An error occurred during balance command execution:", error);
    }
  },
};