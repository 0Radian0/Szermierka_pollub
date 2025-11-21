const userModel = require('../queries/userModel');
const db = require('../config/db');
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

function generateRandomPassword(length = 8) {
    let password = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=';
    for (let i = 0; i < length; i++) {
        const rand = Math.floor(Math.random() * chars.length);
        password += chars[rand];
    }
    return password;
}

// Generowanie listy użytkowników
exports.showFilteredUsers = async (req, res) => {
    const { rank = 'all', tempSort = 'login', order = 'ASC' } = req.query;

    try {
        const users = await userModel.filterUsers(rank === 'all' ? null : Number(rank), tempSort, order);
        res.status(200).json(users)
    } catch (e) {
        console.log('Błąd serwera: ', e);
        res.status(500).json({ error: "Nie udało się utworzyć listy użytkowników: " })
    }
}

// Usuwanie użytkownika
exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        await userModel.deleteUser(id);
        res.status(200).json({ success: true, message: "Usunięto użytkownika" });
    } catch (e) {
        console.log("Nie udało się usunąć użytkownika: ", e);
        res.status(500).json({ error: "Błąd serwera przy usuwaniu użytkownika " });
    }
}

// Zmiana uprawnień
exports.changeRanks = async (req, res) => {
    const { rankID, userID } = req.body;
    try {
        await userModel.changeRanks(rankID, userID);
        res.status(200).json({ success: true, message: "Zmieniono uprawnienia użytkownika" });
    } catch (e) {
        console.log("Nie udało się zmienić uprawnień użytkownika: ", e);
        res.status(500).json({ error: "Nie udało się zmienić uprawnień użytkownika" })
    }
}

// Reset hasła
exports.resetPassword = async (req, res) => {
    const { userID } = req.body;
    if (!userID) return res.status(400).json({ error: "Taki użytkownik niestety nie istnieje" });
    const newPassword = generateRandomPassword();

    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await userModel.resetPassword(userID, hashedPassword);

        const user = await userModel.getUserByID(userID);
        if (!user) return res.status(404).json({ error: "Nie znaleziono użytkownika" });

        // Konfiguracja nodemailer - wysyłanie maila ze zmianą hasła
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        const mailOptions = {
            from: `"Szermierka" <${process.env.SMTP_USER}>`,
            to: user.email,
            subject: "Klub Szermierki Historycznej przy Politechnice Lubelskiej - reset hasła",
            text: `Twoje nowe hasło: ${newPassword}\nProsimy o zmianę hasła po zalogowaniu.`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: "Zresetowano hasło użytkownika. Odpowiednia wiadomość została wysłana na adres e-mail użytkownika" });
    } catch (e) {
        console.log("Nie udało się zresetować hasła: ", e);
        res.status(500).json({ error: "Nie można zresetować hasła" })
    }
}

// Zmiana hasła
exports.changePassword = async (req, res) => {
    const { userID, oldPassword, newPassword } = req.body;

    if (!userID) return res.status(400).json({ error: "Taki użytkownik niestety nie istnieje" });
    if (!newPassword || !oldPassword) return res.status(400).json({ error: "Brak wymaganych danych" });

    try {
        const user = await userModel.getUserByID(userID);
        if (!user) return res.status(400).json({ error: "Nie udało się odnaleźć takiego użytkownika :(" });
        if (!(await bcrypt.compare(oldPassword, user.password))) return res.status(401).json({ error: "Nieprawidłowe stare hasło" });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await userModel.resetPassword(userID, hashedPassword);
        res.status(200).json({ success: true, message: "Hasło zostało zmienione" });
    } catch (e) {
        console.error("Błąd przy zmianie hasła:", e);
        res.status(500).json({ error: "Nie udało się zmienić hasła" });
    }
}

// Zmiana opisu użytkownika
exports.changeDescription = async (req, res) => {
    const { userID, newDescription } = req.body;

    if (!userID) return res.status(400).json({ error: "Taki użytkownik niestety nie istnieje" });
    if (!newDescription) return res.status(400).json({ error: "Brak wymaganych danych" });
    try {
        const user = await userModel.getUserByID(userID);
        if (!user) return res.status(400).json({ error: "Nie udało się odnaleźć takiego użytkownika :(" });
        await userModel.changeDescription(userID, newDescription);
        res.status(200).json({ success: true, message: "Opis został zmieniony" });
    } catch (e) {
        console.error("Błąd przy zmianie opisu:", e);
        res.status(500).json({ error: "Nie udało się zmienić opisu użytkownika" });
    }
}

// Dezaktywowanie użytkownika
exports.deactivateUser = async (req, res) => {
    const { userID, deactivatedStatus } = req.body;
    const numStatus = Number(deactivatedStatus);

    if (!userID || isNaN(Number(userID))) return res.status(400).json({ error: "Wybrany użytkownik nie istnieje" });
    if (isNaN(numStatus) || ![0, 1].includes(numStatus))  return res.status(400).json({ error: "Nie można zmienić statusu użytkownika" });

    try {
        const user = await userModel.getUserByID(userID);
        if (!user) {
            return res.status(404).json({ error: "Nie udało się odnaleźć takiego użytkownika :(" });
        }

        await userModel.deactivateUser(userID, numStatus);
        return res.status(200).json({ success: true, message: "Status użytkownika został zmieniony" });
    } catch (e) {
        console.error("Błąd przy zmianie statusu użytkownika:", e);
        return res.status(500).json({ error: "Nie udało się zmienić statusu użytkownika" });
    }
};

