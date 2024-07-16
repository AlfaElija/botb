const {texts, DM} = require("../../config.json")
const {EmbedBuilder, PermissionsBitField} = require("discord.js")
const {msg_configuration} = require("../../bot.js")

module.exports = {
    application: {
        name: "duel",
        description: "duel",
        options: [{
            name: "user",
            description: "mention user via @",
            type: 9,
            required: true
        }],
    },
    start(bot, msg, args){
        if(args.length < 1 ) return;
        let user = msg.guild.members.cache.get(args[0])
        if(user == undefined) user = msg.guild.members.cache.get(args[0].slice(1).slice(1, -1))
        try {
            if(!db().users[user.id]) db().users[user.id] = {coins: 0}
            if(!db().users[user.id].coins) db().users[user.id] = {coins: 0}
            if(!db().users[msg.member.id]) db().users[msg.member.id] = {coins: 0}
            if(!db().users[msg.member.id].coins) db().users[msg.member.id] = {coins: 0}
            if(!db().users[user.id].duelP) db().users[user.id].duelP = [];
            if(user.id === msg.member.id || user.user.bot){
                msg.reply({
                    content: "",
                    embeds: [new EmbedBuilder().setColor("#FF0000").setTitle(texts.duel.bd2)]
                })
                db().users[msg.member.id].coins -= 50
                msg.member.roles.add("1180938368025108580")
                return
            }
            if(db().users[user.id].coins <= 50 || db().users[msg.member.id].coins <= 50){
                msg.reply({
                    content: "",
                    embeds: [new EmbedBuilder().setColor("#FF0000").setTitle(texts.duel.bd1)]
                })
                return;
            }

            db().users[user.id].duelP.push(msg.member.id)
            msg.reply({
                content: msg_configuration(texts.duel.sc, user),
                ephemeral: false
            })
        }catch (e){
            console.log(e)
        }
    }
}