const config = require("../../config.json");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder,  TextInputBuilder, TextInputStyle} = require("discord.js");

module.exports = {
    start(bot, interaction) {
        try {
            const modal = new ModalBuilder()
                .setCustomId(config.wopr[interaction.values[0]].id)
                .setTitle(config.wopr[interaction.values[0]].title);
            let c = [];
            for (let i = 0; i < config.wopr[interaction.values[0]].questions.length; i++) {
                c.push(new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                        .setCustomId(`${interaction.values[0]}-question-${i}`)
                        .setLabel(config.wopr[interaction.values[0]].questions[i].split("|")[1])
                        .setStyle({
                            "S": TextInputStyle.Short,
                            "P": TextInputStyle.Paragraph
                        }[config.wopr[interaction.values[0]].questions[i].split("|")[0]])
                ))
            }
            modal.addComponents(c)

            // Show the modal to the user
            interaction.showModal(modal);
        } catch (error) {
            console.error("An error occurred during balance command execution:", error);
        }
    },
};