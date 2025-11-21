const db = require('../config/db.js');

// Wyświetlanie, sortowanie i filtrowanie treningów
const getAllTraining = async (newTrainings, trainingDescription, withoutDescription, tempSort = "trainingDate", order = "ASC") => {
    // Wybór kolumn po których można sortować
    const sortColumns = ["trainingPlace", "trainingDate", "trainingDetails"];

    // Ustalenie domyślnych wartości
    if (!sortColumns.includes(tempSort)) tempSort = "trainingDate";
    if (!["ASC", "DESC"].includes(order.toUpperCase())) order = "ASC";

    let query = `SELECT * FROM trainings`;
    let cond = [];

    // Przefiltrowanie przycisków w zależności od warunku
    if (newTrainings) cond.push(`trainingDate > NOW()`);
    if (trainingDescription) cond.push(`trainingDetails IS NOT NULL AND trainingDetails <> ''`);
    else if (withoutDescription) cond.push(`(trainingDetails IS NULL OR trainingDetails = '')`);

    if (cond.length > 0) query += " WHERE " + cond.join(" AND ");

    // sortowanie po zadanej wartości 
    query += ` ORDER BY ${tempSort} ${order}`;

    const [tab] = await db.execute(query);
    return tab;
}

// Usuwanie treningu
const deleteTraining = async (trainingID) => {
    return db.execute(`DELETE FROM trainings WHERE trainingID = ?`, [trainingID]);
}

// Dodawanie treningu
const addTraining = async (date, place, details) => {
    return db.execute(`INSERT INTO trainings (trainingDate, trainingPlace, trainingDetails) 
        VALUES (?, ?, ?)`, [date, place, details]);
}

// Edycja treningu
const modifyTraining = async (date, place, details, id) => {
    return db.execute(`UPDATE trainings SET trainingDate = ?, trainingPlace = ?, trainingDetails = ? WHERE trainingID = ?`, [date, place, details, id])
}

module.exports = {
    getAllTraining, deleteTraining, addTraining, modifyTraining
}