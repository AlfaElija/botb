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
                   case "start":{

                       interaction.reply({
                           "content": "",
                           "components": [
                               {
                                   "type": 1,
                                   "components": [
                                       {
                                           "custom_id": `verification-1`,
                                           "placeholder": `Выбирай`,
                                           "options": [
                                               {
                                                   "label": `Мужчина`,
                                                   "value": `1062466061590605894`,
                                                   "description": ``,
                                                   "default": false
                                               },
                                               {
                                                   "label": `Женщина`,
                                                   "value": `1057412105038479400`,
                                                   "description": ``,
                                                   "default": false
                                               }
                                           ],
                                           "min_values": 1,
                                           "max_values": 1,
                                           "type": 3
                                       }
                                   ]
                               }
                           ],
                           "embeds": [
                               {
                                   "title": `Для начала выбири свой пол`,
                                   "description": "Для выбора используй миню выбора",
                                   "color": 0x373838,
                                   "fields": []
                               }
                           ],
                           "ephemeral": true
                       })
                       break;
                   }

               }
            }
        } catch (error) {
            console.error(error);
        }
    },
};