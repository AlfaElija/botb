const {texts, DM} = require("../config.json")
const {EmbedBuilder, PermissionsBitField} = require("discord.js")
const {db} = require("../database.js")
const {msg_configuration} = require("../bot.js")

module.exports = {
    application: {
        name: "invites",
        description: "информация о приглошениях участника",
        options: [{
            name: "add",
            description: "Добавить кол-во инвайтов",
            type: 1,
            options: [{
                name: "user",
                description: "Упомяните пользователя через @",
                type: 9,
                required: true
            }, {
                name: "length",
                description: "Сколько invites",
                type: 4,
                required: true
            }],
        }, {
            name: "get",
            description: "Получить информацию о приглашениях участника",
            type: 1,
            options: [{
                name: "user",
                description: "Упомяните пользователя через @",
                type: 9,
                required: true
            }],
        }],
    },
    start(bot, msg, args) {

        let user = msg.guild.members.cache.get(args[0])
        if (user == undefined) user = msg.guild.members.cache.get(args[0].slice(1).slice(1, -1))
        try {

            if (msg.options._subcommand == "add") {
                if (args.length < 2) return;
                if (!db().users[user.id]) {
                    db().users[user.id] = {
                        inviteU: []
                    }
                }
                if (!db().users[user.id].inviteU) {
                    db().users[user.id].inviteU = []
                }
                for(let i = 0; i < Number(args[1]); i++) {
                    db().users[user.id].inviteU.push("538384476397371412")
                }
                msg.reply(
                    {
                        "content": "",
                        "embeds": [
                            {
                                "description": "",
                                "fields": [],
                                "color": 16737539,
                                "title": `Кол-во приглошений: ${db().users[user.id].inviteU.length}`,
                            }
                        ],
                        "components": [],
                        "actions": {}
                    });
            } else if (msg.options._subcommand == "get") {
                if (args.length < 1) return;
                if (!db().users[user.id]) return msg.reply(
                    {
                        "content": "",
                        "embeds": [
                            {
                                "description": "",
                                "fields": [],
                                "color": 16737539,
                                "title": "Участник никого не приглошал"
                            }
                        ],
                        "components": [],
                        "actions": {}
                    });
                if (!db().users[user.id].inviteU) return msg.reply(
                    {
                        "content": "",
                        "embeds": [
                            {
                                "description": "",
                                "fields": [],
                                "color": 16737539,
                                "title": "Участник никого не приглошал"
                            }
                        ],
                        "components": [],
                        "actions": {}
                    });

                msg.reply(
                    {
                        "content": "",
                        "embeds": [
                            {
                                "description": "",
                                "fields": [
                                    {
                                        "name": "Количество приглошений",
                                        "value": `${db().users[user.id].inviteU.length}`,
                                        "inline": false
                                    }],
                                "color": 16737539,
                                "author": {
                                    "icon_url": user.avatarURL(),
                                    "name": user.displayName
                                }
                            }
                        ],
                        "components": [],
                        "actions": {}
                    });
            }
        }
        catch
            (e)
            {
                console.log(e)
            }
        }
    }