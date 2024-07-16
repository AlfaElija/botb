const { texts, data, DM } = require("../../config.json");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    application: {
        name: "warn",
        description: "Замутить пользователя",
        options: [
            {
                name: "user",
                description: "Упомяните пользователя через @",
                type: 9,
                required: true,
            },
            {
                name: "reason",
                description: "Почему?",
                type: 3,
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
            let userData = await bot.db.get(`users.${user.id}`);
            if (!userData) userData = { warns: [] };
            if(!userData.warns) userData.warns = [];
            userData.warns.push({
                reason: args.slice(1).join(" "),
                date: new Date().getTime(),
            });
            await bot.db.set(`users.${user.id}`, userData);
            const logChannel = msg.guild.channels.cache.get(data.log_chn);
            logChannel.send({
                content: "",
                embeds: [
                    {
                        type: "rich",
                        title: "",
                        description: "",
                        color: 0xe3f542,
                        fields: [
                            {
                                name: `Пользователь`,
                                value: `<@${user.id}>`,
                                inline: true,
                            },
                            {
                                name: `Модератор`,
                                value: `<@${msg.member.id}>`,
                                inline: true,
                            },
                            {
                                name: `Причина`,
                                value: `${args.slice(1).join(" ")}`,
                                inline: true,
                            },
                        ],
                        author: {
                            name: `[WARN] ${user.displayName}`,
                        },
                    },
                ],
            });
            msg.reply({
                content: "",
                embeds: [new EmbedBuilder().setColor("#30fc03").setTitle(texts.warn.sc)],
                ephemeral: true,
            });
            if (userData.warns.length > 4) {
                const date = new Date();
                date.setMinutes(date.getMinutes() + 60);
                userData.mute_dat = date.getTime();
                userData.reason = "Бодьшое количество предупреждений";
                userData.warns = [];
                await bot.db.set(`users.${user.id}`, userData);
                logChannel.send({
                    content: "",
                    embeds: [
                        {
                            type: "rich",
                            title: "",
                            description: "",
                            color: 0xff0000,
                            fields: [
                                {
                                    name: `Пользователь`,
                                    value: `<@${user.id}>`,
                                    inline: true,
                                },
                                {
                                    name: `Модератор`,
                                    value: `<@${bot.user.id}>`,
                                    inline: true,
                                },
                                {
                                    name: `Причина`,
                                    value: `Бодьшое количество предупреждений`,
                                    inline: true,
                                },
                                {
                                    name: `Время`,
                                    value: `60 минут`,
                                    inline: true,
                                },
                            ],
                            author: {
                                name: `[MUTE] ${user.displayName}`,
                            },
                        },
                    ],
                });
            }
        } catch (e) {
            console.log(e);
            // msg.reply({
            //     content: "",
            //     embeds: [new EmbedBuilder().setColor("#FF0000").setTitle(texts.warn.bd)],
            //     ephemeral: true
            // })
        }
    },
};