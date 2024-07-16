const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle
} = require("discord.js");
const config = require("../../config.json");

module.exports = {
    async start(bot, interaction) {
        try {
            if (interaction.customId.split("-")[1] === "1") {
                if (interaction.member.roles.cache.has(interaction.values[0])) {
                    interaction.member.roles.remove(interaction.values[0])
                } else {
                    if (interaction.values[0] == "1062466061590605894") {
                        interaction.member.roles.remove("1057412105038479400")
                        interaction.member.roles.add("1062466061590605894")
                    } else if (interaction.values[0] == "1057412105038479400") {
                        interaction.member.roles.remove("1062466061590605894")
                        interaction.member.roles.add("1057412105038479400")
                    }
                }
            }
            if (interaction.customId.split("-")[1] === "2") {
                for(let i = 0; i < config.games_roles.length; i++) {
                     if(interaction.member.roles.cache.has(config.games_roles[i])) await interaction.member.roles.remove(config.games_roles[i])
                }
                for (let i = 0; i < interaction.values.length; i++) {
                    if (interaction.values[i] === "anygame") {
                        break;
                    }
                    if (interaction.member.roles.cache.has(interaction.values[i])) {
                        interaction.member.roles.remove(interaction.values[i])
                    } else {
                        interaction.member.roles.add(interaction.values[i])
                    }

                }

            }
            if(interaction.values.includes("anygame")){
                const modal = new ModalBuilder()
                    .setCustomId(`verification-4`)
                    .setTitle("Другая игра");
                let c = [new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                        .setCustomId(`text`)
                        .setLabel("Напишите игру/игры")
                        .setStyle(TextInputStyle.Paragraph)
                )];
                modal.addComponents(c)
                interaction.showModal(modal);
            }else{
                interaction.reply({
                    "content": "",
                    "embeds": [
                        {
                            "title": `Роли обновлены`,
                            "description": "",
                            "color": 0x373838,
                            "fields": []
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