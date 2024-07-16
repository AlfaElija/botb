const { texts, DM } = require("../../config.json");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  application: {
    name: "balance",
    description: "get balance",
  },
  async start(bot, msg, args) {
    try {
      let userCoins = await bot.db.get(`users.${msg.member.id}.coins`);
      if (!userCoins) {
        await bot.db.set(`users.${msg.member.id}.coins`, 0);
        userCoins = 0;
      }
      const embed = new EmbedBuilder()
          .setColor("#30fc03")
          .setTitle(`${await texts.balance.sc} ${userCoins}`);
      msg.reply({
        content: "",
        embeds: [embed]
      });
    } catch (error) {
      console.error("An error occurred during balance command execution:", error);
    }
  },
};