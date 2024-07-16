const {texts, DM} = require("../../config.json");
const {EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require("discord.js");

module.exports = {
    async start(bot, interaction) {
        try {
            interaction.guild.channels.cache.get("1195804688411537498").send({
                "content": "||<@&1179433696932147261> <@&930497465336082462>||",
                "embeds": [
                    {
                        "description": "",
                        "fields": [
                            {
                                "name": `Ответ:`,
                                "value": `${interaction.fields.getTextInputValue("text")}`
                            }
                        ],
                        "color": 0x373838,
                        "title": "Обжалование бана"
                    }
                ],
                "components": [
                    {
                        "type": 1,
                        "components": [
                            {
                                "style": 2,
                                "label": ``,
                                "custom_id": `confirmObjalovanie-${interaction.user.id}`,
                                "disabled": false,
                                "type": 2,
                                "emoji": {
                                    "id": null,
                                    "name": `✔`
                                },
                            },
                            {
                                "style": 2,
                                "label": ``,
                                "custom_id": `notconfirmObjalovanie-${interaction.user.id}`,
                                "disabled": false,
                                "type": 2,
                                "emoji": {
                                    "id": null,
                                    "name": `❌`
                                },
                            }
                        ],
                        "actions": {}
                    }
                ]
            });
            interaction.reply({
                "content": "",
                "embeds": [
                    {
                        "title": `Ваш ответ отправлен`,
                        "description": "",
                        "color": 0x5e5e5e,
                        "timestamp": new Date().toISOString()
                    }
                ],
                "ephemeral": true
            })
        } catch (error) {
            console.error("An error occurred during command execution:", error);
        }
    },
};