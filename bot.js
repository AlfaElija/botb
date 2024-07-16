const {
    Client,
    GatewayIntentBits,
    PermissionFlagsBits,
    ChannelType,
    Collection,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle
} = require("discord.js");


const {QuickDB} = require("quick.db");
const db = new QuickDB({filePath: "DB.sqlite"});
const bot = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildScheduledEvents, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.MessageContent]});
const fs = require('fs');
const {createCanvas, loadImage, registerFont} = require("canvas");

const {save, load} = require('./database.js');
const config = require('./config.json');

bot.commands = new Collection()
bot.db = db;

bot.login(config.token);

process.on("SIGINT", () => {
    console.log("[END]Завершение процесов...");
    save();
    process.exit();
})

// const transferDataToDb = (object, prefix = '') => {
//     Object.keys(object).forEach(key => {
//         const value = object[key];
//         const keyPath = prefix ? `${prefix}.${key}` : key;
//
//         // if (typeof value === 'object' && !Array.isArray(value)) {
//         //     // If the value is an object (nested), recurse into it
//         //     transferDataToDb(value, keyPath);
//         // } else {
//             // Set the value in quick.db
//             db2.set(keyPath, value);
//         // }
//     });
// };

bot.on("ready", async () => {
    try {
        console.info(`[Console] Preparing bot to work...`);
        bot.user.setPresence({activities: [{name: 'за сервером', type: 3}], status: 'online'});
        console.info(`[CommandManager] Loading commands...`);
        fs.readdirSync("./interactions/commands").filter(com => com.endsWith(".js")).forEach((com) => {
            let command = require(`./interactions/commands/${com}`).application

            bot.commands.set(command.name, command)
            console.info(`\t${command.name} load;`);
        })
        console.info(`[CommandManager] Loading commands end.`);
        await bot.guilds.cache.get("722417067596185610").invites.fetch().then(async (guildInvites) => {
            let f = {}
            guildInvites.map(async invite => {
                f[invite.code] = {uses: invite.uses, inviter: invite.inviter.id}
            });
            await bot.db.set("invites", f);
        });


        console.info(`[Console] ${bot.user.tag} ready to work.`);



        setInterval(async () => {
            try {
                let users = await bot.db.get("users");
                if (!users) return;

                create_img(bot.guilds.cache.get("722417067596185610"));

                // Unmute users
                Object.keys(users).forEach(async us => {
                    const user = bot.guilds.cache.get("722417067596185610").members.cache.get(us);

                    if (users[us].mute_dat <= Date.now()) {
                        try {
                            user.roles.remove("1014089546306170931");
                            delete users[us].mute_dat;
                            delete users[us].reason;

                            bot.guilds.cache.get("722417067596185610").channels.cache.get(config.data.log_chn).send({
                                content: "",
                                embeds: [{
                                    type: "rich",
                                    title: "",
                                    description: "",
                                    color: 0x30fc03,
                                    fields: [
                                        {name: `Пользователь`, value: `<@${us}>`, inline: true},
                                        {name: `Модератор`, value: `<@${bot.user.id}>`, inline: true}
                                    ],
                                    author: {name: `[UNMUTE] ${user.displayName}`}
                                }]
                            });
                        }catch (e) {
                            console.log(e);
                        }                    }
                });
                bot.db.set("users", users);
                //console.info(`[CHECK]`);
                let giveaways = await bot.db.get("giveawaysM");

                // Process giveaways
                Object.keys(giveaways ).forEach(async (m) => {
                    let giveawayData = giveaways[m];
                    let message = await bot.guilds.cache.get("722417067596185610").channels.cache.get(giveawayData.channel).messages.cache.find(ms => ms.interaction && ms.interaction.id == giveawayData.ms);

                    if (!message) return;

                    giveawayData.time--;
                    if (giveawayData.voice) {
                        giveawayData.users = giveawayData.users.filter(async (us) => {
                            let u = 0;
                            await bot.guilds.cache.get("722417067596185610").channels.cache.toJSON().filter((channel) =>
                                [2].includes(channel.type)
                            ).forEach((ch) => {
                                if (ch.members.map(user => user.user.id).includes(us)) {
                                    u++;
                                }
                            });

                            return u > 0;
                        });
                    }

                    if (giveawayData.time <= 0) {
                        let winner = (giveawayData.users.length <= 0) ? "никого" : giveawayData.users.slice(0, giveawayData.value).map(winnerID => `<@${winnerID}>`).join(", ");

                        message.edit({
                            content: "",
                            embeds: [{
                                type: "rich",
                                title: `${giveawayData.title}`,
                                description: `Победители: ${winner}`,
                                color: 0xfc3c3c,
                                fields: [
                                    {
                                        name: "**Количество победителей**",
                                        value: `\`\`\`${giveawayData.value} чел.\`\`\``,
                                        inlines: true
                                    },
                                    {
                                        name: "**Длительность**",
                                        value: `\`\`\`${giveawayData.time} мин.\`\`\``,
                                        inlines: true
                                    }
                                ],
                                footer: {text: `Принимают участие: 0 чел.`}
                            }],
                            components: [
                                new ActionRowBuilder().addComponents(
                                    new ButtonBuilder().setCustomId('participate').setLabel('Участвовать').setStyle(ButtonStyle.Success).setDisabled(true)
                                )
                            ]
                        }).then(async () => {
                            await bot.db.set(`OldGiveaways.${m}`, giveaways[m]);
                            await delete giveaways[m];
                            await bot.db.set("giveawaysM", giveaways);
                        });
                        return;
                    }

                    message.edit({
                        content: "",
                        embeds: [{
                            type: "rich",
                            title: `${giveawayData.title}`,
                            description: "",
                            color: 0xfc3c3c,
                            fields: [
                                {
                                    name: "**Количество победителей**",
                                    value: `\`\`\`${giveawayData.value} чел.\`\`\``,
                                    inlines: true
                                },
                                {
                                    name: "**Длительность**",
                                    value: `\`\`\`${giveawayData.time} мин.\`\`\``,
                                    inlines: true
                                }
                            ],
                            footer: {text: `*Принимают участие: ${giveawayData.users.length} чел.*`}
                        }],
                        components: [
                            new ActionRowBuilder().addComponents(
                                new ButtonBuilder().setCustomId('participate').setLabel('Участвовать').setStyle(ButtonStyle.Success)
                            )
                        ]
                    });
                    bot.db.set("giveawaysM", giveaways);
                });



                // Process warns
                Object.keys(users).forEach(us => {
                    const userWarns = users[us].warns;

                    if (userWarns) {
                        userWarns.forEach(warn => {
                            let warnDate = new Date(warn.date);
                            warnDate.setHours(warnDate.getHours() + 24 * 7);

                            if (warnDate.getTime() <= new Date().getTime()) {
                                bot.guilds.cache.get("722417067596185610").channels.cache.get(config.data.log_chn).send({
                                    content: "",
                                    embeds: [{
                                        type: "rich",
                                        title: "",
                                        description: "",
                                        color: 0x30fc03,
                                        fields: [
                                            {name: `Пользователь`, value: `<@${us}>`, inline: true},
                                            {name: `Модератор`, value: `<@${bot.user.id}>`, inline: true}
                                        ],
                                        author: {name: `[UNWARN] ${bot.guilds.cache.get("722417067596185610").members.cache.get(us).displayName}`}
                                    }]
                                });

                                users[us].warns = users[us].warns.filter(wn => wn.date !== warn.date);
                            }
                        });
                    }
                    if (!users[us].roles) return
                    const userRolesTimed = users[us].roles.timed;
                    if (userRolesTimed) {
                        Object.keys(userRolesTimed).forEach((r) => {
                            if (userRolesTimed[r].dateless <= new Date().getTime()) {
                                bot.guilds.cache.get("722417067596185610").members.cache.get(us).roles.remove(config.roles[r].id)
                                delete userRolesTimed[r];
                                users[us].roles.list = users[us].roles.list.filter(wn => wn !== r);
                            }
                        })
                    }
                });
                bot.db.set("users", users);

            } catch (error) {
                console.error(error);
            }
        }, 60000);

    } catch (e) {
        console.log(e)
    }
})


