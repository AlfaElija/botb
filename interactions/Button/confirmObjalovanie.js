const { texts, DM } = require("../../config.json");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    async start(bot, interaction) {
        try {
            let idU = interaction.customId.split("-")[1];
            if(!interaction.member.roles.cache.has("1179433696932147261") && !interaction.member.roles.cache.has("930497465336082462")) return interaction.reply({
                content: "",
                embeds: [new EmbedBuilder().setDescription("Вы не можете отклонить заявку").setColor(0xFF0000)],
                ephemeral: true
            })
            let d_r = await bot.db.get("ban_role")
            await interaction.guild.members.cache.get(idU).roles.add("859554996105904149");
            await interaction.guild.members.cache.get(idU).roles.remove(d_r);
            await interaction.update({
                content: ``,
                embeds: [
                    {
                        type: "rich",
                        title: interaction.message.embeds[0].title,
                        description: `<@${interaction.member.id}> **одобрил заявку** <@${idU}>`,
                        fields:interaction.message.embeds[0].fields,
                        color: 0x30fc03,
                    },
                ],
                components: [],
            });
        } catch (error) {
            console.error("Произошла ошибка во время выполнения команды:", error);
        }
    },
};