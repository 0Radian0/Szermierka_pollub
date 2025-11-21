const trainingsModel = require('../queries/trainingsModel.js')

// Wyświetlanie filtrowanych rekordów
exports.showTrainingsTable = async (req, res) => {
    // Wstępnie ustawiono wyświetlanie tylko nowych treningów bez znaczenie czy mają opis czy nie
    const {
        newTrainings = 'true',
        trainingDescription = 'false',
        withoutDescription = 'false',
        tempSort = 'trainingDate',
        order = 'ASC'
    } = req.query;

    const newTrainingsBool = newTrainings === 'true';
    const trainingDescriptionBool = trainingDescription === 'true';
    const withoutDescriptionBool = withoutDescription === 'true';

    try {
        const trainings = await trainingsModel.getAllTraining(newTrainingsBool, trainingDescriptionBool, withoutDescriptionBool, tempSort, order);
        res.status(200).json(trainings);
    } catch (e) {
        console.log('Błąd serwera: ', e);
        res.status(500).json({ error: "Nie udało się utworzyć listy treningów" });
    }
}

// Usuwanie trenigów
exports.deleteTraining = async (req, res) => {
    const { trainingID } = req.params;

    if (!trainingID) return res.status(400).json({ error: "Nie wybrano treningu" })

    try {
        await trainingsModel.deleteTraining(trainingID);
        res.status(200).json({ success: true, message: "Trening został usunięty" })
    } catch (e) {
        console.log('Nie udało się usunąć treningu: ', e);
        res.status(500).json({ error: "Nie udało się usunąć treningu: " })
    }
}

// Dodawanie treninegu
exports.addTraining = async (req, res) => {
    const { date, place, details } = req.body;
    if (!date || !place)
        return res.status(400).json({ error: "Brak wymaganych danych" });

    try {
        const [result] = await trainingsModel.addTraining(date, place, details);
        const newTraining = {
            trainingID: result.insertId,
            trainingDate: date,
            trainingPlace: place,
            trainingDetails: details,
        };
        res.status(200).json({ success: true, message: "Trening został dodany", training: newTraining });
    } catch (e) {
        console.log('Nie udało się dodać treningu: ', e);
        res.status(500).json({ error: "Nie udało się dodać treningu: " });
    }
};

// Edytowanie treningu
exports.modifyTraining = async (req, res) => {
    const { date, place, details, id } = req.body;
    if (!date || !place || !id)
        return res.status(400).json({ error: "Brak wymaganych danych - nie można edytować treningu" });

    try {
        await trainingsModel.modifyTraining(date, place, details, id);
        res.status(200).json({
            success: true,
            message: "Dane treningu zostały zmienione"
        });
    } catch (e) {
        console.log('Nie udało się zmodyfikować treningu: ', e);
        res.status(500).json({ error: "Nie udało się zmodyfikować treningu: " });
    }
};



