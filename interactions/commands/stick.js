const { texts, data, DM } = require("../../config.json");
const {
    EmbedBuilder,
    PermissionsBitField,
    cleanContent,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ChannelType,
} = require("discord.js");

module.exports = {
    application: {
        name: "stick",
        description: "Создать созданный тикет",
        options: [
            {
                name: "name",
                description: "название",
                type: 3,
                required: true,
            },
            {
                name: "id",
                description: "название",
                type: 3,
                required: true,
            },
        ],
    },
    async start(bot, msg, args) {
        if (args.length < 1) return;
        try {
            const tickets = await bot.db.get("tickets");
            let l = tickets.findIndex((ticket) => ticket.id === args[1]);
            if (l === -1) return;

            const replyEmbed = new EmbedBuilder()
                .setTitle(args[0])
                .setDescription("Нажмите на 📩 чтобы создать тикет")
                .setColor(0xfc3c3c);

            const button = new ButtonBuilder()
                .setCustomId(args[1])
                .setLabel("📩 Создать тикет 📩")
                .setStyle(ButtonStyle.Success);

            msg.reply({
                content: "",
                embeds: [replyEmbed],
                components: [new ActionRowBuilder().addComponents(button)],
            }).then((m) => {
                tickets[l].msg = m.id;
                tickets[l].name = args[0];
                tickets[l].channel = msg.channel.id;
                bot.db.set("tickets", tickets);
            });
        } catch (e) {
            console.log(e);
        }
    },
};

async function gg() {
    let shif_key = [];
    const tickets = await bot.db.get("tickets");
    for (let u = 0; u < 11; u++) {
        let it = Math.floor(Math.random() * frt.length);
        let tii = frt[it];
        shif_key.push(tii);
    }
    const ticketExists = tickets.some((tk) => tk.id === shif_key.join(""));
    if (ticketExists) {
        return gg();
    }
    return shif_key.join("");
}