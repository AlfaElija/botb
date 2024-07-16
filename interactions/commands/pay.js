const { texts, DM } = require("../../config.json");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    application: {
        name: "pay",
        description: "Переводит монеты",
        options: [
            {
                name: "user",
                description: "Упомяните пользователя через @",
                type: 9,
                required: true,
            },
            {
                name: "coins",
                description: "Сколько монет",
                type: 4,
                required: true,
            },
        ],
    },
    async start(bot, msg, args) {
        if (args.length < 2) return;

        let user = msg.guild.members.cache.get(args[0]);
        if (user == undefined)
            user = msg.guild.members.cache.get(args[0].slice(1).slice(1, -1));

        try {
            let senderData = await bot.db.get(`users.${msg.member.id}`);
            if (!senderData) {
                bot.db.set(`users.${msg.member.id}`, { coins: 0 });
                msg.reply({
                    content: "",
                    embeds: [
                        new EmbedBuilder()
                            .setColor("#FF0000")
                            .setTitle(texts.pay.lowCoins),
                    ],
                    ephemeral: true,
                });
                return;
            }

            if (!senderData.coins) {
                senderData.coins = 0;
                msg.reply({
                    content: "",
                    embeds: [
                        new EmbedBuilder()
                            .setColor("#FF0000")
                            .setTitle(texts.pay.lowCoins),
                    ],
                    ephemeral: true,
                });
                return;
            }

            const coinsToTransfer = Number(args[1]);
            if (coinsToTransfer < 0) {
                msg.reply({
                    content: "",
                    embeds: [
                        new EmbedBuilder()
                            .setColor("#FF0000")
                            .setTitle(texts.pay.shotinleg.split("|")[0])
                            .setDescription(texts.pay.shotinleg.split("|")[1]),
                    ],
                });
                senderData.coins -= 100;
                senderData.zigan = true;
                msg.member.roles.add("1180858208672305203");
                return;
            }

            if (coinsToTransfer > senderData.coins) {
                msg.reply({
                    content: "",
                    embeds: [
                        new EmbedBuilder()
                            .setColor("#FF0000")
                            .setTitle(texts.pay.lowCoins),
                    ],
                });
                return;
            }

            senderData.coins -= coinsToTransfer;

            let recipientData = await bot.db.get(`users.${user.id}`);
            if (!recipientData) {
                bot.db.set(`users.${user.id}`, { coins: 0 });
            }
            recipientData.coins += coinsToTransfer;

            bot.db.set(`users.${msg.member.id}`, senderData);
            bot.db.set(`users.${user.id}`, recipientData);

            msg.reply({
                content: "",
                embeds: [
                    {
                        type: "rich",
                        title: "Успешный перевод",
                        description: "",
                        color: 0x30fc03,
                        fields: [
                            {
                                name: "Отправитель",
                                value: `<@${msg.member.id}>`,
                                inline: true,
                            },
                            {
                                name: "Сумма",
                                value: `${coinsToTransfer}`,
                                inline: true,
                            },
                            {
                                name: "Получатель",
                                value: `<@${user.id}>`,
                                inline: true,
                            },
                        ],
                    },
                ],
            });
        } catch (e) {
            console.log(e);
        }
    },
};