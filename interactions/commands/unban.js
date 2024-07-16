const { texts, data, DM } = require("../../config.json");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    application: {
        name: "unban",
        description: "unban user",
        options: [
            {
                name: "user",
                description: "user",
                type: 9,
                required: true,
            },
        ],
    },
    async start(bot, msg, args) {
        if (args.length < 1) return;
        try {
            const user = args[0];
            console.log(user)
            if(!msg.guild.members.cache.get(user)) return console.log("lox")
            let userData = await bot.db.get(`users.${user}`);
            if (!userData || !userData.ban) return;
            delete userData.ban;
            delete userData.name;
            msg.guild.members.cache.get(user).roles.remove("1195107374617350224");
            msg.guild.members.cache.get(user).roles.add("859554996105904149");
            bot.db.set(`users.${user}`, userData);
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
                                value: `<@${user}>`,
                                inline: true,
                            },
                            {
                                name: `Модератор`,
                                value: `<@${msg.member.id}>`,
                                inline: true,
                            },
                        ],
                        author: {
                            name: `[UNBAN] ${userData.name}`,
                        },
                    },
                ],
            });

            msg.reply({
                content: "",
                embeds: [new EmbedBuilder().setColor("#30fc03").setTitle(texts.unban.sc)],
                ephemeral: true,
            });
        } catch (e) {
            console.log(e);
        }
    },
};