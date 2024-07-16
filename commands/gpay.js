const {texts, DM} = require("../config.json")
const {EmbedBuilder, PermissionsBitField} = require("discord.js")
const {db} = require("../database.js")

module.exports = {
    application:{
        name: "gpay",
        description: "Переводит монеты за счёт сервера",
        options:[{
            name: "user",
            description:"Упомяните пользователя через @",
            type: 9,
            required: true
        },{
            name: "coins",
            description:"Сколько монет",
            type: 4,
            required: true
        }]
    },
    start(bot, msg, args){
        if(args.length < 2 ) return;
        let user = msg.guild.members.cache.get(args[0])
        if(user == undefined) user = msg.guild.members.cache.get(args[0].slice(1).slice(1, -1))
        try {
            if(!db().users[user.id]) db().users[user.id] = {coins: 0}
            if(!db().users[user.id].coins) db().users[user.id].coins = 0
            db().users[user.id].coins += Number(args[1]);//new EmbedBuilder().setColor("#30fc03").setTitle(`Успешный перевод на сумму: \т${Number(args[1])}, получатель: <@${user.id}>`)
            msg.reply({
                content: "",
                embeds: [
                        {
                            "type": "rich",
                            "title": "Успешный перевод",
                            "description": "",
                            "color": 0x30fc03,
                            "fields": [
                                {
                                    "name": `Отправитель`,
                                    "value": `<@${msg.member.id}>`,
                                    "inline": true
                                },
                                {
                                    "name": `Сумма`,
                                    "value": `${Number(args[1])}`,
                                    "inline": true
                                },
                                {
                                    "name": `Получатель`,
                                    "value": `<@${user.id}>`,
                                    "inline": true
                                }
                            ]
                        }
                ]
            })
        }catch (e){
            console.log(e)
        }
    }
}