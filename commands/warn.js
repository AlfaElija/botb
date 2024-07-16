const {texts, data, DM} = require("../config.json")
const {EmbedBuilder, PermissionsBitField} = require("discord.js")
const {db} = require("../database.js")

module.exports = {
    application:{
        name: "warn",
        description: "Замутить пользователя",
        options:[{
            name: "user",
            description:"Упомяните пользователя через @",
            type: 9,
            required: true
        },{
            name: "reason",
            description:"Почему?",
            type: 3,
            required: true
        }]
    },
    start(bot, msg, args){
        if(args.length < 2) return;
        let user = msg.guild.members.cache.get(args[0])
        if(user == undefined) user = msg.guild.members.cache.get(args[0].slice(1).slice(1, -1))
        try {
            if(!db().users[user.id]) db().users[user.id] = {warns:[{reason: args.slice(1).join(" "), date: new Date().getTime()}]}
            if(!db().users[user.id].warns){db().users[user.id].warns = [{reason: args.slice(1).join(" "), date: new Date().getTime()}]}else{
                db().users[user.id].warns.push({reason: args.slice(1).join(" "), date: new Date().getTime()})
            }
                msg.guild.channels.cache.get(data.log_chn).send({
                    "content": "",
                    "embeds": [
                        {
                            "type": "rich",
                            "title": "",
                            "description": "",
                            "color": 0xe3f542,
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
                                "name": `[WARN] ${user.displayName}`
                            }
                        }
                    ]
                });
            msg.reply({
                content: "",
                embeds: [new EmbedBuilder().setColor("#30fc03").setTitle(texts.warn.sc)],
                ephemeral: true
            })
            if(db().users[user.id].warn?.length > 4){
                let date = new Date();
                date.setMinutes(date.getMinutes()+ 60)
                if(!db().users[user.id]) db().users[user.id] = {}
                db().users[user.id].mute_dat = date.getTime()
                db().users[user.id].reason = `Бодьшое количество предупреждений`
                db().users[user.id].warns = [];
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
                                    "value": `<@${bot.user.id}>`,
                                    "inline": true
                                },
                                {
                                    "name": `Причина`,
                                    "value": `Бодьшое количество предупреждений`,
                                    "inline": true
                                }
                                ,
                                {
                                    "name": `Время`,
                                    "value": `60 минут`,
                                    "inline": true
                                }
                            ],
                            "author": {
                                "name": `[MUTE] ${user.displayName}`
                            }
                        }
                    ]
                });
            }

        }catch (e){
            console.log(e)
            // msg.reply({
            //     content: "",
            //     embeds: [new EmbedBuilder().setColor("#FF0000").setTitle(texts.warn.bd)],
            //     ephemeral: true
            // })
        }
    }
}