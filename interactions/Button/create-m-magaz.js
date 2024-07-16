const { texts, DM} = require("../../config.json");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require("discord.js");
const { db } = require("../../database.js");

module.exports = {
    start(bot, interaction) {
        try {
            let roles = interaction.customId.split("-")[1].split("|");
            let idU = interaction.customId.split("-")[2];
            interaction.reply({
                "content": "",
                "embeds": [
                    {
                        "description": "Выбирай, что нужно",
                        "fields": [],
                        "color": 16737539,
                        "title": "Ассортимент"
                    }
                ],
                "components": [{
                    "type": 1,
                    "components": [
                        {
                            "custom_id": `S-menu-magaz`,
                            "placeholder": `Выберите лот`,
                            "options": [
                                {
                                    "label": `[+]Создать свою роль[+]`,
                                    "value": `buy-custom-role`,
                                    "description": `Стоимость: 500`,
                                },
                                {
                                    "label": `Роль Vip`,
                                    "value": `buy-role-vip`,
                                    "description": `Стоимость: 1000`,
                                },
                                {
                                    "label": `Роль Premium`,
                                    "value": `buy-role-premium`,
                                    "description": `Стоимость: 3000`
                                },
                                {
                                    "label": `Роль Deluxe`,
                                    "value": `buy-role-deluxe`,
                                    "description": `Стоимость: 10000`
                                }
                            ],
                            "min_values": 1,
                            "max_values": 1,
                            "type": 3
                        }]
                }],
                ephemeral: true
            })
        } catch (error) {
            console.error("An error occurred during balance command execution:", error);
        }
    },
};