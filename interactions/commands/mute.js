const { texts, data, DM } = require("../../config.json");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    application: {
        name: "mute",
        description: "Замутить пользователя",
        options: [
            {
                name: "user",
                description: "Упомяните пользователя через @",
                type: 9,
                required: true,
            },
            {
                name: "time",
                description: "На сколько минут",
                type: 4,
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
        if (args.length < 3) return;

        let user = msg.guild.members.cache.get(args[0]);
        if (user == undefined)
            user = msg.guild.members.cache.get(args[0].slice(1).slice(1, -1));

        try {
            if (Number(args[1]) < 0) {
                return;
            }

            const muteRole = bot.db.get("mute_role");
            if (!muteRole) return;

            await user.roles.add(muteRole);

            let date = new Date();
            date.setMinutes(date.getMinutes() + Number(args[1]));

            const userData = bot.db.get(`users.${user.id}`) || {};
            userData.mute_dat = date.getTime();
            userData.reason = args.slice(2).join(" ");

            bot.db.set(`users.${user.id}`, userData);

            msg.reply({
                content: "",
                embeds: [
                    new EmbedBuilder().setColor("#30fc03").setTitle(texts.mute.sc),
                ],
                ephemeral: true,
            });

            msg.guild.channels.cache.get(data.log_chn).send({
                content: "",
                embeds: [
                    {
                        type: "rich",
                        title: "",
                        description: "",
                        color: 0xff0000,
                        fields: [
                            {
                                name: "Пользователь",
                                value: `<@${user.id}>`,
                                inline: true,
                            },
                            {
                                name: "Модератор",
                                value: `<@${msg.member.id}>`,
                                inline: true,
                            },
                            {
                                name: "Причина",
                                value: `${args.slice(2).join(" ")}`,
                                inline: true,
                            },
                            {
                                name: "Время",
                                value: `${args[1]} минут`,
                                inline: true,
                            },
                        ],
                        author: {
                            name: `[MUTE] ${user.displayName}`,
                        },
                    },
                ],
            });
        } catch (err) {
            console.log(err);
            msg.reply({
                content: "",
                embeds: [
                    new EmbedBuilder().setColor("#FF0000").setTitle(texts.mute.bd),
                ],
                ephemeral: true,
            });
        }
    },
};