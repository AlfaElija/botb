const {texts} = require("../../config.json");
const {
    EmbedBuilder,
    ChannelType,
    ActionRowBuilder,
    TextInputStyle,
    ModalBuilder,
    TextInputBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

module.exports = {
    application: {
        name: "setup",
        description: "CREATE ALL",
        options: [
            {
                name: "hello",
                description: "GGGGGGG",
                type: 1,
                options: [],
            },
            {
                name: "buttons",
                description: "GGGGGGG",
                type: 1,
                options: [],
            }, {
                name: "menu",
                description: "GGGGGGG",
                type: 1,
                options: [],
            },
            {
                name: "ban",
                description: "GGGGGGG",
                type: 1,
                options: [],
            },
            {
                name: "magazine",
                description: "GGGGGGG",
                type: 1,
                options: [],
            },
            {
                name: "uprav",
                description: "GGGGGGG",
                type: 1,
                options: [],
            },
            {
                name: "very2",
                description: "GGGGGGG",
                type: 1,
                options: [],
            }]
    },
    start(bot, msg, args) {
        try {
            if (msg.member.id !== "665170089326280705" && msg.member.id !== "648415990295822356") return
            if(msg.options._subcommand == "very2") {
                msg.channel.send({
                    "content": "",
                    "components": [
                        {
                            "type": 1,
                            "components": [
                                {
                                    "custom_id": `setrole-1`,
                                    "placeholder": `Выбери пол`,
                                    "options": [
                                        {
                                            "label": `Мужчина`,
                                            "value": `1062466061590605894`,
                                            "description": ``,
                                            "default": false
                                        },
                                        {
                                            "label": `Женщина`,
                                            "value": `1057412105038479400`,
                                            "description": ``,
                                            "default": false
                                        }
                                    ],
                                    "min_values": 1,
                                    "max_values": 1,
                                    "type": 3
                                },

                            ]
                        },
                        {
                            "type": 1,
                            "components": [
                                {
                                    "custom_id": `setrole-2`,
                                    "placeholder": `Выбери игры`,
                                    "options": [
                                        {
                                            "label": `Сталкрафт`,
                                            "value": `1195845725104382084`,
                                            "description": ``,
                                            "default": false
                                        },
                                        {
                                            "label": `Майнкрафт`,
                                            "value": `1195845802082435223`,
                                            "description": ``,
                                            "default": false
                                        },
                                        {
                                            "label": `Тарков`,
                                            "value": `1195845838711296090`,
                                            "description": ``,
                                            "default": false
                                        },
                                        {
                                            "label": `CS:GO 2`,
                                            "value": `1195845902380839013`,
                                            "description": ``,
                                            "default": false
                                        },
                                        {
                                            "label": `Dota 2`,
                                            "value": `1195845957481398342`,
                                            "description": ``,
                                            "default": false
                                        },
                                        {
                                            "label": `World of Tanks`,
                                            "value": `1198564969097203864`,
                                            "description": ``,
                                            "default": false
                                        },
                                        {
                                            "label": `Rust`,
                                            "value": `1198567469422477382`,
                                            "description": ``,
                                            "default": false
                                        },
                                        {
                                            "label": `Не нашёл игру`,
                                            "value": `anygame`,
                                            "description": ``,
                                            "default": false
                                        }
                                    ],
                                    "min_values": 1,
                                    "max_values": 6,
                                    "type": 3
                                }
                            ]
                        }
                    ],
                    "embeds": [
                        {
                            "title": `Выбор ролей`,
                            "description": "Для выбора используй меню выбора",
                            "color": 0x373838,
                            "fields": []
                        }
                    ],
                    "ephemeral": true
                })

                msg.reply(
                    {
                        "content": "",
                        "embeds": [
                            {
                                "description": "",
                                "fields": [],
                                "color": 16737539,
                                "title": "Успешно созданно"
                            }
                        ],
                        "components": [],
                        "actions": {},
                        ephemeral: true
                    });
            }
            if (msg.options._subcommand == "hello") {
                msg.channel.send({
                    "content": "",
                    "embeds": [
                        {
                            "type": "rich",
                            "title": ` <:AFLAME_friendship:1050031457973837884> Рады приветствовать, Путник!`,
                            "description": `**<a:AFLAME_ura:1050039196196274256> Поздравляем, Вы попали на неповторимый сервер, с нами очень много интересных людей, одним из которых станешь именно ты!**\n> - Чем же мы отличаемся? Мы не просто очень весело проводим время, играя во многие игры дружными компаниями.. Наши одаренные программисты создали собственного бота, который не имеет аналогов и помогает приятно проводить время на сервере, а активисты прямо сейчас занимаются разработкой нашего новейшего сервера в Майнкрафт, кроме того мы сотрудничаем с различными проектами и многими медиа-партнерами. Предлагаем попробовать себя в роли модератора, кодера, дизайнера, пиар менеджера, медиа-партнера или шерпа, где опытные наставники безвозмездно делятся опытом и помогают добиться серьезных успехов.\n**<a:AFLAME_dance:1050038878792327188> Но перед тем, как стать Нашим человеком, давай скоротечно определимся с твоими предпочтениями, вперед!**`,
                            "color": 0x373838,
                            "image": {
                                    "url": "https://cdn.discordapp.com/attachments/1180195230683762799/1195845455771340830/greeting-greet.gif?ex=65b578de&is=65a303de&hm=683b3f3aab8df30401fb267cf99da30b3a46ef6a9fab0daff038dbc1edbbd57d&",
                                    "height": 0,
                                    "width": 0
                                }
                        }
                    ],
                    "components": [
                        {
                            "type": 1,
                            "components": [
                                {
                                    "style": 3,
                                    "label": `ПРОЙТИ ВЕРИФИКАЦИЮ`,
                                    "custom_id": `verification-start`,
                                    "disabled": false,
                                    "type": 2
                                }
                            ]
                        }
                    ],
                });
                msg.reply(
                    {
                        "content": "",
                        "embeds": [
                            {
                                "description": "",
                                "fields": [],
                                "color": 16737539,
                                "title": "Успешно созданно"
                            }
                        ],
                        "components": [],
                        "actions": {},
                        ephemeral: true
                    });
            }
            if (msg.options._subcommand == "ban") {
                msg.channel.send({
                    "content": "",
                    "components": [
                        {
                            "type": 1,
                            "components": [
                                {
                                    "style": 4,
                                    "label": `ОБЖАЛОВАТЬ БАН`,
                                    "custom_id": `objalovanie-bana`,
                                    "disabled": false,
                                    "type": 2
                                }
                            ]
                        }
                    ],
                    "embeds": [
                        {
                            "type": "rich",
                            "title": `Обжалование Бана`,
                            "description": `Приветствуем, дорогой нарушитель!\nВы получили полноценную блокировку на просторах нашего сервера.\nМы стараемся всегда дать второй шанс людям, поэтому предлагаем изложить свою позицию о сложившейся ситуации.\nБыть может, в ходе рассмотрения апелляции, Вы окажетесь правы или мы решим смягчить наказание.`,
                            "color": 0x373838
                        }
                    ]
                });
                msg.reply(
                    {
                        "content": "",
                        "embeds": [
                            {
                                "description": "",
                                "fields": [],
                                "color": 16737539,
                                "title": "Успешно созданно"
                            }
                        ],
                        "components": [],
                        "actions": {},
                        ephemeral: true
                    });
            }
            if (msg.options._subcommand == "uprav") {
                msg.reply(
                    {
                        "content": "",
                        "embeds": [
                            {
                                "description": "",
                                "fields": [],
                                "color": 16737539,
                                "title": "Успешно созданно"
                            }
                        ],
                        "components": [],
                        "actions": {},
                        ephemeral: true
                    });
                msg.channel.send({
                    "content": "",
                    "embeds": [
                        {
                            "description": "Измените конфигурацию вашей комнаты с помощью панели управления.\n" +
                                "\n" +
                                ":crown: — назначить нового создателя комнаты\n" +
                                ":octagonal_sign: — задать новый лимит участников\n" +
                                ":customs: — закрыть/открыть комнату\n" +
                                ":black_nib: — изменить название комнаты\n" +
                                ":man_detective: — скрыть/открыть комнату\n" +
                                ":boom: — выгнать участника из комнаты\n" +
                                ":microphone: — ограничить/выдать право говорить\n" +
                                ":underage: — включить/выключить NSFW",
                            "fields": [],
                            "color": 0x5e5e5e,
                            "title": "Приватные комнаты"
                        }
                    ],
                    "components": [
                        {
                            "type": 1,
                            "components": [
                                {
                                    "style": 2,
                                    "label": ``,
                                    "custom_id": `VCM-ChOwner`,
                                    "disabled": false,
                                    "type": 2,
                                    "emoji": {
                                        "id": null,
                                        "name": `👑`
                                    },
                                }, {
                                    "style": 2,
                                    "label": ``,
                                    "custom_id": `VCM-Limit`,
                                    "disabled": false,
                                    "type": 2,
                                    "emoji": {
                                        "id": null,
                                        "name": `🛑`
                                    },
                                }, {
                                    "style": 2,
                                    "label": ``,
                                    "custom_id": `VCM-LockUnlock`,
                                    "disabled": false,
                                    "type": 2,
                                    "emoji": {
                                        "id": null,
                                        "name": `🛃`
                                    },
                                },
                                {
                                    "style": 2,
                                    "label": ``,
                                    "custom_id": `VCM-ChName`,
                                    "disabled": false,
                                    "type": 2,
                                    "emoji": {
                                        "id": null,
                                        "name": `✒️`
                                    },
                                }
                            ]

                        }, {
                            "type": 1,
                            "components": [
                                {
                                    "style": 2,
                                    "label": ``,
                                    "custom_id": `VCM-HideUnhide`,
                                    "disabled": false,
                                    "type": 2,
                                    "emoji": {
                                        "id": null,
                                        "name": `🕵️‍♂️`
                                    },
                                },
                                {
                                    "style": 2,
                                    "label": ``,
                                    "custom_id": `VCM-Kick`,
                                    "disabled": false,
                                    "type": 2,
                                    "emoji": {
                                        "id": null,
                                        "name": `💥`
                                    },
                                }, {
                                    "style": 2,
                                    "label": ``,
                                    "custom_id": `VCM-Mute`,
                                    "disabled": false,
                                    "type": 2,
                                    "emoji": {
                                        "id": null,
                                        "name": `🎤`
                                    },
                                }, {
                                    "style": 2,
                                    "label": ``,
                                    "custom_id": `VCM-NSFW`,
                                    "disabled": false,
                                    "type": 2,
                                    "emoji": {
                                        "id": null,
                                        "name": `🔞`
                                    },
                                }
                            ]
                        }
                    ]
                });
            }
            if (msg.options._subcommand == "magazine") {
                msg.reply(
                    {
                        "content": "",
                        "embeds": [
                            {
                                "description": "",
                                "fields": [],
                                "color": 16737539,
                                "title": "Успешно созданно"
                            }
                        ],
                        "components": [],
                        "actions": {},
                        ephemeral: true
                    });
                msg.channel.send({
                    "content": "",
                    "embeds": [
                        {
                            "description": "нажми на кнопку",
                            "fields": [],
                            "color": 16737539,
                            "title": "Магазин"
                        }
                    ],
                    "components": [
                        {
                            "type": 1,
                            "components": [
                                {
                                    "style": 3,
                                    "label": `Купить`,
                                    "custom_id": `create-m-magaz`,
                                    "disabled": false,
                                    "type": 2
                                }
                            ]
                        }
                    ]
                });
            }
            if (msg.options._subcommand == "menu") {
                msg.reply(
                    {
                        "content": "",
                        "embeds": [
                            {
                                "description": "",
                                "fields": [],
                                "color": 16737539,
                                "title": "Успешно созданно"
                            }
                        ],
                        "components": [],
                        "actions": {},
                        ephemeral: true
                    });
                msg.channel.send({
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
                //const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
                //
                // await lib.discord.channels['@0.3.2'].messages.create({
                //   "channel_id": `${context.params.event.channel_id}`,
                //   "content": "",
                //   "tts": false,
                //   "components": [
                //     {
                //       "type": 1,
                //       "components": [
                //         {
                //           "custom_id": `S-menu-forms`,
                //           "placeholder": `Выбери то, что нужно`,
                //           "options": [
                //             {
                //               "label": `1`,
                //               "value": `1`,
                //               "default": false
                //             },
                //             {
                //               "label": `1`,
                //               "value": `1`,
                //               "default": false
                //             }
                //           ],
                //           "min_values": 1,
                //           "max_values": 4,
                //           "type": 3
                //         }
                //       ]
                //     }
                //   ]
                // });
            }
            if (msg.options._subcommand == "buttons") {
                msg.channel.send({
                    "content": "# Выбор роли фракции:",
                    "embeds": [
                        {
                            "description": "***<:AFLAME_think:1050031013763489834> Нажав на кнопку ниже, выберите свою фракцию!\n<a:AFLAME_coco:1051159734205558784> Для снятия роли - повторно прожмите на кнопку***",
                            "fields": [],
                            "color": 16737539,
                            "author": {},
                            "title": ""
                        }
                    ],
                    "components": [
                        {
                            "type": 1,
                            "components": [
                                {
                                    "style": 1,
                                    "label": `Сталкеры`,
                                    "custom_id": `L-add-role-1-880111186694271007`,
                                    "disabled": false,
                                    "type": 2,
                                    "emoji": {
                                        "id": "1180816321705934879",
                                        "name": `stalker_ru`
                                    },
                                },
                                {
                                    "style": 2,
                                    "label": `Бандиты`,
                                    "custom_id": `L-add-role-1-880105929192902717`,
                                    "disabled": false,
                                    "type": 2,
                                    "emoji": {
                                        "id": "1180816662241488977",
                                        "name": `bandit_ru`
                                    },
                                }, {
                                    "style": 1,
                                    "label": `Свобода`,
                                    "custom_id": `L-add-role-1-926260885075419137`,
                                    "disabled": false,
                                    "type": 2,
                                    "emoji": {
                                        "id": '1180816885223276625',
                                        "name": `svoboda_ru`
                                    },
                                }, {
                                    "style": 2,
                                    "label": `Наёмники`,
                                    "custom_id": `L-add-role-1-926260899977756712`,
                                    "disabled": false,
                                    "type": 2,
                                    "emoji": {
                                        "id": "1180816796677328906",
                                        "name": `naemniki_ru`
                                    },
                                }, {
                                    "style": 1,
                                    "label": `Долг`,
                                    "custom_id": `L-add-role-1-926260909754695692`,
                                    "disabled": false,
                                    "type": 2,
                                    "emoji": {
                                        "id": "1180816942748139571",
                                        "name": `dolg_ru`
                                    },
                                },
                            ]
                        },
                        {
                            "type": 1,
                            "components": [{
                                "style": 2,
                                "label": `Завет`,
                                "custom_id": `L-add-role-1-926260822257328179`,
                                "disabled": false,
                                "type": 2,
                                "emoji": {
                                    "id": "1180816733888593931",
                                    "name": `zavet_ru`
                                },
                            },
                            ]
                        }
                    ],
                    "actions":
                        {}
                })
                msg.channel.send({
                    "content": "# Мёртвое время:",
                    "embeds": [
                        {
                            "description": "***<:AFLAME_you_1:1050033653540986992> Если ты играешь в режим Мёртвое время и хочешь найти пачку - возьми роль!\nУ тебя появится отдельный канал, в котором можно упоминать таких же игроков режима и собирать команду на предстоящие игры..\n<a:AFLAME_coco:1051159734205558784> Для снятия роли - повторно прожмите на кнопку***",
                            "fields": [],
                            "color": 16737539,
                            "author": {},
                            "title": ""
                        }
                    ],
                    "components": [
                        {
                            "type": 1,
                            "components": [
                                {
                                    "style": 2,
                                    "label": `Мёртвое время`,
                                    "custom_id": `L-add-role-2-1002304273884909568`,
                                    "disabled": false,
                                    "type": 2,
                                    "emoji": {
                                        "id": null,
                                        "name": `🌋`
                                    },
                                }
                            ]
                        }
                    ],
                    "actions":
                        {}
                })
                msg.channel.send({
                    "content": "# Выбор пола:",
                    "embeds": [
                        {
                            "description": "***<:AFLAME_clown:779716258773336064> Есть только 2 гендера..\n<a:AFLAME_coco:1051159734205558784> Для снятия роли - повторно прожмите на кнопку***",
                            "fields": [],
                            "color": 16737539,
                            "author": {},
                            "title": ""
                        }
                    ],
                    "components": [
                        {
                            "type": 1,
                            "components": [
                                {
                                    "style": 2,
                                    "label": `Мужчина`,
                                    "custom_id": `L-add-role-3-1062466061590605894`,
                                    "disabled": false,
                                    "type": 2,
                                    "emoji": {
                                        "id": "1165051145207685180",
                                        "name": `AFLAME_MEN`
                                    },
                                },
                                {
                                    "style": 2,
                                    "label": `Женщина`,
                                    "custom_id": `L-add-role-3-1057412105038479400`,
                                    "disabled": false,
                                    "type": 2,
                                    "emoji": {
                                        "id": "1165051143513194666",
                                        "name": `AFLAME_WOMEN`
                                    },
                                }
                            ]
                        }
                    ],
                    "actions":
                        {}
                })
                //new ActionRowBuilder().addComponents(new ButtonBuilder()
                //                     .setCustomId('participate')
                //                     .setLabel('Сталкеры')
                //                     .setStyle(ButtonStyle.Primary)
                //                     .setEmoji('1180816321705934879')
                //                 ),
                //                     new ActionRowBuilder().addComponents(new ButtonBuilder()
                //                         .setCustomId('participate')
                //                         .setLabel('Бандиты')
                //                         .setStyle(ButtonStyle.Secondary)
                //                         .setEmoji('1180816662241488977')
                //                     ),
                //                     new ActionRowBuilder().addComponents(new ButtonBuilder()
                //                         .setCustomId('participate')
                //                         .setLabel('Свобода')
                //                         .setStyle(ButtonStyle.Primary)
                //                         .setEmoji('1180816885223276625')
                //                     ),
                //                     new ActionRowBuilder().addComponents(new ButtonBuilder()
                //                         .setCustomId('participate')
                //                         .setLabel('Наёмники')
                //                         .setStyle(ButtonStyle.Secondary)
                //                         .setEmoji('1180816796677328906')
                //                     ),
                //                     new ActionRowBuilder().addComponents(new ButtonBuilder()
                //                         .setCustomId('participate')
                //                         .setLabel('Долг')
                //                         .setStyle(ButtonStyle.Primary)
                //                         .setEmoji('1180816942748139571')
                //                     )new ActionRowBuilder().addComponents(new ButtonBuilder()
                //                             .setCustomId('participate')
                //                             .setLabel('Завет')
                //                             .setStyle(ButtonStyle.Secondary)
                //                             .setEmoji('1180816733888593931')
                //                         )


                //

                msg.reply(
                    {
                        "content": "",
                        "embeds": [
                            {
                                "description": "",
                                "fields": [],
                                "color": 16737539,
                                "title": "Успешно созданно"
                            }
                        ],
                        "components": [],
                        "actions": {},
                        ephemeral: true
                    });
            }
            // bot.commands.map(cmds=>{
            //     msg.guild.commands.create(cmds)
            // })
            // db().users = {};
            // msg.guild.roles.create({
            //     name: 'MUTE-ROLE',
            //     color: "#474747"
            // }).then((r)=>{
            //     msg.guild.channels.cache.toJSON().filter((channel) =>
            //         [
            //             'GUILD_CATEGORY',
            //             'GUILD_TEXT',
            //             'GUILD_VOICE',
            //         ].includes(channel.type),
            //     ).forEach((ch)=>{
            //         msg.guild.channels.cache.get(ch.id).permissionOverwrites.create(r, {
            //             SendMessages: false
            //         })
            //     })
            //     db().mute_role = r.id
            // msg.guild.channels.create({
            //     type: ChannelType.GuildCategory,
            //     name: "Создать приватную комнату",
            // }).then((c) => {
            //     msg.guild.channels.create({
            //         type: ChannelType.GuildVoice,
            //         name: "[+]Создать[+]",
            //         parent: c.id
            //     }).then((cc) => {
            //         db().vvp = cc.id
            //         db().cl = []
            //     })
            // })
            // msg.reply({
            //     content: "",
            //     embeds: [new EmbedBuilder().setColor("#30fc03").setTitle("👍")],
            //     ephemeral: true
            // })
            //const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
            //
            // await lib.discord.channels['@0.3.2'].messages.create({
            //   "channel_id": `${context.params.event.channel_id}`,
            //   "content": "",
            //   "tts": false,
            //   "components": [
            //     {
            //       "type": 1,
            //       "components": [
            //         {
            //           "style": 1,
            //           "label": `1`,
            //           "custom_id": `row_0_button_0`,
            //           "disabled": false,
            //           "type": 2
            //         },
            //         {
            //           "style": 1,
            //           "label": `1`,
            //           "custom_id": `row_0_button_1`,
            //           "disabled": false,
            //           "type": 2
            //         },
            //         {
            //           "style": 1,
            //           "label": `1`,
            //           "custom_id": `row_0_button_2`,
            //           "disabled": false,
            //           "type": 2
            //         }
            //       ]
            //     },
            //     {
            //       "type": 1,
            //       "components": [
            //         {
            //           "style": 1,
            //           "label": `1`,
            //           "custom_id": `row_1_button_0`,
            //           "disabled": false,
            //           "type": 2
            //         },
            //         {
            //           "style": 1,
            //           "label": `1`,
            //           "custom_id": `row_1_button_1`,
            //           "disabled": false,
            //           "emoji": {
            //             "id": null,
            //             "name": `👍`
            //           },
            //           "type": 2
            //         }
            //       ]
            //     }
            //   ],
            //   "embeds": [
            //     {
            //       "type": "rich",
            //       "title": `123`,
            //       "description": "",
            //       "color": 0x00FFFF
            //     }
            //   ]
            // });
        } catch
            (error) {
            console.error("An error occurred during balance command execution:", error);
        }
    }
    ,
};