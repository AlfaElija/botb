const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    async start(bot, interaction) {
        try {
            let type = interaction.customId.split("-")[1];
            switch (type) {
                case "SetOwner": {
                    bot.db.set(`Vchannels.${interaction.member.voice.channelId}.owner`, interaction.values[0].split("-")[2]);
                    interaction.update({
                        "content": "",
                        "embeds": [
                            {
                                "title": `Вы установили нового владельца`,
                                "description": `Теперь владелец <@${interaction.values[0].split("-")[2]}>`,
                                "color": 0x5e5e5e,
                                "timestamp": new Date().toISOString()
                            }
                        ],
                        "ephemeral": true
                    })
                    break;
                }
                case "Kick":{
                    interaction.guild.members.cache.get(interaction.values[0].split("-")[2]).voice.disconnect();
                    interaction.update({
                        "content": "",
                        "embeds": [
                            {
                                "title": `Вы выкинули пользователя`,
                                "description": `Пользователь <@${interaction.values[0].split("-")[2]}>`,
                                "color": 0x5e5e5e,
                                "timestamp": new Date().toISOString()
                            }
                        ],
                        "components": [],
                        "ephemeral": true
                    })
                    break;
                }
                case "Mute":{
                    let muted = await bot.db.get(`Vchannels.${interaction.member.voice.channelId}.mutedM`)
                    if(muted.includes(interaction.values[0].split("-")[2])) {
                        interaction.guild.members.cache.get(interaction.values[0].split("-")[2]).voice.setMute(false);
                        await bot.db.pull(`Vchannels.${interaction.member.voice.channelId}.mutedM`, interaction.values[0].split("-")[2])
                        interaction.update({
                            "content": "",
                            "embeds": [
                                {
                                    "title": `Вы размьютили пользователя`,
                                    "description": `Пользователь <@${interaction.values[0].split("-")[2]}>`,
                                    "color": 0x5e5e5e,
                                    "timestamp": new Date().toISOString()
                                }
                            ],
                            "components": [],
                            "ephemeral": true
                        })
                        break;
                    }
                    interaction.update({
                        "content": "",
                        "embeds": [
                            {
                                "title": `Вы замьютили пользователя`,
                                "description": `Пользователь <@${interaction.values[0].split("-")[2]}>`,
                                "color": 0x5e5e5e,
                                "timestamp": new Date().toISOString()
                            }
                        ],
                        "components": [],
                        "ephemeral": true
                    })
                    interaction.guild.members.cache.get(interaction.values[0].split("-")[2]).voice.setMute(true).then(() => {
                        console.log(`Вы замьютили пользователя ${interaction.values[0].split("-")[2]}`)
                    });
                    await bot.db.push(`Vchannels.${interaction.member.voice.channelId}.mutedM`, interaction.values[0].split("-")[2])
                    break;
                }
            }
        } catch (error) {
            console.error("An error occurred during balance command execution:", error);
        }
    },
};