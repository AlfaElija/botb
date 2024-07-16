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
        name: "vote",
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
                ],
            },
        ]
    },
    async start(bot, msg, args) {

        try {
            if(true) return;
            if (msg.options._subcommand === "create") {
                if (args.length < 1) return;
                await bot.db.set(`vote.${msg.channelId}`, {
                    users: []
                });
                msg.reply({
                    content: "",
                    embeds: [
                        {
                            description: "",
                            fields: [],
                            color: 16737539,
                            title: `${args[0]}`,
                        },
                    ],
                    components: [],
                    actions: {},
                })
            }
        } catch (e) {
            console.log(e);
        }
    }
};