const {texts, data, DM} = require("../config.json")
const {EmbedBuilder, PermissionsBitField, cleanContent, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType} = require("discord.js")
const {db} = require("../database.js")

module.exports = {
    application:{
        name: "stick",
        description: "Создать созданный тикет",
        options:[{
            name: "name",
            description:"название",
            type: 3,
            required: true
        },{
            name: "id",
            description:"название",
            type: 3,
            required: true
        }
        ]
    },
    async start(bot, msg, args){
        if(args.length < 1) return;
        try {
            let l = 9898;
            for(let i = 0; i < db().tickets.length; i++){
                if(db().tickets[i].id == args[1]){
                    l=i;
                }
            }
            if(l == 9898) return;
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
                            .setCustomId(`${args[1]}`)
                            .setLabel('📩 Создать тикет 📩')
                            .setStyle(ButtonStyle.Success)
                        )
                    ]
                }).then((m)=>{
                    db().tickets[l].msg = m.id;
                    db().tickets[l].name = args[0];
                    db().tickets[l].channel = msg.channel.id
                })
        }catch (e){
            console.log(e)
        }
    }
}

async function  gg(){
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