const { texts, DM } = require("../../config.json");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    async start(bot, interaction) {
        try {
            if(interaction.customId.split("-")[1] == "3") {
                let ld = await bot.db.get(`users.${interaction.member.id}.TIMED_DATA.verification`);
                if(!ld) return;
                interaction.guild.channels.cache.get("1197254060546461706").send({
                    "content": "",
                    "embeds": [
                        {
                            "title": `Предложение игры`,
                            "description": `Отправитель <@${interaction.member.id}>`,
                            "color": 0x5e5e5e,
                            "fields": [
                                {
                                    "name": `Ответ:`,
                                    "value": `${interaction.fields.getTextInputValue("text")}`
                                }
                            ],
                            "timestamp": new Date().toISOString()
                        }
                    ],
                    "ephemeral": true
                })
                interaction.member.roles.add("859554996105904149")
                ld.forEach((r)=>{
                    interaction.member.roles.add(r)
                })
                bot.db.delete(`users.${interaction.member.id}.TIMED_DATA.verification`)
                interaction.reply({
                    "content": ``,
                    "embeds": [
                        {
                            "title": `Вы успешно верефецированы`,
                            "description": ``,
                            "color": 0x5e5e5e,
                            "timestamp": new Date().toISOString()
                        }
                    ],
                    "ephemeral": true
            })
            }else if(interaction.customId.split("-")[1] == "4") {

                interaction.guild.channels.cache.get("1197254060546461706").send({
                    "content": "",
                    "embeds": [
                        {
                            "title": `Предложение игры`,
                            "description": `Отправитель <@${interaction.member.id}>`,
                            "color": 0x5e5e5e,
                            "fields": [
                                {
                                    "name": `Ответ:`,
                                    "value": `${interaction.fields.getTextInputValue("text")}`
                                }
                            ],
                            "timestamp": new Date().toISOString()
                        }
                    ],
                    "ephemeral": true
                })

                interaction.reply({
                    "content": ``,
                    "embeds": [
                        {
                            "title": `Ваша заявка отправлена`,
                            "description": ``,
                            "color": 0x5e5e5e,
                            "timestamp": new Date().toISOString()
                        }
                    ],
                    "ephemeral": true
                })
            }

        } catch (error) {
            console.error("An error occurred during command execution:", error);
        }
    },
};