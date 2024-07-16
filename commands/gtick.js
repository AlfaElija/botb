const {texts, data, DM} = require("../config.json")
const {EmbedBuilder, PermissionsBitField, cleanContent, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType} = require("discord.js")
const {db} = require("../database.js")

module.exports = {
    application:{
        name: "gtick",
        description: "Создать сообщенеие тикета",
        options:[{
            name: "name",
            description:"название",
            type: 3,
            required: true
        },{
            name: "descriptions",
            description:"описание",
            type: 3,
            required: true
        }
        ]
    },
    async start(bot, msg, args){
        if(args.length < 2) return;
        try {
            let key = await gg()

            msg.guild.channels.create({
                type: ChannelType.GuildCategory,
                name:"Тикит №"+db().tickets.length,
            }).then((chn)=>{
                db().tickets.push({
                    "id": key,
                    "cn": {},
                    "ct": chn.id,
                    "msg": msg.id,
                    "channel": msg.channel.id,
                    "name": args[0],
                    "descriptions": args.slice(1).join(" ")
                })
                msg.reply({
                    content: "",
                    embeds: [{
                        "type": "rich",
                        "title": `${args[0]}`,
                        "description": "Нажмите на 📩 чтобы создать тикет",
                        "color": 0xfc3c3c
                    }],
                    components: [
                        new ActionRowBuilder().addComponents(new ButtonBuilder()
                            .setCustomId(`${key}`)
                            .setLabel('📩 Создать тикет 📩')
                            .setStyle(ButtonStyle.Success)
                        )
                    ]
                })
            })

        }catch (e){
            console.log(e)
        }
    }
}

async function  gg(){
    let frt = ["1","2","3","4","5","6","7","8","9","0","O","#","$","a","b","d","s","v","c","x","z","r","f","g","t","q","n","m","y","p","l","e","w","k","i","o"];
    let shif_key= [];
    for(let u = 0; u < 11; u++){
        let it = Math.floor(Math.random() * frt.length);
        let tii = frt[it];
        shif_key.push(tii);
    }
    db().tickets.forEach((tk)=>{
        if(tk.id == shif_key.join("")) return gg()
    })
    return shif_key.join("")
}