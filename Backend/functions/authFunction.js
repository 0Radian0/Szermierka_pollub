const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const userModel = require('../queries/userModel');
const db = require('../config/db');


// Logowanie
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.getUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Wprowadzono niepoprawny email' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Wprowadzono niepoprawne hasło' });
        }

        const token = jwt.sign({ id: user.userID }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Dane do json
        return res.json({
            success: true,
            token,
            user: {
                userID: user.userID,
                login: user.login,
                // password: user.password,
                email: user.email,
                registrationDate: user.registrationDate,
                lastLog: user.lastLog,
                description: user.description,
                rankID: user.rankID,
                deactivated: user.deactivated,
                name: user.name,
                surname: user.surname
            }

        });
    } catch (error) {
        console.error('Błąd logowania:', error);
        res.status(500).json({ message: 'Błąd serwera' });
    }
};

// Rejestracja
exports.register = async (req, res) => {
    const { login, password, email, name, surname } = req.body;
    try {
        // walidacja
        const loginExist = await userModel.checkIfLoginExists(login);
        const emailExists = await userModel.checkIfEmailExists(email);

        if (emailExists) return res.status(409).json({ message: 'Użytkownik z podanym emailem już istnieje' });
        if (loginExist) return res.status(409).json({ message: 'Użytkownik z loginem już istnieje' });

        const loginRegex = /^.{3,45}$/;
        if (!loginRegex.test(login)) return res.status(400).json(({ message: 'Proszę wprowadzić login o długości od 3 do 45 znaków.' }));
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) return res.status(400).json(({ message: 'Proszę wprowadzić poprawny adres e-mail.' }));
        const nameRegex = /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+(?:\s[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+){0,2}$/;
        if (!nameRegex.test(name)) return res.status(400).json(({ message: 'Wprowadzone imię ma niepoprawny format' }));
        const surnameRegex = /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+(?:[-\s][A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+)?$/;
        if (!surnameRegex.test(surname)) return res.status(400).json(({ message: 'Wprowadzone nazwisko ma niepoprawny format' }));
        const passwordRegex = /^.{8,255}$/;;
        if (!passwordRegex.test(password)) return res.status(400).json(({ message: 'Hasło musi spełniać wymogi bezpieczeństwa (co najmniej 8 znaków).' }));

        const hashedPassword = await (bcrypt.hash(password, 10));
        await userModel.createUser(login, hashedPassword, email, name, surname);

        // dane przekazywane userowi
        const newUser = await userModel.getUserByEmail(email);
        const token = jwt.sign({ id: newUser.userID }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({
            success: true,
            token,
            user: {
                userID: newUser.userID,
                login: newUser.login,
                email: newUser.email,
                registrationDate: newUser.registrationDate,
                rankID: newUser.rankID,
                deactivated: newUser.deactivated,
                name: newUser.name,
                surname: newUser.surname
            }
        });

    } catch (err) {
        console.error('Błąd rejestracji:', err);
        return res.status(500).json({ message: 'Błąd serwera' });
    }
};