bot.on("messageCreate", async (msg) => {
    try {
        if (msg.author.bot || (config.DM && !msg.member.roles.cache.hasAny("1177984990647177308") && msg.channelId !== "1182003346710741073" && msg.channelId !== "1063180746572976199")) {
            return;
        }
        let user = await db.get(`users.${msg.author.id}`);
        // Ensure db().users[msg.author.id] is initialized
        if (!user) {
            user = {};
        }



        // Update lastMSG timestamp
        user.lastMSG = new Date().getTime();

        // Initialize user properties if not present
        user.xp = user.xp || 0;
        user.lvl = user.lvl || 0;
        user.nlvl = user.nlvl || 5;
        user.kk = user.kk || 3;

        // Increment XP and check for level up
        user.xp++;

        if (user.xp === user.nlvl) {
            user.lvl++;
            user.nlvl += user.kk;
            user.kk++;
            user.xp = 0;

            if (config.lvlsRoles[user.lvl]) {
                msg.member.roles.add(config.lvlsRoles[user.lvl - 1]);
                if (config.lvlsRoles[user.lvl - 2]) {
                    msg.member.roles.remove(config.lvlsRoles[user.lvl - 2]);
                }
            }

            const levelUpEmbed = {
                type: "rich",
                title: ``,
                description: `Пользователь <@${msg.author.id}> достиг **${user.lvl} уровня!** 🥳\nЧтобы поднять его выше продолжайте общаться в канале <#939294508842111026>.`,
                color: 0xEDA82B
            };

            msg.guild.channels.cache.get("929385536450330664").send({content: "", embeds: [levelUpEmbed]});
        }
        await db.set(`users.${msg.author.id}`, user);
        if (msg.content === "121") {
            msg.react("1180816321705934879");
        }
    } catch (e) {
        console.error(e);
    }
});


