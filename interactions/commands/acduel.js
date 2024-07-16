const { texts, DM } = require("../../config.json");
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { msg_configuration } = require("../../bot.js");

module.exports = {
    application: {
        name: "acduel",
        description: "confirmation duel",
        options: [{
            name: "user",
            description: "mention user via @",
            type: 9,
            required: true
        }],
    },
    async start(bot, msg, args) {
        if (args.length < 1) return;
        let user = msg.guild.members.cache.get(args[0]);
        if (user == undefined) user = msg.guild.members.cache.get(args[0].slice(1).slice(1, -1));
        try {
            if (!bot.db.get(`users.${msg.member.id}`)) await bot.db.set(`users.${msg.member.id}`, { coins: 0 });
            if (!bot.db.get(`users.${msg.member.id}.coins`)) await bot.db.set(`users.${msg.member.id}`, { coins: 0 });
            if (!bot.db.get(`users.${user.id}.coins`)) await bot.db.set(`users.${user.id}`, { coins: 0 });
            if (!bot.db.get(`users.${msg.member.id}.duelP`)) return;
            if (!bot.db.get(`users.${msg.member.id}.duelP`).includes(user.id)) {
                msg.reply({
                    content: "",
                    embeds: [new EmbedBuilder().setColor("#FF0000").setTitle(texts.acduel.notprotiv)]
                });
                return;
            }
            let lot = [user.id, msg.member.id, user.id, msg.member.id, user.id, msg.member.id, user.id, msg.member.id, user.id, msg.member.id];
            let win = Math.floor(Math.random() * lot.length);
            if (!bot.db.get(`users.${lot[win]}.winDU`)) await bot.db.set(`users.${lot[win]}.winDU`, 0);
            if (!bot.db.get(`users.${lot[win]}.DU`)) await bot.db.set(`users.${lot[win]}.DU`, 0);
            if (!bot.db.get(`users.${lot.filter(f => f !== lot[win])[0]}.DU`)) await bot.db.set(`users.${lot.filter(f => f !== lot[win])[0]}.DU`, 0);
            await bot.db.add(`users.${lot[win]}.winDU`, 1);
            await bot.db.add(`users.${lot[win]}.DU`, 1);
            await bot.db.add(`users.${lot.filter(f => f !== lot[win])[0]}.DU`, 1);
            await bot.db.add(`users.${lot[win]}.coins`, 50);
            await bot.db.subtract(`users.${lot.filter(f => f !== lot[win])[0]}.coins`, 50);
            msg.reply({
                content: texts.acduel.sc + ` <@${lot[win]}>`
            });
            let duelP = bot.db.get(`users.${msg.member.id}.duelP`);
            duelP = duelP.filter(a => a !== user.id);
            await bot.db.set(`users.${msg.member.id}.duelP`, duelP);
        } catch (e) {
            console.log(e);
        }
    }
};