const { texts, DM } = require("../../config.json");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    async start(bot, interaction) {
        try {
            let u = 0;
            const giveawayId = Object.keys(await bot.db.get("giveawaysM")).find(async c => (await bot.db.get(`giveawaysM.${c}.channel`)) === interaction.channelId);

            if ((await bot.db.get(`giveawaysM.${giveawayId}.users`)).includes(interaction.member.id)) {
                await interaction.reply({
                    content: "",
                    embeds: [new EmbedBuilder().setColor("#FF0000").setTitle("Вы уже учтены в голосовании")],
                    ephemeral: true
                });
                return;
            }

            if (await bot.db.get(`giveawaysM.${giveawayId}.voice`)) {
                const guildChannels = Object.values(interaction.guild.channels.cache.toJSON());

                for (const channel of guildChannels) {
                    if (channel.type === 2 && channel.members.map(user => user.user.id).includes(interaction.member.id)) {
                        u++;
                    }
                }

                if (u <= 0) {
                    await interaction.reply({
                        content: "",
                        embeds: [new EmbedBuilder().setColor("#FF0000").setTitle("Вы не находитесь в голосовом канале")],
                        ephemeral: true
                    });
                } else {
                    if (giveawayId) {
                        await bot.db.push(`giveawaysM.${giveawayId}.users`, interaction.member.id);
                        await interaction.reply({
                            content: "",
                            embeds: [new EmbedBuilder().setColor("#30fc03").setTitle("Вы учтены в голосовании")],
                            ephemeral: true
                        });
                    }
                }
                return;
            }

            await bot.db.push(`giveawaysM.${giveawayId}.users`, interaction.member.id);
            await interaction.reply({
                content: "",
                embeds: [new EmbedBuilder().setColor("#30fc03").setTitle("Вы учтены в голосовании")],
                ephemeral: true
            });
        } catch (error) {
            console.error("Произошла ошибка при выполнении команды:", error);
        }
    },
};