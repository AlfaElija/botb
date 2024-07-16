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
            let mem = interaction.member
            if (type) {
                switch (type) {
                    case "1": {
                        interaction.update({
                            "content": "",
                            "components": [
                                {
                                    "type": 1,
                                    "components": [
                                        {
                                            "custom_id": `verification-2-${interaction.values[0]}`,
                                            "placeholder": `Выбирай`,
                                            "options": [
                                                {
                                                    "label": `Сталкрафт`,
                                                    "value": `1195845725104382084`,
                                                    "description": ``,
                                                    "default": false
                                                },
                                                {
                                                    "label": `Майнкрафт`,
                                                    "value": `1195845802082435223`,
                                                    "description": ``,
                                                    "default": false
                                                },
                                                {
                                                    "label": `Тарков`,
                                                    "value": `1195845838711296090`,
                                                    "description": ``,
                                                    "default": false
                                                },
                                                {
                                                    "label": `CS:GO 2`,
                                                    "value": `1195845902380839013`,
                                                    "description": ``,
                                                    "default": false
                                                },
                                                {
                                                    "label": `Dota 2`,
                                                    "value": `1195845957481398342`,
                                                    "description": ``,
                                                    "default": false
                                                },
                                                {
                                                    "label": `World of Tanks`,
                                                    "value": `1198564969097203864`,
                                                    "description": ``,
                                                    "default": false
                                                },
                                                {
                                                    "label": `Rust`,
                                                    "value": `1198567469422477382`,
                                                    "description": ``,
                                                    "default": false
                                                },
                                                {
                                                    "label": `Не нашёл игру`,
                                                    "value": `anygame`,
                                                    "description": ``,
                                                    "default": false
                                                }
                                            ],
                                            "min_values": 1,
                                            "max_values": 6,
                                            "type": 3
                                        }
                                    ]
                                }
                            ],
                            "embeds": [
                                {
                                    "type": "rich",
                                    "title": `Отлично! Пол дела позади! Теперь выбири игры в которые ты играешь!`,
                                    "description": "Для выбора используй миню выбора. Если ты хотел бы предложить другую игру, выбири соответствующий пункт в миню выбора",
                                    "color": 0x373838
                                }
                            ],
                            "ephemeral": true
                        })

                        break;
                    }
                    case "2": {
                        let ld =  (interaction.values.filter(f=>f!=="anygame").join("-")+`-${interaction.customId.split("-")[2]}`).split("-")
                        if(interaction.values.includes("anygame")){
                            bot.db.set(`users.${mem.id}.TIMED_DATA.verification`, (interaction.values.filter(f=>f!=="anygame").join("-")+`-${interaction.customId.split("-")[2]}`).split("-"))
                            const modal = new ModalBuilder()
                                .setCustomId(`verification-3`)
                                .setTitle("Другая игра");
                            let c = [new ActionRowBuilder().addComponents(
                                new TextInputBuilder()
                                    .setCustomId(`text`)
                                    .setLabel("Напишите игру/игры")
                                    .setStyle(TextInputStyle.Paragraph)
                            )];

                            modal.addComponents(c)

                            // Show the modal to the user
                            interaction.showModal(modal);
                            return;
                        }

                        interaction.member.roles.add("859554996105904149")
                        ld.forEach((r)=>{
                            interaction.member.roles.add(r)
                        })
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
                        //ending text embed
                        break;
                    }
                }
            }
        } catch (error) {
            console.error(error);
        }
    },
};