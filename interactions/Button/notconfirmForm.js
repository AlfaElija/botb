const { texts, DM, wopr} = require("../../config.json");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require("discord.js");
const { db } = require("../../database.js");

module.exports = {
    start(bot, interaction) {
        try {
            let roles = interaction.customId.split("-")[1].split("|");
            let idU = interaction.customId.split("-")[2];
            const v = wopr
            let f = Object.values(v).filter(w => w.id.split("-")[1] == interaction.customId.split("-")[1])[0]
            if(!interaction.member.roles.cache.has(f.m_r)&& !interaction.member.roles.cache.has("930497465336082462")) return interaction.reply({
                content: "",
                embeds: [new EmbedBuilder().setDescription("Вы не можете отклонить заявку").setColor(0xFF0000)],
                ephemeral: true
            })
            interaction.update({
                content: ``,
                embeds: [{
                    "type": "rich",
                    "title": interaction.message.embeds[0].title,
                    "description": `<@${interaction.member.id}> **отклонил заявку** <@${idU}>`,
                    "color": 0xFF0000,
                    fields:interaction.message.embeds[0].fields
                }],
                "components": []
            });
        } catch (error) {
            console.error("An error occurred during balance command execution:", error);
        }
    },
};