bot.on("guildMemberAdd", async (mem) => {
    try {
        mem.guild.invites.fetch().then(async (guildInvites) => {
            const logChannel = mem.guild.channels.cache.find(channel => channel.id === "852121118857101373");
            const ei = await db.get('invites') || {};
            const invite = guildInvites.find(i => ei[i.code] && ei[i.code].uses < i.uses);

            if (!invite) {
                await logChannel.send(`➡️ ${mem} зашёл.`);
                await bot.guilds.cache.get("722417067596185610").invites.fetch().then(async (guildInvites) => {
                    let f = {}
                    guildInvites.map(async invite => {
                        f[invite.code] = {uses: invite.uses, inviter: invite.inviter.id}
                    });
                    await bot.db.set("invites", f);
                });
                return;
            }

            const inviter = bot.users.cache.get(invite.inviter.id);

            if (!await db.get(`users.${mem.id}`)) {
                db.set(`users.${mem.id}`, {inviter: inviter.id});
            }

            const memUser = db.get(`users.${mem.id}`);
            memUser.inviter = inviter.id;

            if (!await db.get(`users.${inviter.id}`)) {
                await db.set(`users.${inviter.id}`, {inviteU: [mem.id]});
            } else {
                await db.push(`users.${inviter.id}.inviteU`, mem.id)
            }
            let v =await db.get(`users.${inviter.id}.inviteU`)
            await logChannel.send(`➡️ ${mem} зашёл. Его пригласил <@${inviter.id}> у которого ${v.length} приглашения.\n<a:AFLAME_lickRight:918085082449862676> Аккаунт пользователя создан **${new Date(mem.user.createdTimestamp).toLocaleDateString()}, ${new Date(mem.user.createdTimestamp).toLocaleTimeString()}**. <a:AFLAME_lickLeft:918085061826474045>`);

            await bot.guilds.cache.get("722417067596185610").invites.fetch().then(async (guildInvites) => {
                let f = {}
                guildInvites.map(async invite => {
                    f[invite.code] = {uses: invite.uses, inviter: invite.inviter.id}
                });
                await bot.db.set("invites", f);
            });

        });

        if (await db.get(`users.${mem.id}`)) {
            const userRoles = await db.get(`users.${mem.id}.roles`);

            if (userRoles) {
                const timedRoles = userRoles.timed;

                if (timedRoles) {
                    Object.keys(timedRoles).forEach(async (r) => {
                        if (timedRoles[r].dateless <= new Date().getTime()) {
                            await mem.roles.remove(config.roles[r].id);
                            delete timedRoles[r];
                            userRoles.list = userRoles.list.filter(wn => wn !== r);
                        }
                    });
                }

                if (userRoles.list) {
                    await Promise.all(userRoles.list.map((r) => mem.roles.add(config.roles[r].id)));
                }

                if (userRoles.customRole) {
                    await Promise.all(userRoles.customRole.map((r) => mem.roles.add(r)));
                }

                if (userRoles.exclusiveRoles) {
                    await Promise.all(userRoles.exclusiveRoles.map((r) => mem.roles.add(r)));
                }

                if (userRoles.mute_dat) {
                    let warnDate = new Date(userRoles.mute_dat);
                    warnDate.setHours(warnDate.getHours() + 24 * 7);

                    if (warnDate.getTime() <= new Date().getTime()) {
                        await bot.guilds.cache.get("722417067596185610").channels.cache.get(config.data.log_chn).send({
                            content: "",
                            embeds: [{
                                type: "rich",
                                title: "",
                                description: "",
                                color: 0x30fc03,
                                fields: [
                                    {name: `Пользователь`, value: `<@${mem.id}>`, inline: true},
                                    {name: `Модератор`, value: `<@${bot.user.id}>`, inline: true},
                                ],
                                author: {name: `[UNWARN] ${bot.guilds.cache.get("722417067596185610").members.cache.get(mem.id).displayName}`},
                            }],
                        });

                        await db.delete(`users.${mem.id}.warns`);
                    } else {
                        await mem.roles.add(config.mute_role);
                    }
                }
                db.set(`users.${mem.id}.roles`, userRoles);
            }
        }
    } catch (error) {
        console.error(error);
    }

})

