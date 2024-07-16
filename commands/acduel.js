const {texts, DM} = require("../config.json")
const {EmbedBuilder, PermissionsBitField} = require("discord.js")
const {db} = require("../database.js")
const {msg_configuration} = require("../bot.js")
const config = require("../config.json");

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
    start(bot, msg, args){
        if(args.length < 1 ) return;
        let user = msg.guild.members.cache.get(args[0])
        if(user == undefined) user = msg.guild.members.cache.get(args[0].slice(1).slice(1, -1))
        try {
            if(!db().users[msg.member.id]) db().users[msg.member.id] = {coins: 0}
            if(!db().users[msg.member.id].coins) db().users[msg.member.id] = {coins: 0}
            if(!db().users[user.id].coins) db().users[user.id] = {coins: 0}
            if(!db().users[msg.member.id].duelP) return;
            if(!db().users[msg.member.id].duelP.includes(user.id)){
                msg.reply({
                    content: "",
                    embeds: [new EmbedBuilder().setColor("#FF0000").setTitle(texts.acduel.notprotiv)]
                })
                return
            }
            let lot = [user.id, msg.member.id, user.id, msg.member.id, user.id, msg.member.id, user.id, msg.member.id, user.id, msg.member.id ]
            let win = Math.floor(Math.random() * lot.length)
            if(!db().users[lot[win]].winDU) db().users[lot[win]].winDU = 0
            if(!db().users[lot[win]].DU) db().users[lot[win]].DU = 0
            if(!db().users[lot.filter(f=>f!==lot[win])[0]].DU) db().users[lot.filter(f=>f!==lot[win])[0]].DU = 0
            db().users[lot[win]].winDU ++
            db().users[lot[win]].DU ++
            db().users[lot.filter(f=>f!==lot[win])[0]].DU ++
            db().users[lot[win]].coins += 50;
            db().users[lot.filter(f=>f!==lot[win])[0]].coins -= 50;
            msg.reply({
                content: texts.acduel.sc + ` <@${lot[win]}>`
            })
            db().users[msg.member.id].duelP = db().users[msg.member.id].duelP.filter(a => a !== user.id)
        }catch (e){
            console.log(e)
        }
    }
}