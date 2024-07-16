const {texts, data, DM} = require("../config.json")
const {EmbedBuilder, PermissionsBitField} = require("discord.js")
const {db} = require("../database.js")

module.exports = {
    application:{
        name: "ban",
        description: "ban user",
        options:[{
            name: "user",
            description:"mention user via @",
            type: 9,
            required: true
        },{
            name: "reason",
            description:"Why?",
            type: 3,
            required: true
        }
        ]
    },
    start(bot, msg, args){
        if(args.length < 2 ) return;
        let user = msg.guild.members.cache.get(args[0])
        if(user == undefined) user = msg.guild.members.cache.get(args[0].slice(1).slice(1, -1))
        try {
            if(!db().users[user.id]) db().users[user.id]= {}
            if(!db().users[user.id].ban) return;
            if(user.id == msg.member.id || user.user.bot){
                msg.reply({
                    content: "",
                    embeds: [new EmbedBuilder().setColor("#FF0000").setTitle(texts.ban.bd)],
                    ephemeral: true
                })
                return
            }
            db().users[user.id].name = user.displayName
            db().users[user.id].ban = {b: true, reason: args.slice(1).join(" "), moderator: msg.member.id}
            user.ban({ deleteMessageSeconds: 60 * 60 * 24 * 7, reason: args.slice(1).join(" ") })
            msg.guild.channels.cache.get(data.log_chn).send({
                "content": "",
                "embeds": [
                    {
                        "type": "rich",
                        "title": "",
                        "description": "",
                        "color": 0xff0000,
                        "fields": [
                            {
                                "name": `Пользователь`,
                                "value": `<@${user.id}>`,
                                "inline": true
                            },
                            {
                                "name": `Модератор`,
                                "value": `<@${msg.member.id}>`,
                                "inline": true
                            },
                            {
                                "name": `Причина`,
                                "value": `${args.slice(1).join(" ") }`,
                                "inline": true
                            }
                        ],
                        "author": {
                            "name": `[BAN] ${user.displayName}`
                        }
                    }
                ]
            });
            msg.reply({
                content: "",
                embeds: [new EmbedBuilder().setColor("#30fc03").setTitle(texts.ban.sc)],
                ephemeral: true
            })
        }catch (e){
            console.log(e)
        }
    }
}