const {texts, DM} = require("../config.json")
const {EmbedBuilder, PermissionsBitField} = require("discord.js")
const {db} = require("../database.js")
const {msg_configuration} = require("../bot.js")

module.exports = {
    application: {
        name: "lider",
        description: "Топ участников"
    },
    start(bot, msg, args) {
        try {
            // descending distribution of lvl
            let f =
                []
            let h = [];
            Object.keys(db().users).forEach((u)=>{
                if (!db().users[u].lvl) db().users[u].lvl = 0;
                if (!db().users[u].xp) db().users[u].xp = 0;
                h.push({
                    id:u,
                    lvl:db().users[u].lvl,
                    xp:db().users[u].xp
                })
            })

            h.sort(function (a, b) {
                if (a.lvl < b.lvl) {
                    return 1;
                }
                if (a.lvl > b.lvl) {
                    return -1;
                }
                // a должно быть равным b
                return 0;
            });
            for(let i = 0; i < 10; i++) {
                if(!msg.guild.members.cache.get(h[i].id)) break
                if(i == 0){
                    f.push({
                        name: `🥇#${i+1}. ${msg.guild.members.cache.get(h[i].id).displayName}`,
                        value: `**Уровень:** ${h[i].lvl} | **Опыт:** ${h[i].xp}`,
                    })
                }else if(i == 1){
                    f.push({
                        name: `🥈#${i+1}. ${msg.guild.members.cache.get(h[i].id).displayName}`,
                        value: `**Уровень:** ${h[i].lvl} | **Опыт:** ${h[i].xp}`,
                    })
                }else if(i == 2){
                    f.push({
                        name: `🥉#${i+1}. ${msg.guild.members.cache.get(h[i].id).displayName}`,
                        value: `**Уровень:** ${h[i].lvl} | **Опыт:** ${h[i].xp}`,
                    })
                }else {
                    f.push({
                        name: `#${i + 1}. ${msg.guild.members.cache.get(h[i].id).displayName}`,
                        value: `**Уровень:** ${h[i].lvl} | **Опыт:** ${h[i].xp}`,
                    })
                }
            }

            msg.reply({
                "content": "",
                "embeds": [
                    {
                        "description": "\u200b",
                        "fields": f,
                        "title": "🏆 Топ рейтинга участников 🏆",
                        "thumbnail": {
                            "url": "https://cdn.discordapp.com/icons/722417067596185610/a_b948dfa3a5efa07291cd17fa36cfc0b1.gif"
                        }
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