const { texts, DM } = require("../../config.json");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    application: {
        name: "podarok",
        description: "Выдает вам 100 монет каждые 24 часа",
    },
    async start(bot, msg, args) {
        try {
            const userData = await bot.db.get(`users.${msg.member.id}`);
            if (!userData) {
                bot.db.set(`users.${msg.member.id}`, { coins: 0 });
            }
            if (!userData.coins) {
                userData.coins = 0;
            }

            let k = 1;
            if (
                userData.roles &&
                userData.roles.list &&
                userData.roles.list.includes("deluxe")
            ) {
                k = 2;
            } else if (
                userData.roles &&
                userData.roles.list &&
                userData.roles.list.includes("premium")
            ) {
                k = 1.5;
            } else if (
                userData.roles &&
                userData.roles.list &&
                userData.roles.list.includes("vip")
            ) {
                k = 1.2;
            }

            if (!userData.podarok_CD) {
                userData.coins += 100 * k;
                let date = new Date();
                date.setHours(date.getHours() + 24);
                userData.podarok_CD = date.getTime();
                msg.reply({
                    content: "",
                    embeds: [
                        new EmbedBuilder()
                            .setColor("#30fc03")
                            .setTitle(texts.podarok.sc + 100 * k + " монет"),
                    ],
                });
                bot.db.set(`users.${msg.member.id}`, userData);
                return;
            } else {
                if (new Date(userData.podarok_CD).getTime() < new Date().getTime()) {
                    userData.coins += 100 * k;
                    let date = new Date();
                    date.setHours(date.getHours() + 24);
                    userData.podarok_CD = date.getTime();
                    msg.reply({
                        content: "",
                        embeds: [
                            new EmbedBuilder()
                                .setColor("#30fc03")
                                .setTitle(texts.podarok.sc + 100 * k + " монет"),
                        ],
                    });
                    bot.db.set(`users.${msg.member.id}`, userData);
                    return;
                } else {
                    msg.reply({
                        content: "",
                        embeds: [
                            new EmbedBuilder()
                                .setColor("#FF0000")
                                .setTitle(texts.podarok.bd),
                        ],
                    });
                    bot.db.set(`users.${msg.member.id}`, userData);
                    return;
                }
            }
        } catch (e) {
            console.log(e);
        }
    },
};