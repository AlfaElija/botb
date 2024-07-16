const {texts, DM} = require("../../config.json");
const {EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require("discord.js");

module.exports = {
    async start(bot, interaction) {
        try {
            let type = interaction.customId.split("-")[1];
            switch (type) {
                case "Limit":{
                    if (!Number(interaction.fields.getTextInputValue("limit")) || isNaN(Number(interaction.fields.getTextInputValue("limit"))) || Number(interaction.fields.getTextInputValue("limit"))<0 || Number(interaction.fields.getTextInputValue("limit")) > 99) {
                        interaction.reply({
                            "content": "",
                            "embeds": [
                                {
                                    "title": `❌ Ошибка`,
                                    "description": "",
                                    "color": 0xf70101,
                                    "fields": [
                                        {
                                            "name": "Неверное значение",
                                            "value": ``
                                        }
                                    ],
                                    "timestamp": new Date().toISOString()
                                }
                            ],
                            "ephemeral": true
                        });
                        return
                    }
                    interaction.member.voice.channel.setUserLimit(Number(interaction.fields.getTextInputValue("limit"))).then(() => {
                        interaction.reply({
                            "content": "",
                            "embeds": [
                                {
                                    "title": `Вы установили новый лимит пользователей`,
                                    "description": `Теперь лимит пользователей равен *${interaction.fields.getTextInputValue("limit")}*`,
                                    "color": 0x5e5e5e,
                                    "timestamp": new Date().toISOString()
                                }
                            ],
                            "ephemeral": true
                        });
                    });
                    break;
                }
                case "ChName": {
                    interaction.member.voice.channel.edit({"name": interaction.fields.getTextInputValue("name")})
                    interaction.reply({
                        "content": "",
                        "embeds": [
                            {
                                "title": `Вы установили новое имя комнаты`,
                                "description": `Теперь имя комнаты равно *${interaction.fields.getTextInputValue("name")}*`,
                                "color": 0x5e5e5e,
                                "timestamp": new Date().toISOString()
                            }
                        ],
                        "ephemeral": true
                    })
                    break;
                }
            }

        } catch (error) {
            console.error("An error occurred during command execution:", error);
        }
    },
};