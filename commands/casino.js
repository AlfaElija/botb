const {texts, DM} = require("../config.json")
const {EmbedBuilder, PermissionsBitField} = require("discord.js")
const {db} = require("../database.js")

module.exports = {
    application:{
        name: "casino",
        description: "casino game",
        options:[{
            name: "coins",
            description:"how coins",
            type: 4,
            required: true
        },{
            name: "number",
            description:"by what number (0-9)",
            type: 4,
            required: true
        }
        ]
    },
    start(bot, msg, args){
        if(args.length < 2 ) return;
        try {
            if(!db().users[msg.member.id]) db().users[msg.member.id] = {coins: 0}
            if(!db().users[msg.member.id].coins) db().users[msg.member.id].coins = 0
            if(db().users[msg.member.id].coins - Number(args[0]) < 0){
                msg.reply({
                    content: "",
                    embeds: [new EmbedBuilder().setColor("#FF0000").setTitle(texts.casino.lowCoins)]
                })
                return;
            }
            let num = Math.floor(Math.random() * 10)
            if(Number(args[1])< 0 || Number(args[0])< 0){
                msg.reply({
                    content: "",
                    embeds: [new EmbedBuilder().setColor("#FF0000").setTitle(texts.casino.shotinleg.split("|")[0]).setDescription(texts.casino.shotinleg.split("|")[1])]
                })
                db().users[msg.member.id].coins -= 100;
                db().users[msg.member.id].zigan = true;
                msg.member.roles.add("1180942524412600320")
                return;
            }
            if(Number(args[0]) < 10){
                msg.reply({
                    content: "",
                    embeds: [new EmbedBuilder().setColor("#FF0000").setTitle(texts.casino.minstav)]
                })
                return;
            }
            if(Number(args[1]) == num){
                if(!db().users[msg.member.id].winCas) db().users[msg.member.id].winCas = 0
                db().users[msg.member.id].coins += Number(args[0]) * 5;
                db().users[msg.member.id].winCas += Number(args[0]) * 5;
                msg.reply({
                    content: "",
                    embeds: [new EmbedBuilder().setColor("#30fc03").setTitle(texts.casino.sc+ Number(args[0]) * 5)]
                })
            }else{
                db().users[msg.member.id].coins -= Number(args[0])
                msg.reply({
                    content: "",
                    embeds: [new EmbedBuilder().setColor("#FF0000").setTitle(texts.casino.fl)]
                })
            }
        }catch (e){
            console.log(e)
        }
    }
}