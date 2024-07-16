const { texts, DM } = require("../../config.json");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle} = require("discord.js");

module.exports = {
    async start(bot, interaction) {
        try {
            let s = await bot.db.get("survey");
            const modal = new ModalBuilder()
                .setCustomId(`opros-otvet-${interaction.customId.split("-")[2]}`)
                .setTitle(s[Number(interaction.customId.split("-")[2])].title);
            let c = [new ActionRowBuilder().addComponents(
                new TextInputBuilder()
                    .setCustomId(`otvet`)
                    .setLabel("Напишите здесь ваш ответ")
                    .setStyle(TextInputStyle.Paragraph)
            )];

            modal.addComponents(c)

            // Show the modal to the user
            interaction.showModal(modal);
        } catch (error) {
            console.error("Произошла ошибка во время выполнения команды balance:", error);
        }
    },
};