const {texts, data, DM} = require("../config.json")
const {EmbedBuilder, PermissionsBitField} = require("discord.js")
const {db} = require("../database.js")

module.exports = {
    application:{
        name: "mute",
        description: "Замутить пользователя",
        options:[{
            name: "user",
            description:"Упомяните пользователя через @",
            type: 9,
            required: true
        },{
            name: "time",
            description:"На сколько минут",
            type: 4,
            required: true
        },{
            name: "reason",
            description:"Почему?",
            type: 3,
            required: true
        }]
    },
    start(bot, msg, args){
        if(args.length < 3 ) return;
        let user = msg.guild.members.cache.get(args[0])
        if(user == undefined) user = msg.guild.members.cache.get(args[0].slice(1).slice(1, -1))
        try {
            if(Number(args[1]) < 0){
                return;
            }
            if(!db().mute_role) return;
            user.roles.add(db().mute_role).then(()=>{
                let date = new Date();
                date.setMinutes(date.getMinutes()+ Number(args[1]))
                if(!db().users[user.id]) db().users[user.id] = {}
                db().users[user.id].mute_dat = date.getTime()
                db().users[user.id].reason = args.slice(2).join(" ")
                msg.reply({
                    content: "",
                    embeds: [new EmbedBuilder().setColor("#30fc03").setTitle(texts.mute.sc)],
                    ephemeral: true
                })
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
                                    "value": `${args.slice(2).join(" ") }`,
                                    "inline": true
                                }
                                ,
                                {
                                    "name": `Время`,
                                    "value": `${args[1]} минут`,
                                    "inline": true
                                }
                            ],
                            "author": {
                                "name": `[MUTE] ${user.displayName}`
                            }
                        }
                    ]
                })
            }).catch(err => {
                console.log(err)
                msg.reply({
                    content: "",
                    embeds: [new EmbedBuilder().setColor("#FF0000").setTitle(texts.mute.bd)],
                    ephemeral: true
                })
            })
        }catch (e){
            console.log(e)
        }
    }
}