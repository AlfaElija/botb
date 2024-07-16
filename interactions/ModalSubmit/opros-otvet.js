const { texts, DM } = require("../../config.json");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    async start(bot, interaction) {
        try {
            let s = await bot.db.get("survey")
            interaction.guild.channels.cache.get("1195077462976102430").send({
                "content": "",
                "embeds": [
                    {
                        "title": `Ответ на опрос: ${s[interaction.customId.split("-")[2]].title}`,
                        "description": `Отправитель <@${interaction.member.id}>`,
                        "color": 0x5e5e5e,
                        "fields": [
                            {
                                "name": `Ответ:`,
                                "value": `${interaction.fields.getTextInputValue("otvet")}`
                            }
                        ],
                        "timestamp": new Date().toISOString()
                    }
                ],
                "ephemeral": true
            })
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
            console.error("An error occurred during balance command execution:", error);
        }
    },
};