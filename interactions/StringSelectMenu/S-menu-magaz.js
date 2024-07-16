const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    async start(bot, interaction) {
        try {
            const db = bot.db;

            if (interaction.values[0] == "buy-custom-role") {
                const modal = new ModalBuilder()
                    .setCustomId("create-custome-role")
                    .setTitle("Создание своей роли");

                modal.addComponents([
                    new ActionRowBuilder().addComponents(
                        new TextInputBuilder()
                            .setCustomId(`name`)
                            .setLabel("Название роли")
                            .setStyle(TextInputStyle.Short)
                    ),
                    new ActionRowBuilder().addComponents(
                        new TextInputBuilder()
                            .setCustomId(`color`)
                            .setLabel("Цвет(в стандарте hex)")
                            .setStyle(TextInputStyle.Short)
                    )
                ]);

                // Show the modal to the user
                interaction.showModal(modal);
            }

            if (interaction.values[0].startsWith("buy-role")) {
                const role = config.roles[interaction.values[0].split("-")[2]];

                if (!role) return;

                const userId = interaction.member.id;
                let user = await db.get(`users.${userId}`);

                if (!user) {
                    user = { coins: 0 };
                    await db.set(`users.${userId}`, user);
                }

                if (!user.roles) {
                    user.roles = { list: [] };
                }

                if (user.roles.list.includes(interaction.values[0].split("-")[2])) {
                    interaction.member.roles.add("1185680743637188649");
                    return interaction.reply({
                        content: "",
                        embeds: [{
                            "type": "rich",
                            "title": `Жизнь не учит ничему`,
                            "description": "Покупка роли второй раз",
                            "color": 0xFF0000
                        }],
                        ephemeral: true
                    });
                }

                if (!user.coins) {
                    user.coins = 0;
                    await db.set(`users.${userId}`, user);

                    return interaction.reply({
                        content: "",
                        embeds: [{
                            "type": "rich",
                            "title": `У вас не достаточно денег на счету`,
                            "description": "",
                            "color": 0xFF0000
                        }],
                        ephemeral: true
                    });
                }

                if (user.coins - role.cost < 0) {
                    return interaction.reply({
                        content: "",
                        embeds: [{
                            "type": "rich",
                            "title": `У вас не достаточно денег на счету`,
                            "description": "",
                            "color": 0xFF0000
                        }],
                        ephemeral: true
                    });
                }

                if (user.roles.list.includes(interaction.values[0].split("-")[2])) {
                    interaction.member.roles.add("1185680743637188649");
                    return interaction.reply({
                        content: "",
                        embeds: [{
                            "type": "rich",
                            "title": `Жизнь не учит ничему`,
                            "description": "Покупка роли второй раз",
                            "color": 0xFF0000
                        }],
                        ephemeral: true
                    });
                } else {
                    user.roles.list.push(interaction.values[0].split("-")[2]);
                    const d = new Date();
                    d.setMonth(d.getMonth() + 1);

                    if (!user.roles.timed) {
                        user.roles.timed = {};
                    }

                    user.roles.timed[interaction.values[0].split("-")[2]] = { dateless: d.getTime() };
                }

                user.coins -= role.cost;
                await db.set(`users.${userId}`, user);

                interaction.member.roles.add(role.id);
                interaction.reply({
                    content: "",
                    embeds: [{
                        "type": "rich",
                        "title": `Успешная покупка`,
                        "description": "",
                        "color": 0x30fc03
                    }],
                    ephemeral: true
                });
            }
        } catch (error) {
            console.error("An error occurred during balance command execution:", error);
        }
    },
};