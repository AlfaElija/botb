const {texts, data, DM} = require("../../config.json")
const {
    EmbedBuilder,
    PermissionsBitField,
    cleanContent,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ChannelType
} = require("discord.js")

module.exports = {
    application: {
        name: "clear",
        description: "Удалить сообщения",
        options: [{
            name: "length",
            description: "количество",
            type: 4,
            required: true
        }
        ]
    },
    async start(bot, msg, args) {
        if (args.length < 1) return;
        try {
            let count = Number.parseInt(args[0]);
            if (!count || count > 100 || count <= 0) count = 100;
            msg.channel
                .bulkDelete(count)
                .then(() => {
                    msg.reply(
                        {
                            "content": `Успешно удалено ${count} сообщений`,
                            "embeds": [],
                            "components": [],
                            "actions": {},
                            "ephemeral": true
                        });
                })
                .catch((err) => {
                    msg.reply({
                        "content": 'Ошибка удаления сообщений',
                        "embeds": [],
                        "components": [],
                        "actions": {},
                        "ephemeral": true
                    });
                });
        } catch (e) {
            console.log(e)
        }
    }
}