bot.on("guildMemberRemove", async (mem) => {
    const logChannel = mem.guild.channels.cache.find(channel => channel.id === "852121118857101373");

    if (!await db.get(`users.${mem.id}`) || !await db.get(`users.${mem.id}.inviter`)) {
        return logChannel.send(`❌ ${mem} покинул сервер.`);
    }

    const inviterId = await db.get(`users.${mem.id}.inviter`);
    const inv = bot.users.cache.get(inviterId) || null;

    if (!await db.get(`users.${inviterId}.inviteU`)) {
        return logChannel.send(`❌ ${mem} покинул сервер.`);
    }

    await db.pull(`users.${inviterId}.inviteU`, `${mem.id}`);
    const remainingInvites = await db.get(`users.${inviterId}.inviteU`);
    logChannel.send(`❌ ${mem} покинул сервер. Его приглашал ${inv} у которого теперь ${remainingInvites.length} приглашения.`);

    config.exsclusiveRole.forEach(async (r) => {
        if (!await db.get(`users.${mem.id}`) || !await db.get(`users.${mem.id}.roles`)) {
            return;
        }

        if (mem.roles.cache.has(r)) {
            const exclusiveRoles = await db.get(`users.${mem.id}.roles.exclusiveRoles`) || [];
            if (exclusiveRoles.includes(r)) return;
            await db.push(`users.${mem.id}.roles.exclusiveRoles`, r);
        }
    });

})
bot.on("inviteCreate", async (invite) => {
    await bot.guilds.cache.get("722417067596185610").invites.fetch().then(async (guildInvites) => {
        let f = {}
        guildInvites.map(async invite => {
            f[invite.code] = {uses: invite.uses, inviter: invite.inviter.id}
        });
        await bot.db.set("invites", f);
    }).catch(error => {
        console.error(`Error fetching guild invites: ${error}`);
    });

})

bot.on("inviteDelete", async (invite) => {
    await db.delete(`invites.${invite.code}`);
});

