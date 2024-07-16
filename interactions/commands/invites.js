const { texts, DM } = require("../../config.json");
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const db = require("quick.db");

module.exports = {
    application: {
        name: "invites",
        description: "информация о приглошениях участника",
        options: [
            {
                name: "add",
                description: "Добавить кол-во инвайтов",
                type: 1,
                options: [
                    {
                        name: "user",
                        description: "Упомяните пользователя через @",
                        type: 9,
                        required: true,
                    },
                    {
                        name: "length",
                        description: "Сколько invites",
                        type: 4,
                        required: true,
                    },
                ],
            },
            {
                name: "get",
                description: "Получить информацию о приглашениях участника",
                type: 1,
                options: [
                    {
                        name: "user",
                        description: "Упомяните пользователя через @",
                        type: 9,
                        required: true,
                    },
                ],
            },
            {
                name: "fdell",
                description: "удалить инвайты, которые были выданны",
                type: 1,
                options: [
                    {
                        name: "user",
                        description: "Упомяните пользователя через @",
                        type: 9,
                        required: true,
                    },
                ],
            },
        ],
    },
    async start(bot, msg, args) {
        let user = msg.guild.members.cache.get(args[0]);
        if (user == undefined)
            user = msg.guild.members.cache.get(args[0].slice(1).slice(1, -1));

        try {
            if(msg.options._subcommand == "fdell") {
                if (args.length < 1) return;
                let userData = await bot.db.get(`users.${user.id}.inviteU`);
                userData = userData.filter(x => x != "538384476397371412");
                await bot.db.set(`users.${user.id}.inviteU`, userData);
                msg.reply({
                    content: "",
                    embeds: [
                        {
                            description: "",
                            fields: [],
                            color: 16737539,
                            title: `Кол-во приглашений: ${userData.length}`,
                        },
                    ],
                    components: [],
                    actions: {},
                });
            }
            if (msg.options._subcommand == "add") {
                if (args.length < 2) return;

                let userData = await bot.db.get(`users.${user.id}`);
                if (!userData) {
                    userData = { inviteU: [] };
                }
                if(!userData.inviteU){
                    userData.inviteU = [];
                }
                await bot.db.set(`users.${user.id}`, userData);

                for (let i = 0; i < Number(args[1]); i++) {
                    userData.inviteU.push("538384476397371412");
                }

                await bot.db.set(`users.${user.id}`, userData);

                msg.reply({
                    content: "",
                    embeds: [
                        {
                            description: "",
                            fields: [],
                            color: 16737539,
                            title: `Кол-во приглашений: ${userData.inviteU.length}`,
                        },
                    ],
                    components: [],
                    actions: {},
                });
            } else if (msg.options._subcommand == "get") {
                if (args.length < 1) return;

                let userData = await bot.db.get(`users.${user.id}`);
                if (!userData || !userData.inviteU) {
                    return msg.reply({
                        content: "",
                        embeds: [
                            {
                                description: "",
                                fields: [],
                                color: 16737539,
                                title: "Участник никого не приглашал",
                            },
                        ],
                        components: [],
                        actions: {},
                    });
                }

                msg.reply({
                    content: "",
                    embeds: [
                        {
                            description: "",
                            fields: [
                                {
                                    name: "Количество приглашений",
                                    value: `${userData.inviteU.length}`,
                                    inline: false,
                                },
                            ],
                            color: 16737539,
                            author: {
                                icon_url: user.avatarURL(),
                                name: user.displayName,
                            },
                        },
                    ],
                    components: [],
                    actions: {},
                });
            }
        } catch (e) {
            console.error(e);
        }
    },
};