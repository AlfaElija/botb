const { texts, DM } = require("../../config.json");
const { EmbedBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle} = require("discord.js");

module.exports = {
    async start(bot, interaction) {
        try {
            let d = await bot.db.get(`users.${interaction.user.id}`);
            if(!d.ban) return interaction.reply({
                content: "",
                embeds: [
                    new EmbedBuilder()
                      .setTitle("Вы не забанены")
                      .setColor("#FF0000")
                ],
                ephemeral: true
            })
            if(d.ban.Objalovanie) return interaction.reply({
                content: "",
                embeds: [
                    new EmbedBuilder()
                      .setTitle("Ваша заявка уже отправлина")
                      .setColor("#FF0000")
                ],
                ephemeral: true
            })
            const modal = new ModalBuilder()
                .setCustomId(`objalovanie-bana-${interaction.member.id}`)
                .setTitle("Обжалование бана");
            let c = [new ActionRowBuilder().addComponents(
                new TextInputBuilder()
                    .setCustomId(`text`)
                    .setLabel("Напишите ваше обжалование")
                    .setStyle(TextInputStyle.Paragraph)
            )];

            modal.addComponents(c)

            d.ban.Objalovanie = true;
            await bot.db.set(`users.${interaction.user.id}`, d);
            interaction.showModal(modal);
        } catch (error) {
            console.error("Произошла ошибка при выполнении команды:", error);
        }
    },
};