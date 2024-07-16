const { texts, DM } = require("../../config.json");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    async start(bot, interaction) {
        try {
            const id = interaction.customId.split('-')[4];
            let user = await bot.db.get(`users.${interaction.member.id}`);

            if (!user) {
                user =  { rolesChecks: {} }
            }
            if (!user.rolesChecks) {
                user.rolesChecks = {}
            }



            if (!user.rolesChecks[interaction.customId.split('-')[3]]) {
                user.rolesChecks[interaction.customId.split('-')[3]] = id;
                await interaction.member.roles.add(id);
                await interaction.reply({
                    "content": "",
                    "embeds": [
                        {
                            "description": "",
                            "fields": [],
                            "color": 16737539,
                            "title": "Вам выдана роль",
                        }
                    ],
                    "components": [],
                    "actions": {},
                    ephemeral: true
                });
                bot.db.set(`users.${interaction.member.id}`, user);
                return;
            }

            if (user.rolesChecks[interaction.customId.split('-')[3]] !== id) {
                await interaction.member.roles.remove(user.rolesChecks[interaction.customId.split('-')[3]]);
                user.rolesChecks[interaction.customId.split('-')[3]] = id;
                await interaction.member.roles.add(id);
                await interaction.reply({
                    "content": "",
                    "embeds": [
                        {
                            "description": "",
                            "fields": [],
                            "color": 16737539,
                            "title": "Вам выдана роль",
                        }
                    ],
                    "components": [],
                    "actions": {},
                    ephemeral: true
                });
                bot.db.set(`users.${interaction.member.id}`, user);
                return;
            }

            if (interaction.member.roles.cache.has(id)) {
                await interaction.member.roles.remove(id);
                delete user.rolesChecks[interaction.customId.split('-')[3]];
                await interaction.reply({
                    "content": "",
                    "embeds": [
                        {
                            "description": "",
                            "fields": [],
                            "color": 16737539,
                            "title": "С вас снята роль",
                        }
                    ],
                    "components": [],
                    "actions": {},
                    ephemeral: true
                });
                bot.db.set(`users.${interaction.member.id}`, user);
                return;
            }

            await interaction.member.roles.add(id);
            user.rolesChecks[interaction.customId.split('-')[3]] = id;
            await interaction.reply({
                "content": "",
                "embeds": [
                    {
                        "description": "",
                        "fields": [],
                        "color": 16737539,
                        "title": "Вам выдана роль",
                    }
                ],
                "components": [],
                "actions": {},
                ephemeral: true
            });
            bot.db.set(`users.${interaction.member.id}`, user);
        } catch (error) {
            console.error("Произошла ошибка при выполнении команды:", error);
        }
    },
};