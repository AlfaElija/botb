const { texts, DM } = require("../../config.json");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    application: {
        name: "casino",
        description: "casino game",
        options: [{
            name: "coins",
            description: "how coins",
            type: 4,
            required: true
        },
            {
                name: "number",
                description: "by what number (0-9)",
                type: 4,
                required: true
            }
        ]
    },
    async start(bot, msg, args) {
        if (args.length < 2) return;
        try {
            if (!await bot.db.get(`users.${msg.member.id}`)) await bot.db.set(`users.${msg.member.id}`, { coins: 0 });
            if (!await bot.db.get(`users.${msg.member.id}.coins`)) await bot.db.set(`users.${msg.member.id}.coins`, 0);
            const userCoins = await bot.db.get(`users.${msg.member.id}.coins`);
            if (userCoins - Number(args[0]) < 0) {
                msg.reply({
                    content: "",
                    embeds: [new EmbedBuilder().setColor("#FF0000").setTitle(texts.casino.lowCoins)]
                });
                return;
            }
            const num = Math.floor(Math.random() * 10);
            if (Number(args[1]) < 0 || Number(args[0]) < 0) {
                msg.reply({
                    content: "",
                    embeds: [new EmbedBuilder().setColor("#FF0000").setTitle(texts.casino.shotinleg.split("|")[0]).setDescription(texts.casino.shotinleg.split("|")[1])]
                });
                await bot.db.set(`users.${msg.member.id}.coins`, userCoins - 100);
                await bot.db.set(`users.${msg.member.id}.zigan`, true);
                msg.member.roles.add("1180942524412600320");
                return;
            }
            if (Number(args[0]) < 10) {
                msg.reply({
                    content: "",
                    embeds: [new EmbedBuilder().setColor("#FF0000").setTitle(texts.casino.minstav)]
                });
                return;
            }
            if (Number(args[1]) == num) {
                if (!await bot.db.get(`users.${msg.member.id}.winCas`)) await bot.db.set(`users.${msg.member.id}.winCas`, 0);
                await bot.db.set(`users.${msg.member.id}.coins`, userCoins + Number(args[0]) * 5);
                const winAmount = Number(args[0]) * 5;
                await bot.db.set(`users.${msg.member.id}.winCas`, await bot.db.get(`users.${msg.member.id}.winCas`) + winAmount);
                msg.reply({
                    content: "",
                    embeds: [new EmbedBuilder().setColor("#30fc03").setTitle(texts.casino.sc + winAmount)]
                });
            } else {
                await bot.db.set(`users.${msg.member.id}.coins`, userCoins - Number(args[0]));
                msg.reply({
                    content: "",
                    embeds: [new EmbedBuilder().setColor("#FF0000").setTitle(texts.casino.fl)]
                });
            }
        } catch (e) {
            console.log(e);
        }
    }
};