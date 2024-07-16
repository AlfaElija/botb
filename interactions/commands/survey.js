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
        name: "survey",
        description: "создать розыгрыш",
        options: [
            {
                name: "create",
                description: "создать голосование",
                type: 1,
                options: [
                    {
                        name: "title",
                        description: "Название",
                        type: 3,
                        required: true,
                    },
                    {
                        name: "description",
                        description: "Описание",
                        type: 3,
                        required: true,
                    },
                ],
            },
        ]
    },
    async start(bot, msg, args) {

        try {

            if (msg.options._subcommand === "create") {
                if (args.length < 1) return;
                await bot.db.push(`survey`, {
                    title: args[0],
                    channel: msg.channelId,
                });
                let s = await bot.db.get("survey");
                msg.reply({
                    content: "",
                    embeds: [
                        {
                            description: "",
                            fields: [],
                            color: 16737539,
                            title: `СДЕЛАННО`,
                        },
                    ],
                    components: [],
                    actions: {},
                    ephemeral: true,
                })
                msg.channel.send({
                    content: "",
                    embeds: [
                        {
                            description: `${args[1]}`,
                            fields: [],
                            color: 16737539,
                            title: `${args[0]}`,
                        },
                    ],
                    components: [
                        new ActionRowBuilder().addComponents(
                            new ButtonBuilder()
                                .setCustomId(`send-opros-${s.length - 1}`)
                                .setLabel("поучаствовать в опросе")
                                .setStyle(ButtonStyle.Success)
                        )
                    ],
                    actions: {},
                })
            }
        } catch (e) {
            console.log(e);
        }
    }
};