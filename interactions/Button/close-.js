const { texts, DM } = require("../../config.json");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    async start(bot, interaction) {
        try {
            let ticket = bot.db.get("tickets").find((t) => interaction.customId.split("-").includes(t.id));
            const ticketId = interaction.customId.slice(6);
            const ticketChannel = ticket && ticket.cn ? ticket.cn[interaction.channel.id] : null;
            const confirmComponent = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId(`y-close-${ticketId}`)
                    .setLabel("✔")
                    .setStyle(ButtonStyle.Success)
            );

            await interaction.reply({
                content: "",
                embeds: [
                    {
                        type: "rich",
                        title: "Вы уверены?",
                        description: "",
                        color: 0x30fc03,
                    },
                ],
                components: [confirmComponent],
                ephemeral: true,
            });
        } catch (error) {
            console.error("Произошла ошибка во время выполнения команды balance:", error);
        }
    },
};