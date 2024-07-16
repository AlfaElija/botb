const {texts, DM} = require("../config.json")
const {EmbedBuilder, PermissionsBitField} = require("discord.js")
const {db} = require("../database.js")

module.exports = {
    application:{
        name: "lvl",
        description: "Редактирование уровня",
        options:[{
            name: "set",
            description: "Установить уровнь игроку",
            type: 1,
            options: [{
                name: "user",
                description:"Упомяните пользователя через @",
                type: 9,
                required: true
            },{
                name: "lvl",
                description:"Сколько lvl",
                type: 4,
                required: true
            }],
        },{
            name: "add",
            description: "Добавить уровнь игроку",
            type: 1,
            options: [{
                name: "user",
                description:"Упомяните пользователя через @",
                type: 9,
                required: true
            },{
                name: "lvl",
                description:"Сколько lvl",
                type: 4,
                required: true
            }],
        },{
            name: "del",
            description: "Уменьшить уровнь игроку",
            type: 1,
            options: [{
                name: "user",
                description:"Упомяните пользователя через @",
                type: 9,
                required: true
            },{
                name: "lvl",
                description:"Сколько lvl",
                type: 4,
                required: true
            }],
        }]
    },
    start(bot, msg, args){
        if(!msg.options._subcommand) return
        if(args.length < 2 ) return;
        let user = msg.guild.members.cache.get(args[0])
        if(user == undefined) user = msg.guild.members.cache.get(args[0].slice(1).slice(1, -1))
        if(msg.options._subcommand == "set"){
            if (Number(args[1]) < 0) {
                return;
            }
            if (!db().users[user.id]) {
                db().users[user.id] = {}
            }
            if (!db().users[user.id].xp) db().users[user.id].xp = 0
            if (!db().users[user.id].lvl) db().users[user.id].lvl = 0
            if (!db().users[user.id].nlvl) db().users[user.id].nlvl = 10
            if (!db().users[user.id].kk) db().users[user.id].kk = 3
            let g = {
                "xp": 0,
                "lvl": 0,
                "nlvl": 5,
                "kk": 3
            }
            for (var i = 0; i < Number(args[1]); i++) {
                g.lvl += 1
                g.nlvl += g.kk
                g.kk++
                g.xp = 0
            }
            db().users[user.id].xp = g.xp
            db().users[user.id].lvl = g.lvl
            db().users[user.id].nlvl = g.nlvl
            db().users[user.id].kk = g.kk
            msg.reply({
                content: "",
                embeds: [
                    {
                        "type": "rich",
                        "title": "Успешное установление уровня",
                        "description": "",
                        "color": 0x30fc03,
                        "fields": []
                    }
                ]
            })
        }else if(msg.options._subcommand == "add"){
            try {
                if (Number(args[1]) < 0) {
                    return;
                }
                if (!db().users[user.id]) {
                    db().users[user.id] = {}
                }
                if (!db().users[user.id].xp) db().users[user.id].xp = 0
                if (!db().users[user.id].lvl) db().users[user.id].lvl = 0
                if (!db().users[user.id].nlvl) db().users[user.id].nlvl = 5
                if (!db().users[user.id].kk) db().users[user.id].kk = 3
                for (var i = 0; i < Number(args[1]); i++) {
                    db().users[user.id].lvl += 1
                    db().users[user.id].nlvl += db().users[user.id].kk
                    db().users[user.id].kk++
                    db().users[user.id].xp = 0
                }
                msg.reply({
                    content: "",
                    embeds: [
                        {
                            "type": "rich",
                            "title": "Успешное добовление уровня",
                            "description": "",
                            "color": 0x30fc03,
                            "fields": []
                        }
                    ]
                })
            } catch (e) {
                console.log(e)
            }
        }else if(msg.options._subcommand == "del"){
            if (Number(args[1]) < 0) {
                return;
            }
            if (!db().users[user.id]) {
                db().users[user.id] = {}
            }
            if (!db().users[user.id].xp) db().users[user.id].xp = 0
            if (!db().users[user.id].lvl) db().users[user.id].lvl = 0
            if (!db().users[user.id].nlvl) db().users[user.id].nlvl = 5
            if (!db().users[user.id].kk) db().users[user.id].kk = 3
            if(db().users[user.id].lvl <= 0 ) return;
            let g = {
                "xp": 0,
                "lvl": 0,
                "nlvl": 5,
                "kk": 3
            }
            for (var i = 0; i < db().users[user.id].lvl - Number(args[1]); i++) {
                g.lvl += 1
                g.nlvl += g.kk
                g.kk++
                g.xp = 0
            }
            db().users[user.id].xp = g.xp
            db().users[user.id].lvl = g.lvl
            db().users[user.id].nlvl = g.nlvl
            db().users[user.id].kk = g.kk
            msg.reply({
                content: "",
                embeds: [
                    {
                        "type": "rich",
                        "title": "Успешное уменьшение уровня",
                        "description": "",
                        "color": 0x30fc03,
                        "fields": []
                    }
                ]
            })
        }
    }
}