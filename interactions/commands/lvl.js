const { texts, DM } = require("../../config.json");
const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
    application: {
        name: "lvl",
        description: "Редактирование уровня",
        options: [
            {
                name: "set",
                description: "Установить уровень игроку",
                type: 1,
                options: [
                    {
                        name: "user",
                        description: "Упомяните пользователя через @",
                        type: 9,
                        required: true,
                    },
                    {
                        name: "lvl",
                        description: "Сколько lvl",
                        type: 4,
                        required: true,
                    },
                ],
            },
            {
                name: "add",
                description: "Добавить уровень игроку",
                type: 1,
                options: [
                    {
                        name: "user",
                        description: "Упомяните пользователя через @",
                        type: 9,
                        required: true,
                    },
                    {
                        name: "lvl",
                        description: "Сколько lvl",
                        type: 4,
                        required: true,
                    },
                ],
            },
            {
                name: "del",
                description: "Уменьшить уровень игроку",
                type: 1,
                options: [
                    {
                        name: "user",
                        description: "Упомяните пользователя через @",
                        type: 9,
                        required: true,
                    },
                    {
                        name: "lvl",
                        description: "Сколько lvl",
                        type: 4,
                        required: true,
                    },
                ],
            },
        ],
    },
    async start(bot, msg, args) {
        if (!msg.options._subcommand) return;
        if (args.length < 2) return;

        let user = msg.guild.members.cache.get(args[0]);
        if (user == undefined)
            user = msg.guild.members.cache.get(args[0].slice(1).slice(1, -1));

        const userData = await bot.db.get(`users.${user.id}`);
        if (!userData) {
            await bot.db.set(`users.${user.id}`, {
                xp: 0,
                lvl: 0,
                nlvl: 5,
                kk: 3,
            });
        }

        const userXP = userData.xp || 0;
        const userLvl = userData.lvl || 0;
        const userNlvl = userData.nlvl || 5;
        const userKk = userData.kk || 3;

        if (msg.options._subcommand === "set") {
            const newLvl = Number(args[1]);
            if (newLvl < 0) return;

            const g = {
                xp: 0,
                lvl: 0,
                nlvl: 5,
                kk: 3,
            };

            for (let i = 0; i < newLvl; i++) {
                g.lvl += 1;
                g.nlvl += g.kk;
                g.kk++;
                g.xp = 0;
            }

            await bot.db.set(`users.${user.id}.xp`, g.xp);
            await bot.db.set(`users.${user.id}.lvl`, g.lvl);
            await bot.db.set(`users.${user.id}.nlvl`, g.nlvl);
            await bot.db.set(`users.${user.id}.kk`, g.kk);

            msg.reply({
                content: "",
                embeds: [
                    {
                        type: "rich",
                        title: "Успешное установление уровня",
                        description: "",
                        color: 0x30fc03,
                        fields: [],
                    },
                ],
            });
        } else if (msg.options._subcommand === "add") {
            const lvlToAdd = Number(args[1]);
            if (lvlToAdd < 0) return;

            for (let i = 0; i < lvlToAdd; i++) {
                await bot.db.add(`users.${user.id}.lvl`, 1);
                await bot.db.add(`users.${user.id}.nlvl`, userKk);
                await bot.db.add(`users.${user.id}.kk`, 1);
                await bot.db.set(`users.${user.id}.xp`, 0);
            }

            msg.reply({
                content: "",
                embeds: [
                    {
                        type: "rich",
                        title: "Успешное добавление уровня",
                        description: "",
                        color: 0x30fc03,
                        fields: [],
                    },
                ],
            });
        } else if (msg.options._subcommand === "del") {
            const lvlToRemove = Number(args[1]);
            if (lvlToRemove < 0) return;

            if (userLvl <= 0) return;

            const g = {
                xp: 0,
                lvl: 0,
                nlvl: 5,
                kk: 3,
            };

            for (let i = 0; i < userLvl - lvlToRemove; i++) {
                g.lvl += 1;
                g.nlvl += g.kk;
                g.kk++;
                g.xp = 0;
            }

            await bot.db.set(`users.${user.id}.xp`, g.xp);
            await bot.db.set(`users.${user.id}.lvl`, g.lvl);
            await bot.db.set(`users.${user.id}.nlvl`, g.nlvl);
            await bot.db.set(`users.${user.id}.kk`, g.kk);

            msg.reply({
                content: "",
                embeds: [
                    {
                        type: "rich",
                        title: "Успешное уменьшение уровня",
                        description: "",
                        color: 0x30fc03,
                        fields: [],
                    },
                ],
            });
        }
    },
};