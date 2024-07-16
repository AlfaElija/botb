const {texts, DM} = require("../config.json")
const {EmbedBuilder, PermissionsBitField} = require("discord.js")
const {db} = require("../database.js")

module.exports = {
    application:{
        name: "podarok",
        description: "Выдает вам 100 монет каждые 24 часа"
    },
    start(bot, msg, args){
        try {
            if(!db().users[msg.member.id]) db().users[msg.member.id] = {coins: 0}
            if(!db().users[msg.member.id].coins) db().users[msg.member.id].coins = 0
            let k = 1;
            if(db().users[msg.member.id].roles){
                if(db().users[msg.member.id].roles.list){
                    if(db().users[msg.member.id].roles.list.includes("deluxe")){
                        k = 2
                    }else if(db().users[msg.member.id].roles.list.includes("premium")){
                        k = 1.5
                    }else if(db().users[msg.member.id].roles.list.includes("vip")){
                        k = 1.2
                    }
                }
            }
            if(!db().users[msg.member.id].podarok_CD){
                db().users[msg.member.id].coins+=100 * k;
                let date = new Date()
                date.setHours(date.getHours() + 24)
                db().users[msg.member.id].podarok_CD = date.getTime()
                msg.reply({
                    content: "",
                    embeds: [new EmbedBuilder().setColor("#30fc03").setTitle(texts.podarok.sc + 100 * k + " монет")]
                })
                return;
            }else {
                if (new Date(db().users[msg.member.id].podarok_CD).getTime() < new Date().getTime()) {
                    db().users[msg.member.id].coins += 100 * k
                    let date = new Date()
                    date.setHours(date.getHours() + 24)
                    db().users[msg.member.id].podarok_CD = date.getTime()
                    msg.reply({
                        content: "",
                        embeds: [new EmbedBuilder().setColor("#30fc03").setTitle(texts.podarok.sc + 100 * k + " монет")]
                    })
                    return;
                } else {
                    msg.reply({
                        content: "",
                        embeds: [new EmbedBuilder().setColor("#FF0000").setTitle(texts.podarok.bd)]
                    })
                    return;
                }

            }

        }catch (e){
            console.log(e)
        }
    }
}