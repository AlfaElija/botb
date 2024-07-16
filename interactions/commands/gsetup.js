const { texts, data, DM } = require("../../config.json");
const {
    EmbedBuilder,
    PermissionsBitField,
    cleanContent,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

module.exports = {
    application: {
        name: "gsetup",
        description: "создать розыгрыш",
        options: [
            {
                name: "name",
                description: "наименование приза",
                type: 3,
                required: true
            }, {
                name: "quantity",
                description: "кол-во призов",
                type: 4,
                required: true
            }, {
                name: "time",
                description: "время в минутах",
                type: 4,
                required: true
            }, {
                name: "voice",
                description: "нужно ли находиться в голосовом",
                type: 5,
                required: true
            }
        ]
    },
    async start(bot, msg, args) {
        if (args.length < 3) return;
        try {
            if (Number(args[1]) < 0 || Number(args[2]) < 0) {
                return;
            }
            if (!await bot.db.get("giveawaysM")) await bot.db.set("giveawaysM", {});
            const message = await msg.reply({
                content: "",
                embeds: [{
                    type: "rich",
                    title: `${args[0]}`,
                    description: "",
                    color: 0xfc3c3c,
                    fields: [
                        {
                            name: "**Количество победителей**",
                            value: `\`\`\`${args[1]} чел.\`\`\``,
                            inlines: true
                        },
                        {
                            name: "**Длительность**",
                            value: `\`\`\`${args[2]} мин.\`\`\``,
                            inlines: true
                        }
                    ],
                    footer: {text: `*Принимают участие: 0 чел.*`}
                }],
                components: [
                    new ActionRowBuilder().addComponents(
                        new ButtonBuilder()
                            .setCustomId("participate")
                            .setLabel("Участвовать")
                            .setStyle(ButtonStyle.Success)
                    )
                ]
            });

            await bot.db.set(`giveawaysM.${msg.channelId}`, {
                ms: message.id,
                users: [],
                time: Number(args[2]),
                value: Number(args[1]),
                channel: msg.channelId,
                title: args[0],
                voice: Boolean(args[3])
            });
        } catch (e) {
            console.log(e);
        }
    }
};