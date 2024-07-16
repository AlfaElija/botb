const {texts, data, DM} = require("../config.json")
const {EmbedBuilder, PermissionsBitField} = require("discord.js")

module.exports = {
    application:{
        name: "kick",
        description: "kick user",
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
            msg.guild.members.cache.get(user.id).kick({
                deleteMessageSeconds: 60 * 60 * 24 * 7,
                reason: args.slice(1).join(" ")
            }).then(() => {
                msg.reply({
                    content: "",
                    embeds: [new EmbedBuilder().setColor("#30fc03").setTitle(texts.kick.sc)],
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
                                    "value": `${args.slice(1).join(" ") }`,
                                    "inline": true
                                }
                            ],
                            "author": {
                                "name": `[KICK] ${user.displayName}`
                            }
                        }
                    ]
                });
            }).catch(err => {
                console.log(err);
            });
        }catch (e){
            console.log(e)
        }
    }
}