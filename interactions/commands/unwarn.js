const { texts, data, DM } = require("../../config.json");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    application: {
        name: "unwarn",
        description: "Замутить пользователя",
        options: [
            {
                name: "user",
                description: "Упомяните пользователя через @",
                type: 9,
                required: true,
            },
        ],
    },
    async start(bot, msg, args) {
        if (args.length < 1) return;
        let user = msg.guild.members.cache.get(args[0]);
        if (user == undefined)
            user = msg.guild.members.cache.get(args[0].slice(1).slice(1, -1));
        try {
            const userData = await bot.db.get(`users.${user.id}`);
            if (!userData || !userData.warns) {
                msg.reply({
                    content: "",
                    embeds: [
                        new EmbedBuilder().setColor("#FF0000").setTitle(texts.warn.bd),
                    ],
                    ephemeral: true,
                });
                return;
            }
            userData.warns.shift();
            msg.reply({
                content: "",
                embeds: [new EmbedBuilder().setColor("#30fc03").setTitle(texts.unwarn.sc)],
                ephemeral: true,
            });
            const logChannel = msg.guild.channels.cache.get(data.log_chn);
            logChannel.send({
                content: "",
                embeds: [
                    {
                        type: "rich",
                        title: "",
                        description: "",
                        color: 0x30fc03,
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
                        ],
                        author: {
                            name: `[UNWARN] ${user.displayName}`,
                        },
                    },
                ],
            });
        } catch (e) {
            console.log(e);
        }
    },
};