bot.on("voiceStateUpdate", async (oldState, newState) => {
    try {
        const vvp = await bot.db.get("vvp");
        const dd = await bot.db.get("Vchannels")
        let cl = await bot.db.get("Vchannels");
        const newMember = newState.member;
        const oldMember = oldState.member;
        let newChannel = newState.channel;
        let oldChannel = oldState.channel;
        if(!oldState.channel && !newState.channel){//хз
            return
        }
        if (oldChannel && newChannel && oldChannel !== newChannel || !newChannel) {
            if(Object.keys(dd).includes(oldChannel.id) && oldChannel.members.toJSON().length === 0) {
                oldState.channel.delete();
                delete cl[oldChannel.id];
                await bot.db.set("Vchannels", cl);
            }
        }
        if (oldChannel && newChannel && oldChannel !== newChannel || !oldChannel) {

            let mutedb = false;
            Object.keys(dd).forEach(async (ch) => {
                if(dd[ch].mutedM.includes(newMember.id) && newChannel.id === ch) mutedb = true;
            })
            if (mutedb && Object.keys(dd).includes(newChannel.id)) {
                newMember.voice.setMute(true);
            }else{
                newMember.voice.setMute(false);
            }
            if (newMember.voice.channelId === vvp) {
                const parentChannel = newState.channel.parent;
                const existingChannels = parentChannel.children.cache.toJSON().length;
                const createdChannel = await newState.guild.channels.create({
                    name: `Lobby #${existingChannels - 1}`,
                    parent: parentChannel,
                    type: ChannelType.GuildVoice,
                    permissionOverwrites: [
                        {
                            id: newMember.id,
                            allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ManageChannels],
                        },
                        {
                            id: newMember.guild.roles.everyone,
                            deny: [PermissionFlagsBits.ViewChannel],
                        },
                        {
                            id: await bot.db.get("mute_role"),
                            deny: [PermissionFlagsBits.SendMessages],
                        },
                    ],
                });
                await bot.db.set(`Vchannels.${createdChannel.id}`, {
                    "owner": newMember.id,
                    "lock": false,
                    "mutedM": []
                });

                await newMember.voice.setChannel(createdChannel);
            }
        }


    } catch (e) {
        console.error(e);
    }
    //const vvp = await bot.db.get("vvp");
    //
    //         const newMember = newState.member;
    //         const oldMember = oldState.member;
    //         const dd = await bot.db.get("Vchannels")
    //         try {
    //
    //         if(newState && newState.channel) {
    //             if (Object.keys(dd).includes(newState.channelId)) {
    //                 if (!Object.keys(dd).includes(newState.channelId) && newMember.voice.mute) {
    //                     newMember.voice.setMute(false);
    //                 }
    //                 let Nchn = await bot.db.get(`Vchannels.${newMember.voice.channelId}`);
    //                 if (Nchn) {
    //                     console.log("1111")
    //                     if (Nchn.lock) {
    //                         return newMember.voice.disconnect();
    //                     } else {
    //                         console.log("1211")
    //                         if (Nchn.mutedM.includes(newMember.id) && !newMember.voice.mute) {
    //                             newMember.voice.setMute(true);
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //         }catch (error) {
    //             console.error(error);
    //         }
    //         try {
    //             if(oldState && oldState.channel) {
    //                 if (Object.keys(dd).includes(oldState.channelId) && oldMember.voice.mute) {
    //                     oldMember.voice.setMute(false);
    //                 }
    //             }
    //         }catch (error) {
    //             console.error(error);
    //         }
    //
    //         if (newMember.voice.channelId === vvp) {
    //
    //             const parentChannel = newState.channel.parent;
    //             const existingChannels = parentChannel.children.cache.toJSON().length;
    //
    //             const createdChannel = await newState.guild.channels.create({
    //                 name: `Lobby #${existingChannels - 1}`,
    //                 parent: parentChannel,
    //                 type: ChannelType.GuildVoice,
    //                 permissionOverwrites: [
    //                     {
    //                         id: newMember.id,
    //                         allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ManageChannels],
    //                     },{
    //                         id: await bot.db.get("mute_role"),
    //                         deny: [PermissionFlagsBits.SendMessages],
    //                     },
    //                 ],
    //             });
    //             await bot.db.set(`Vchannels.${createdChannel.id}`, {"owner": newMember.id, "lock":false, "mutedM":[]});
    //
    //             await newMember.voice.setChannel(createdChannel);
    //         } else if (!newState.channelId || Object.keys(dd).includes(oldState.channelId)) {
    //             // let Ochn = await bot.db.get(`Vchannels.${oldMember.voice.channelId}`);
    //             // if(Ochn) {
    //             //     if (Ochn.mutedM.includes(oldMember.id)&& !oldMember.voice.mute) {
    //             //         console.log("22222");
    //             //         oldMember.voice.setMute(false);
    //             //     }
    //             // }
    //             let cl = await bot.db.get("Vchannels");
    //             Object.keys(cl).forEach((channelId, index) => {
    //                 if (channelId === oldState.channelId && oldState.channel.members.size === 0) {
    //                     oldState.channel.delete();
    //                     delete cl[channelId];
    //                 }
    //             });
    //             await bot.db.set("Vchannels", cl);
    //         }
});
//integrations
bot.on("interactionCreate", async (interaction) => {
    try {
        if (interaction.isModalSubmit()) {
            const interactionFiles = fs.readdirSync("./interactions/ModalSubmit/");
            for (const fileName of interactionFiles) {
                const commandName = fileName.split(".")[0];
                if (interaction.customId.startsWith(commandName)) {
                    const commandModule = require(`./interactions/ModalSubmit/${fileName}`);
                    await commandModule.start(bot, interaction);
                    return;
                }
            }

            const fff1 = [
                {
                    "name": "Ник",
                    "value": `<@${interaction.user.id}>`,
                    "inline": false
                }
            ];

            const fi = interaction.fields.fields.toJSON();
            for (const f in fi) {
                fff1.push({
                    "name": config.wopr[interaction.customId.split("-")[0]].questions[f].split("|")[1],
                    "value": fi[f].value,
                    "inline": false
                });
            }
            const v = config.wopr
            let f = Object.values(v).filter(w => w.id.split("-")[1] == interaction.customId.split("-")[1])[0]
            if(!interaction.member.roles.cache.has(f.m_r) && !interaction.member.roles.cache.has("930497465336082462") && [1065410117350207530].includes(interaction.channel.id)) return interaction.reply({
                content: "",
                embeds: [new EmbedBuilder().setDescription("Вы не можете одобрить заявку").setColor(0xFF0000)],
                ephemeral: true
            })
            await interaction.update({
                "content": "",
                "embeds": [
                    {
                        "description": "<a:AFLAME_warning:1050039198322798613> Мы готовы исполнить Вашу мечту и подарить замечательный опыт, поэтому открываем набор на следующие должности:\n" +
                            "\n" +
                            "<a:AFLAME_right:1050039008954155068> <@&930427790279450664> — занимаются модерацией текстовых и голосовых каналов на сервере\n" +
                            "<a:AFLAME_right:1050039008954155068> <@&1167199824509157396> — отвечают за продвижение сервера за его пределами\n" +
                            "<a:AFLAME_right:1050039008954155068> <@&937247747747233814> — контент-мейкеры, партнеры на взаимовыгодных отношениях\n" +
                            "<a:AFLAME_right:1050039008954155068> <@&1062455279146520596> — ответственные личности нашей Команды за дизайн\n" +
                            "<a:AFLAME_right:1050039008954155068> <@&1186041290090094635> — лучшие помощники и знатоки сервера по механикам игры\n" +
                            "\n" +
                            "> Что от вас требуется?\n" +
                            "- Быть готовым уделять серверу внимание\n" +
                            "- Желание получать опыт в выбранной должности\n" +
                            "- Желание достигать высот\n" +
                            "\n" +
                            "<a:AFLAME_cat_fire:1185329568765194270> Рассмотрение заявления занимает до 12 часов",
                        "fields": [],
                        "color": 16737539,
                        "title": "Открыт набор в Команду сервера!"
                    }
                ],
                "components": [
                    {
                        "type": 1,
                        "components": [
                            {
                                "custom_id": `S-menu-forms`,
                                "placeholder": `Выберите должность`,
                                "options": [
                                    {
                                        "label": `Модератор`,
                                        "value": `moderator`
                                    },
                                    {
                                        "label": `PR Manager`,
                                        "value": `prmanager`
                                    },
                                    {
                                        "label": `Дизайнер`,
                                        "value": `disaner`
                                    },
                                    {
                                        "label": `Медиа-партнёр`,
                                        "value": `mediapartner`
                                    },
                                    {
                                        "label": `Шерп`,
                                        "value": `sherp`
                                    }
                                ],
                                "min_values": 1,
                                "max_values": 1,
                                "type": 3
                            }
                        ]
                    }
                ]
            });

            const logChannel = interaction.guild.channels.cache.get("1065410117350207530");
            await logChannel.send({
                "content": `||<@&${f.m_r}>||`,
                "embeds": [
                    {
                        "description": "",
                        "fields": fff1,
                        "color": 16737539,
                        "title": config.wopr[interaction.customId.split("-")[0]].title
                    }
                ],
                "components": [
                    {
                        "type": 1,
                        "components": [
                            {
                                "style": 2,
                                "label": ``,
                                "custom_id": `confirmForm-${interaction.customId.split("-")[1]}-${interaction.user.id}`,
                                "disabled": false,
                                "type": 2,
                                "emoji": {
                                    "id": null,
                                    "name": `✔`
                                },
                            },
                            {
                                "style": 2,
                                "label": ``,
                                "custom_id": `notconfirmForm-${interaction.customId.split("-")[1]}-${interaction.user.id}`,
                                "disabled": false,
                                "type": 2,
                                "emoji": {
                                    "id": null,
                                    "name": `❌`
                                },
                            }
                        ],
                        "actions": {}
                    }
                ]
            });
        }

        if (interaction.isStringSelectMenu()) {
            const interactionFiles = fs.readdirSync("./interactions/StringSelectMenu/");
            for (const fileName of interactionFiles) {
                const commandName = fileName.split(".")[0];
                if (interaction.customId.startsWith(commandName)) {
                    const commandModule = require(`./interactions/StringSelectMenu/${fileName}`);
                    await commandModule.start(bot, interaction);
                }
            }
        }

        if (interaction.isCommand()) {
            if (config.DM) {
                if (!interaction.member.roles.cache.hasAny("1177984990647177308")) return;
                if (!(interaction.channelId === "1182003346710741073" || interaction.channelId === "1063180746572976199")) {
                    await interaction.reply({
                        content: "",
                        embeds: [
                            {
                                "type": "rich",
                                "title": `Бот на тех. работах`,
                                "description": "",
                                "color": 0xFF0000
                            }
                        ]
                    });
                    return;
                }
            }

            const cmd = bot.commands.get(interaction.commandName);
            const args = interaction.options._hoistedOptions.map(option => option.value);

            if (!cmd) return;

            const commandModule = require(`./interactions/commands/${cmd.name}.js`);
            await commandModule.start(bot, interaction, args);
        } else if (interaction.isButton()) {
            if (config.DM) {
                if (!interaction.member.roles.cache.hasAny("1177984990647177308")) return;
            }

            const buttonFiles = fs.readdirSync("./interactions/Button/");
            for (const fileName of buttonFiles) {
                const buttonName = fileName.split(".")[0];
                if (interaction.customId.startsWith(buttonName)) {
                    const buttonModule = require(`./interactions/Button/${fileName}`);
                    await buttonModule.start(bot, interaction);
                }
            }

            const ticket = await bot.db.get(`tickets.${interaction.customId}`);
            if (ticket) {
                const channel = await interaction.guild.channels.create({
                    type: "GUILD_TEXT",
                    name: `${ticket.id}-${Object.keys(ticket.cn).length + 1}`,
                    parent: ticket.ct,
                    permissionOverwrites: [
                        {
                            id: interaction.member.id,
                            allow: ["VIEW_CHANNEL"],
                        },
                        {
                            id: "1179433696932147261",
                            allow: ["VIEW_CHANNEL"],
                        },
                        {
                            id: "1062453413054521375",
                            allow: ["VIEW_CHANNEL"],
                        },
                        {
                            id: interaction.guild.roles.everyone,
                            deny: ["VIEW_CHANNEL"],
                        },
                    ],
                });

                ticket.cn[channel.id] = {channel: channel.id, user: interaction.member.id};
                await interaction.reply({
                    content: "",
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(`Ваш тикет создан => <#${channel.id}>`)
                            .setDescription("")
                            .setColor("#30fc03")
                            .build()
                    ],
                    ephemeral: true
                });

                await bot.guilds.cache.get("722417067596185610").channels.cache.get(channel.id).send({
                    content: `<@${interaction.member.id}>, здравствуйте!`,
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(`Обращение на тему: ${ticket.descriptions}`)
                            .setDescription("Когда вы решите закончить разговор, нажмите на кнопку")
                            .setColor("#187EBE")
                            .build()
                    ],
                    components: [
                        new ActionRowBuilder().addComponents(
                            new ButtonBuilder()
                                .setCustomId(`close-${ticket.id}`)
                                .setLabel('📩 Закрыть тикет 📩')
                                .setStyle(3)
                        )
                    ]
                });
            }
        }
    } catch (error) {
        console.error(error);
    }
});


