const {texts, data, DM} = require("../config.json")
const {EmbedBuilder, PermissionsBitField} = require("discord.js")
const {db} = require("../database.js")

module.exports = {
    application:{
        name: "unban",
        description: "unban user",
        options:[{
            name: "user",
            description:"user nick/id",
            type: 3,
            required: true
        }]
    },
    start(bot, msg, args){
        if(args.length < 1 ) return;
        try {
            Object.keys(db().users).forEach((us)=>{
                if(!db().users[us].ban || !db().users[us].name) return
                if(db().users[us].name == args[0] || us == args[0]){
                    msg.guild.bans.remove(us)
                    delete db().users[us].ban
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
                                        "value": `<@${us}>`,
                                        "inline": true
                                    },
                                    {
                                        "name": `Модератор`,
                                        "value": `<@${msg.member.id}>`,
                                        "inline": true
                                    }
                                ],
                                "author": {
                                    "name": `[UNBAN] ${db().users[us].name}`
                                }
                            }
                        ]
                    });
                }

            })
            msg.reply({
                content: "",
                embeds: [new EmbedBuilder().setColor("#30fc03").setTitle(texts.unban.sc)],
                ephemeral: true
            })
        }catch (e){
            console.log(e)
        }
    }
}