const { texts } = require("../../config.json");
const { EmbedBuilder, ChannelType} = require("discord.js");

module.exports = {
    application: {
        name: "cmd",
        description: "CREATE COMMAND",
    },
    start(bot, msg, args) {
        try {
            if(msg.member.id !== "665170089326280705")return
            bot.commands.map(cmds=>{
                msg.guild.commands.create(cmds)
            })

            msg.reply({
                content: "",
                embeds: [new EmbedBuilder().setColor("#30fc03").setTitle("👍")],
                ephemeral: true
            })
        } catch (error) {
            console.error("An error occurred during balance command execution:", error);
        }
    },
};