const {texts, DM} = require("../../config.json");
const {
    EmbedBuilder,
    UserSelectMenuBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    PermissionFlagsBits
} = require("discord.js");
const config = require("../../config.json");

module.exports = {
    async start(bot, interaction) {
        try {
            let type = interaction.customId.split("-")[1];
            let channel = interaction.member.voice.channel
            if (type) {
                const d = await bot.db.get(`Vchannels.${interaction.member.voice.channelId}`)
                if (Object.keys(await bot.db.get("Vchannels")).includes(interaction.member.voice.channelId)) {
                    if(interaction.member.id !== d.owner && !interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
                        await interaction.reply({
                            "content": "",
                            "embeds": [
                                {
                                    "title": `❌ Ошибка`,
                                    "description": "",
                                    "color": 0xf70101,
                                    "fields": [
                                        {
                                            "name": "Вы не владеете этой комнатой.",
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
                    switch (type) {
                        case "ChOwner": {
                            if (channel.members.toJSON().length <= 1) {
                                await interaction.reply({
                                    "content": "",
                                    "embeds": [
                                        {
                                            "title": `❌ Ошибка`,
                                            "description": "",
                                            "color": 0xf70101,
                                            "fields": [
                                                {
                                                    "name": "Вы один в голосовой комнате.",
                                                    "value": ``
                                                }
                                            ],
                                            "timestamp": new Date().toISOString()
                                        }
                                    ],
                                    "ephemeral": true
                                });
                                break;
                            }
                            let p = [];
                            channel.members.map(m => {
                                if(m.user.id == interaction.member.id) return;
                                p.push({
                                    "label": `${m.user.username}`,
                                    "value": `VCM-SetOwner-${m.user.id}`,
                                    "description": `Нажми, чтобы назначить его владельцем комнаты`,
                                    "emoji": {
                                        "id": "834368691444383775",
                                        "name": `AFLAME_bad`
                                    }
                                })
                            })
                            await interaction.reply({
                                "content": '',
                                "embeds": [
                                    {
                                        "type": "rich",
                                        "title": `Смена владельца`,
                                        "description": "",
                                        "color": 0x5e5e5e,
                                        "fields": [],
                                        "timestamp": new Date().toISOString()
                                    }
                                ],
                                "components": [{
                                    "type": 1,
                                    "components": [
                                        {
                                            "custom_id": `VCM-SetOwner`,
                                            "placeholder": `Выберите пользователя`,
                                            "options": p,
                                            "min_values": 1,
                                            "max_values": 1,
                                            "type": 3
                                        }
                                    ]
                                }],
                                "ephemeral": true
                            });
                            break;
                        }
                        case "Limit": {
                            const modal = new ModalBuilder()
                                .setCustomId("VCM-Limit")
                                .setTitle("Установка лимита");
                            let c = [new ActionRowBuilder().addComponents(
                                new TextInputBuilder()
                                    .setCustomId(`limit`)
                                    .setLabel("Количество (1-99)")
                                    .setStyle(TextInputStyle.Short)
                            )];

                            modal.addComponents(c)

                            // Show the modal to the user
                            interaction.showModal(modal);
                            break;
                        }
                        case "LockUnlock": {
                            bot.db.set(`Vchannels.${interaction.member.voice.channelId}.lock`, !await bot.db.get(`Vchannels.${interaction.member.voice.channelId}.lock`));
                            if(await bot.db.get(`Vchannels.${interaction.member.voice.channelId}.lock`)) {
                                interaction.reply({
                                    "content": '',
                                    "embeds": [
                                        {
                                            "type": "rich",
                                            "title": `Вы открыли комнату`,
                                            "description": "теперь к вам могут заходить",
                                            "color": 0x5e5e5e,
                                            "fields": [],
                                            "timestamp": new Date().toISOString()
                                        }
                                    ],
                                    "ephemeral": true
                                })
                            }else{
                                interaction.reply({
                                    "content": '',
                                    "embeds": [
                                        {
                                            "type": "rich",
                                            "title": `Вы закрыли комнату`,
                                            "description": "теперь к вам нельзя заходить",
                                            "color": 0x5e5e5e,
                                            "fields": [],
                                            "timestamp": new Date().toISOString()
                                        }
                                    ],
                                    "ephemeral": true
                                })
                            }
                            break;
                        }
                        case "ChName": {
                            const modal = new ModalBuilder()
                                .setCustomId("VCM-ChName")
                                .setTitle("Установка имени");
                            let c = [new ActionRowBuilder().addComponents(
                                new TextInputBuilder()
                                    .setCustomId(`name`)
                                    .setLabel("Имя")
                                    .setStyle(TextInputStyle.Short)
                            )];

                            modal.addComponents(c)

                            // Show the modal to the user
                            interaction.showModal(modal);
                            break;
                        }
                        case "HideUnhide": {
                            if(interaction.member.voice.channel.permissionOverwrites.cache.toJSON().filter(r => r.id == "859554996105904149").length <= 0){
                                interaction.member.voice.channel.permissionOverwrites.edit("859554996105904149", {
                                    "ViewChannel": false
                                })
                                interaction.reply({
                                    "content": '',
                                    "embeds": [
                                        {
                                            "type": "rich",
                                            "title": `Вы сменили видимость комнаты`,
                                            "description": "теперь вас не видно",
                                            "color": 0x5e5e5e,
                                            "fields": [],
                                            "timestamp": new Date().toISOString()
                                        }
                                    ],
                                    "ephemeral": true
                                })
                                return
                            }
                            if (interaction.member.voice.channel.permissionOverwrites.cache.toJSON().filter(r => r.id == "859554996105904149")[0].allow.has(PermissionFlagsBits.ViewChannel)) {
                                interaction.member.voice.channel.permissionOverwrites.edit("859554996105904149", {
                                    "ViewChannel": false
                                })
                                interaction.reply({
                                    "content": '',
                                    "embeds": [
                                        {
                                            "type": "rich",
                                            "title": `Вы сменили видимость комнаты`,
                                            "description": "теперь вас не видно",
                                            "color": 0x5e5e5e,
                                            "fields": [],
                                            "timestamp": new Date().toISOString()
                                        }
                                    ],
                                    "ephemeral": true
                                })
                            } else {
                                interaction.member.voice.channel.permissionOverwrites.edit("859554996105904149", {
                                    "ViewChannel": true
                                })
                                interaction.reply({
                                    "content": '',
                                    "embeds": [
                                        {
                                            "type": "rich",
                                            "title": `Вы сменили видимость комнаты`,
                                            "description": "теперь вас видно",
                                            "color": 0x5e5e5e,
                                            "fields": [],
                                            "timestamp": new Date().toISOString()
                                        }
                                    ],
                                    "ephemeral": true
                                })
                            }

                            break;
                        }
                        case "Kick": {
                            if (channel.members.toJSON().length <= 1) {
                                await interaction.reply({
                                    "content": "",
                                    "embeds": [
                                        {
                                            "title": `❌ Ошибка`,
                                            "description": "",
                                            "color": 0xf70101,
                                            "fields": [
                                                {
                                                    "name": "Вы один в голосовой комнате.",
                                                    "value": ``
                                                }
                                            ],
                                            "timestamp": new Date().toISOString()
                                        }
                                    ],
                                    "ephemeral": true
                                });
                                break;
                            }
                            let p = [];
                            channel.members.map(m => {
                                if(m.user.id == interaction.member.id) return;
                                p.push({
                                    "label": `${m.user.username}`,
                                    "value": `VCM-Kick-${m.user.id}`,
                                    "description": `Нажми, чтобы выгнать из комнаты`,
                                    "emoji": {
                                        "id": "834368691444383775",
                                        "name": `AFLAME_bad`
                                    }
                                })
                            })
                            await interaction.reply({
                                "content": '',
                                "embeds": [
                                    {
                                        "type": "rich",
                                        "title": `Выгнать пользователя`,
                                        "description": "",
                                        "color": 0x5e5e5e,
                                        "fields": [],
                                        "timestamp": new Date().toISOString()
                                    }
                                ],
                                "components": [{
                                    "type": 1,
                                    "components": [
                                        {
                                            "custom_id": `VCM-Kick`,
                                            "placeholder": `Выберите пользователя`,
                                            "options": p,
                                            "min_values": 1,
                                            "max_values": 1,
                                            "type": 3
                                        }
                                    ]
                                }],
                                "ephemeral": true
                            });
                            break;
                        }
                        case "Mute": {
                            if (channel.members.toJSON().length <= 1) {
                                await interaction.reply({
                                    "content": "",
                                    "embeds": [
                                        {
                                            "title": `❌ Ошибка`,
                                            "description": "",
                                            "color": 0xf70101,
                                            "fields": [
                                                {
                                                    "name": "Вы один в голосовой комнате.",
                                                    "value": ``
                                                }
                                            ],
                                            "components": [],
                                            "timestamp": new Date().toISOString()
                                        }
                                    ],
                                    "ephemeral": true
                                });
                                break;
                            }
                            let p = [];
                            channel.members.map(m => {
                                if(m.user.id == interaction.member.id) return;
                                p.push({
                                    "label": `${m.user.username}`,
                                    "value": `VCM-Mute-${m.user.id}`,
                                    "description": `Нажми, чтобы замутить в комнате`,
                                    "emoji": {
                                        "id": "834368691444383775",
                                        "name": `AFLAME_bad`
                                    }
                                })
                            })
                            await interaction.reply({
                                "content": '',
                                "embeds": [
                                    {
                                        "type": "rich",
                                        "title": `Замутить пользователя`,
                                        "description": "",
                                        "color": 0x5e5e5e,
                                        "fields": [],
                                        "timestamp": new Date().toISOString()
                                    }
                                ],
                                "components": [{
                                    "type": 1,
                                    "components": [
                                        {
                                            "custom_id": `VCM-Mute`,
                                            "placeholder": `Выберите пользователя`,
                                            "options": p,
                                            "min_values": 1,
                                            "max_values": 1,
                                            "type": 3
                                        }
                                    ]
                                }],
                                "ephemeral": true
                            });
                            break;
                        }
                        case "NSFW": {
                            channel.setNSFW(!channel.nsfw);
                            if(channel.nsfw) {
                                await interaction.reply({
                                    "content": "",
                                    "embeds": [
                                        {
                                            "type": "rich",
                                            "title": `Вы выключили NSFW`,
                                            "description": "",
                                            "color": 0x5e5e5e,
                                            "fields": [],
                                            "timestamp": new Date().toISOString()
                                        }
                                    ],
                                    "ephemeral": true
                                });
                            }else{
                                await interaction.reply({
                                    "content": "",
                                    "embeds": [
                                        {
                                            "type": "rich",
                                            "title": `Вы включили NSFW`,
                                            "description": "",
                                            "color": 0x5e5e5e,
                                            "fields": [],
                                            "timestamp": new Date().toISOString()
                                        }
                                    ],
                                    "ephemeral": true
                                });
                            }
                            break;
                        }

                    }
                } else {
                    await interaction.reply({
                        "content": "",
                        "embeds": [
                            {
                                "type": "rich",
                                "title": `❌ Ошибка`,
                                "description": "",
                                "color": 0xf70101,
                                "fields": [
                                    {
                                        "name": "Пожалуйста, создайте голосовую комнату.",
                                        "value": ``
                                    }
                                ],
                                "timestamp": new Date().toISOString()
                            }
                        ],
                        "ephemeral": true
                    });
                }
            }
        } catch (error) {
            console.error(error);
        }
    },
};