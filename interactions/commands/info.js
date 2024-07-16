const { texts, DM } = require("../../config.json");
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const db = require("quick.db");

module.exports = {
    application: {
        name: "info",
        description: "информация о участнике",
        options: [
            {
                name: "user",
                description: "пинг участника",
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

        let userData = await bot.db.get(`users.${user.id}`);
        if (!userData) {
            userData = { coins: 0 };
            await bot.db.set(`users.${user.id}`, userData);
        }

        userData.xp ??= 0;
        userData.lvl ??= 0;
        userData.nlvl ??= 10;
        userData.kk ??= 3;
        userData.coins ??= 0;
        userData.DU ??= 0;
        userData.winDU ??= 0;
        userData.winCas ??= 0;

        let warns = userData.warns ? userData.warns.length : 0;

        try {
            msg.reply({
                content: "",
                embeds: [
                    {
                        description: "",
                        fields: [
                            {
                                name: "Ник",
                                value: `<@${user.id}>`,
                                inline: false,
                            },
                            {
                                name: "Монеты",
                                value: `${userData.coins}`,
                                inline: false,
                            },
                            {
                                name: "Предупреждения",
                                value: `${warns}`,
                                inline: false,
                            },
                            {
                                name: "LVL",
                                value: `${userData.lvl}`,
                                inline: false,
                            },
                            {
                                name: "Дуэлей сыграно",
                                value: `${userData.DU}`,
                                inline: false,
                            },
                            {
                                name: "Дуэлей выиграно",
                                value: `${userData.winDU}`,
                                inline: false,
                            },
                            {
                                name: "Выиграно монет в казино",
                                value: `${userData.winCas}`,
                            },
                        ],
                        color: 16737539,
                        author: {
                            icon_url: user.avatarURL(),
                            name: user.displayName,
                        },
                        title: "Данные",
                    },
                ],
                components: [],
                actions: {},
            });
        } catch (e) {
            console.error(e);
        }
    },
};