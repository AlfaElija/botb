const { texts, DM } = require("../../config.json");
const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    async start(bot, interaction) {
        try {
            let ticket = bot.db.get("tickets").find(t => interaction.customId.split("-").includes(t.id));
            const ticketId = interaction.customId.slice(8);
            const ticketChannel = ticket.cn[interaction.channel.id];

            if (ticketChannel) {
                await interaction.channel.edit({
                    permissionOverwrites: [
                        {
                            id: ticketChannel.user,
                            deny: [PermissionFlagsBits.ViewChannel],
                        },
                        {
                            id: "1179433696932147261",
                            allow: [PermissionFlagsBits.ViewChannel],
                        },
                        {
                            id: "1062453413054521375",
                            allow: [PermissionFlagsBits.ViewChannel],
                        },
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [PermissionFlagsBits.ViewChannel],
                        },
                    ],
                });

                await interaction.reply({
                    content: "",
                    embeds: [
                        new EmbedBuilder()
                            .setTitle("")
                            .setDescription(`<@${interaction.member.id}> закрыл тикет`)
                            .setColor("#30fc03")
                            .build()
                    ]
                });

                delete ticket.cn[interaction.channel.id];
            }
        } catch (error) {
            console.error("Произошла ошибка при выполнении команды:", error);
        }
    },
};