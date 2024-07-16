const { texts, data, DM } = require("../../config.json");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    application: {
        name: "ban",
        description: "ban user",
        options: [{
            name: "user",
            description: "mention user via @",
            type: 9,
            required: true
        },
            {
                name: "reason",
                description: "Why?",
                type: 3,
                required: true
            }
        ]
    },
    async start(bot, msg, args) {
        if (args.length < 2) return;
        let user = msg.guild.members.cache.get(args[0]);
        if (user == undefined) user = msg.guild.members.cache.get(args[0].slice(1).slice(1, -1));
        try {
            let d = await bot.db.get(`users.${user.id}`)
            if (!d) d = {};
            if(d.ban) return msg.reply({    content: "", embeds: [new EmbedBuilder().setColor("#FF0000").setTitle("Пользователь уже забанен")]});
            await bot.db.set(`users.${user.id}`, d);
            if (user.id == msg.member.id || user.user.bot) {
                msg.reply({
                    content: "",
                    embeds: [new EmbedBuilder().setColor("#FF0000").setTitle(texts.ban.bd)],
                    ephemeral: true
                });
                return;
            }
            await bot.db.set(`users.${user.id}`, {});
            await bot.db.set(`users.${user.id}.name`, user.displayName);
            await bot.db.set(`users.${user.id}.ban`, { b: true, reason: args.slice(1).join(" "), moderator: msg.member.id });
            user.roles.cache.toJSON().forEach(async (role) => {
                if(role.id == "853016838308233236" || role.id == "722417067596185610") return;
                await user.roles.remove(role.id);
            })
            let b_r = await bot.db.get("ban_role");
            user.roles.add(b_r);
            msg.guild.channels.cache.get(data.log_chn).send({
                content: "",
                embeds: [{
                    type: "rich",
                    title: "",
                    description: "",
                    color: 0xff0000,
                    fields: [{
                        name: `Пользователь`,
                        value: `<@${user.id}>`,
                        inline: true
                    },
                        {
                            name: `Модератор`,
                            value: `<@${msg.member.id}>`,
                            inline: true
                        },
                        {
                            name: `Причина`,
                            value: `${args.slice(1).join(" ")}`,
                            inline: true
                        }
                    ],
                    author: {
                        name: `[BAN] ${user.displayName}`
                    }
                }]
            });
            msg.reply({
                content: "",
                embeds: [new EmbedBuilder().setColor("#30fc03").setTitle(texts.ban.sc)],
                ephemeral: true
            });
        } catch (e) {
            console.log(e);
        }
    }
};