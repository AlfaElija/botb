const { texts, DM } = require("../../config.json");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    async start(bot, interaction) {
        try {
            if (!interaction.fields.getTextInputValue("color").startsWith("#")) {
                interaction.reply({
                    content: "",
                    embeds: [
                        new EmbedBuilder()
                            .setTitle("Цвет должен начинаться с #")
                            .setColor("#FF0000")
                    ],
                    ephemeral: true
                });
                return;
            }

            const userData = await bot.db.get(`users.${interaction.member.id}`);
            if (!userData) {
                bot.db.set(`users.${interaction.member.id}`, { coins: 0 });
                interaction.reply({
                    content: "",
                    embeds: [
                        new EmbedBuilder()
                            .setTitle("У вас недостаточно денег на счету")
                            .setColor("#FF0000")
                    ],
                    ephemeral: true
                });
                return;
            }

            if (!userData.coins) {
                userData.coins = 0;
                await bot.db.set(`users.${interaction.member.id}`, userData);
                interaction.reply({
                    content: "",
                    embeds: [
                        new EmbedBuilder()
                            .setTitle("У вас недостаточно денег на счету")
                            .setColor("#FF0000")
                    ],
                    ephemeral: true
                });
                return;
            }

            if (userData.coins - 500 < 0) {
                interaction.reply({
                    content: "",
                    embeds: [
                        new EmbedBuilder()
                            .setTitle("У вас недостаточно денег на счету")
                            .setColor("#FF0000")
                    ],
                    ephemeral: true
                });
                return;
            }

            userData.coins -= 500;
            await bot.db.set(`users.${interaction.member.id}`, userData);

            const role = await interaction.guild.roles.create({
                name: interaction.fields.getTextInputValue("name"),
                color: interaction.fields.getTextInputValue("color"),
                position: 36
            });

            await interaction.member.roles.add(role.id);

            if (!userData.roles) userData.roles = {};
            if (!userData.roles.customRole) userData.roles.customRole = [];
            userData.roles.customRole.push(role.id);
            await bot.db.set(`users.${interaction.member.id}`, userData);

            interaction.reply({
                content: "",
                embeds: [
                    new EmbedBuilder()
                        .setTitle("Успешная покупка")
                        .setColor("#30fc03")
                ],
                ephemeral: true
            });
        } catch (error) {
            console.error("An error occurred during balance command execution:", error);
        }
    },
};