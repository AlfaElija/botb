const {texts, data, DM} = require("../config.json")
const {EmbedBuilder, PermissionsBitField} = require("discord.js")
const {db} = require("../database.js")

module.exports = {
    application:{
        name: "unwarn",
        description: "Замутить пользователя",
        options:[{
            name: "user",
            description:"Упомяните пользователя через @",
            type: 9,
            required: true
        }]
    },
    start(bot, msg, args){
        if(args.length < 1) return;
        let user = msg.guild.members.cache.get(args[0])
        if(user == undefined) user = msg.guild.members.cache.get(args[0].slice(1).slice(1, -1))
        try {
            if(!db().users[user.id] || !db().users[user.id].warns) {
                msg.reply({
                    content: "",
                    embeds: [new EmbedBuilder().setColor("#FF0000").setTitle(texts.warn.bd)],
                    ephemeral: true
                })
                return;
            }
            db().users[user.id].warns.shift()
            msg.reply({
                content: "",
                embeds: [new EmbedBuilder().setColor("#30fc03").setTitle(texts.unwarn.sc)],
                ephemeral: true
            })
                msg.guild.channels.cache.get(data.log_chn).send({
                    "content": "",
                    "embeds": [
                        {
                            "type": "rich",
                            "title": "",
                            "description": "",
                            "color": 0x30fc03,
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
                                }
                            ],
                            "author": {
                                "name": `[UNWARN] ${user.displayName}`
                            }
                        }
                    ]
                });
        }catch (e){
            console.log(e)
        }
    }
}