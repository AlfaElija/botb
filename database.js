const fs = require('fs');

let database = {};
const load = () => {
    console.info("[LOAD] Проверка наличия базы данных...");
    if (!fs.existsSync(__dirname + "/data.json")) {
        console.info("[LOAD] База данных не найдена.");
        console.info("[LOAD] Создание...");
        let data = { database: {} };
        database = data.database;
        console.info("[LOAD] Создание завершено.");
    } else {
        console.info("[LOAD] База данных найдена.");
        console.info("[LOAD] Загрузка...");
        let data = {};
        data = JSON.parse(fs.readFileSync(__dirname + "/data.json").toString());
        database = data.database;
        console.info("[LOAD] Загрузка завершена.");
    }
    return console.log("[LOAD] Данные загружены и готовы к использованию.");
};

const save = () => {
    console.info("[SAVE] Сохранение данных...");
    fs.writeFileSync(__dirname + "/data.json", JSON.stringify({ database: database }, null, 4));
    console.info("[SAVE] Сохранение завершено.");
};
const db = () =>{
    return database;
};




//Экспортируем функции
module.exports = {
    load,
    save,
    db
};