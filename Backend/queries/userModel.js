const db = require('../config/db');

// Pobranie danych użytkownika na podstawie emaila
const getUserByEmail = async (email) => {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
};

// Pobranie danych użytkownika na podstawie id
const getUserByID = async (userID) => {
    const [rows] = await db.execute('SELECT * FROM users WHERE userID = ?', [userID]);
    return rows[0];
};

// Sprawdzenie czy istnieje taki login w bazie
const checkIfLoginExists = async (login) => {
    const [rows] = await db.execute('SELECT userID  FROM users WHERE login = ?', [login])
    return rows.length > 0;
}

// Sprawdzenie czy istnieje taki mail w bazie
const checkIfEmailExists = async (email) => {
    const [rows] = await db.execute('SELECT userID  FROM users WHERE email = ?', [email])
    return rows.length > 0;
}

// Tworzenie użytkownika
const createUser = async (login, password, email, name, surname) => {
    return db.execute('INSERT INTO users (login, password, email, registrationDate, lastLog, description, rankID, deactivated, name, surname) VALUES (?, ?, ?, NOW(), NOW(), NULL, 3, false, ?, ?)', [login, password, email, name, surname]);
}

// Filtrowanie użytkowników
const filterUsers = async (rankID, tempSort = "login", order = "ASC") => {
    const sortColumns = ["login", "registrationDate", "description", "lastLog", "rankID"];

    if (!sortColumns.includes(tempSort)) tempSort = "login";
    if (!["ASC", "DESC"].includes(order.toUpperCase())) order = "ASC";

    let query = `
        SELECT u.*, r.name AS rankName,
               MAX(p.paymentDate) AS paymentDate, p.amount, p.dueDate
        FROM users AS u
        LEFT JOIN ranks r ON u.rankID = r.rankID
        LEFT JOIN payments p ON u.userID = p.userID
    `;

    const args = [];
    if (rankID && rankID !== 'all') {
        query += ` WHERE u.rankID = ?`;
        args.push(rankID);
    }

    query += ` GROUP BY u.userID ORDER BY ${tempSort} ${order}`;

    const [rows] = await db.execute(query, args);
    return rows;
}

// Usuwanie użytkownika
const deleteUser = async (id) => {
    await db.execute('DELETE FROM payments WHERE userID = ?', [id]);
    await db.execute('UPDATE posts SET userID = NULL WHERE userID = ?', [id]);
    return db.execute('DELETE FROM users WHERE userID = ?', [id])
}

// Zmiana uprawnień
const changeRanks = async (rankID, userID) => {
    return db.execute('UPDATE users SET rankID = ? WHERE userID = ?', [rankID, userID]);
}

// Zmiana hasła
const resetPassword = async (userID, newPassword) => {
    return db.execute('UPDATE users SET password = ? WHERE userID = ?', [newPassword, userID]);
}

// Zmiana opisu użytkownika
const changeDescription = async (userID, newDesc) => {
    return db.execute('UPDATE users SET description = ? WHERE userID = ?', [newDesc, userID]);
}

// Dezaktywowanie użytkownika
const deactivateUser = async (userID, deactivatedStatus) => {
    return db.execute("UPDATE users SET deactivated = ? WHERE userID = ?", [deactivatedStatus, userID]);
};

module.exports = {
    getUserByEmail, getUserByID, checkIfLoginExists, checkIfEmailExists, createUser, filterUsers, deleteUser, changeRanks, resetPassword, changeDescription, deactivateUser
};