bot.on("messageDelete", async (msg) => {
    try {
        let logs = await msg.guild.fetchAuditLogs({type: 72});
        let entry = logs.entries.first();

        bot.guilds.cache.get("722417067596185610").channels.cache.get(config.data.Mlog_chn).send({
            "content": ``,
            "embeds": [
                {
                    "type": "rich",
                    "title": "**Удаление сообщения**",
                    "description": "",
                    "color": 0xfc3c3c,
                    "fields": [{"name": "Автор", "value": `<@${msg.author.id}>`, "inlines": true},
                        {"name": "Канал", "value": `${msg.channel}`, "inlines": true},
                        {"name": "Сообщение", "value": `${msg.content}`},
                        {"name": "Модератор", "value": `${entry.executor}`}],
                }
            ]
        });
    } catch (e) {
        console.log(e)
    }
})
bot.on("messageUpdate", async (msgold, msgnew) => {
    try {
        const guild = bot.guilds.cache.get("722417067596185610");
        const channel = guild.channels.cache.get(config.data.Mlog_chn);

        if (!guild) return;
        if (!channel) return;
        if (!msgold) return;
        if (!msgnew) return;
        const embed = {
            type: "rich",
            title: "Изменение сообщения",
            color: 0xfc3c3c,
            fields: [
                {name: "Автор", value: `<@${msgold.author.id}>`, inline: true},
                {name: "Канал", value: `${msgold.channel}`, inline: true},
                {name: "Старое Сообщение", value: `${msgold.content}`},
                {name: "Новое Сообщение", value: `${msgnew.content}`}
            ]
        };

        await channel.send({embeds: [embed]});
    } catch (e) {
        console.log(e);
    }
});


const msg_configuration = (msg, u) => {
    let msge = msg.split('$')
    for (let i = 0; i < msge.length; i++) {
        if (msge[i] === "user_pn") {
            msge[i] = `<@${u.id}>`
        }
        if (msge[i] === "user_n") {
            msge[i] = `${u.displayName}`
        }
    }
    return msge.join('')
}

const create_img = async (guild) => {

    let G_count = guild.memberCount;
    let A_count = 0;
    guild.channels.cache.toJSON().filter((channel) => [2,].includes(channel.type)).forEach(c => {
        A_count += c.members.toJSON().length
    })

    let imbg = await loadImage("2-1.png")
    registerFont("./Leto Text Sans Defect.otf", {family: "KTF"})
    const canvas = createCanvas(1280, 720)
    const ct = canvas.getContext("2d");
    ct.drawImage(imbg, 0, 0, 1280, 720)
    ct.font = '72pt KTF'
    ct.textAlign = 'center';
    ct.fillStyle = '#000'
    var text = `${G_count}`;
    ct.fillText(text, 200, 360);
    var text = `${A_count}`;
    ct.fillText(text, 200, 655);

    const buf = canvas.toBuffer("image/png")
    guild.setBanner(buf)

}


module.exports = {
    msg_configuration
}
