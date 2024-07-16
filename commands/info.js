const {texts, DM} = require("../config.json")
const {EmbedBuilder, PermissionsBitField} = require("discord.js")
const {db} = require("../database.js")
const {msg_configuration} = require("../bot.js")

module.exports = {
    application: {
        name: "info",
        description: "информация о участнике",
        options: [{
            name: "user",
            description: "пинг участника",
            type: 9,
            required: true
        }],
    },
    start(bot, msg, args) {
        if (args.length < 1) return;
        let user = msg.guild.members.cache.get(args[0])
        if (user == undefined) user = msg.guild.members.cache.get(args[0].slice(1).slice(1, -1))
        if (!db().users[user.id]) {
            db().users[user.id] = {coins: 0};
        }
        if (!db().users[user.id].xp) db().users[user.id].xp = 0
        if (!db().users[user.id].lvl) db().users[user.id].lvl = 0
        if (!db().users[user.id].nlvl) db().users[user.id].nlvl = 10
        if (!db().users[user.id].kk) db().users[user.id].kk = 3
        if (!db().users[user.id].coins) {
            db().users[user.id].coins = 0;
        }
        if (!db().users[user.id].DU) db().users[user.id].DU = 0
        if (!db().users[user.id].winDU) db().users[user.id].winDU = 0
        if (!db().users[user.id].winCas) db().users[user.id].winCas = 0
        let warns;
        if (!db().users[user.id].warns) {
            warns = 0
        } else {
            warns = db().users[user.id].warns.length
        }
        try {
            msg.reply(
                {
                    "content": "",
                    "embeds": [
                        {
                            "description": "",
                            "fields": [
                                {
                                    "name": "Ник",
                                    "value": `<@${user.id}>`,
                                    "inline": false
                                },
                                {
                                    "name": "Монеты",
                                    "value": `${db().users[user.id].coins}`,
                                    "inline": false
                                },
                                {
                                    "name": "Предупреждения",
                                    "value": `${warns}`,
                                    "inline": false
                                },
                                {
                                    "name": "LVL",
                                    "value": `${db().users[user.id].lvl}`,
                                    "inline": false
                                },
                                {
                                    "name": "Дуэлей сыграно",
                                    "value": `${db().users[user.id].DU}`,
                                    "inline": false
                                },
                                {
                                    "name": "Дуэлей выиграно ",
                                    "value": `${db().users[user.id].winDU}`,
                                    "inline": false
                                },
                                {
                                    "name": "Выиграно монет в казино",
                                    "value": `${db().users[user.id].winCas}`
                                }
                            ],
                            "color": 16737539,
                            "author": {
                                "icon_url": user.avatarURL(),
                                "name": user.displayName
                            },
                            "title": "Данные"
                        }
                    ],
                    "components": [],
                    "actions": {}
                });
        } catch (e) {
            console.log(e)
        }
    }
}