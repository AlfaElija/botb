const { texts, DM } = require("../../config.json");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    application: {
        name: "gpay",
        description: "Переводит монеты за счёт сервера",
        options: [{
            name: "user",
            description: "Упомяните пользователя через @",
            type: 9,
            required: true
        }, {
            name: "coins",
            description: "Сколько монет",
            type: 4,
            required: true
        }]
    },
    async start(bot, msg, args) {
        if (args.length < 2) return;
        let user = msg.guild.members.cache.get(args[0]);
        if (user == undefined) user = msg.guild.members.cache.get(args[0].slice(1).slice(1, -1));
        try {
            if (!await bot.db.get(`users.${user.id}`)) await bot.db.set(`users.${user.id}`, { coins: 0 });
            if (!await bot.db.get(`users.${user.id}.coins`)) await bot.db.set(`users.${user.id}.coins`, 0);
            const userCoins = await bot.db.get(`users.${user.id}.coins`);
            const amount = Number(args[1]);
            await bot.db.set(`users.${user.id}.coins`, userCoins + amount);
            msg.reply({
                content: "",
                embeds: [
                    new EmbedBuilder()
                        .setColor("#30fc03")
                        .setTitle("Успешный перевод")
                        .addFields(
                            { name: "Отправитель", value: `<@${msg.member.id}>`, inline: true },
                            { name: "Сумма", value: `${amount}`, inline: true },
                            { name: "Получатель", value: `<@${user.id}>`, inline: true }
                        )
                ]
            });
        } catch (e) {
            console.log(e);
        }
    }
};