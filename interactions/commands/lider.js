const { texts, DM } = require("../../config.json");
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { msg_configuration } = require("../../bot.js");

module.exports = {
    application: {
        name: "lider",
        description: "Топ участников",
    },
    async start(bot, msg, args) {
        try {
            const users = await bot.db.get("users");

            // descending distribution of lvl
            const sortedUsers = Object.keys(users)
                .map((u) => ({
                    id: u,
                    lvl: users[u].lvl || 0,
                    xp: users[u].xp || 0,
                }))
                .sort((a, b) => b.lvl - a.lvl);

            const f = [];
            for (let i = 0; i < 10; i++) {
                const user = msg.guild.members.cache.get(sortedUsers[i].id);
                if (!user) break;

                let medal;
                switch (i) {
                    case 0:
                        medal = "🥇";
                        break;
                    case 1:
                        medal = "🥈";
                        break;
                    case 2:
                        medal = "🥉";
                        break;
                    default:
                        medal = `#${i + 1}.`;
                        break;
                }

                f.push({
                    name: `${medal} ${user.displayName}`,
                    value: `**Уровень:** ${sortedUsers[i].lvl} | **Опыт:** ${sortedUsers[i].xp}`,
                });
            }

            msg.reply({
                content: "",
                embeds: [
                    {
                        description: "\u200b",
                        fields: f,
                        title: "🏆 Топ рейтинга участников 🏆",
                        thumbnail: {
                            url: "https://cdn.discordapp.com/icons/722417067596185610/a_b948dfa3a5efa07291cd17fa36cfc0b1.gif",
                        },
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