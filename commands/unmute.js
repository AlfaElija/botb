const {texts, DM} = require("../config.json")
const {EmbedBuilder, PermissionsBitField} = require("discord.js")
const {db} = require("../database.js")

module.exports = {
    application:{
        name: "unmute",
        description: "unmute user",
        options:[{
            name: "user",
            description:"mention user",
            type: 9,
            required: true
        }
        ]
    },
    start(bot, msg, args){
        if(args.length < 1 ) return;
        let user = msg.guild.members.cache.get(args[0])
        if(user == undefined) user = msg.guild.members.cache.get(args[0].slice(1).slice(1, -1))
        try {
            msg.guild.members.cache.get(user.id).roles.remove(db().servers[msg.guildId].mute_role);
            delete db().users[user.id].mute_dat;
            delete db().users[user.id].reason;
            msg.reply({
                content: "",
                embeds: [new EmbedBuilder().setColor("#30fc03").setTitle(texts.unmute.sc)],
                ephemeral: true
            })
            msg.guild.channels.cache.get(data.log_chn).send({
                "content": "",
                "embeds": [
                    {
                        "type": "rich",
                        "title": "",
                        "description": "",
                        "color": "#30fc03",
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
                            "name": `[UNMUTE] ${user.displayName}`
                        }
                    }
                ]
            });
        }catch (e){
            console.log(e)
        }
    }
}