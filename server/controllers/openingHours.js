const OpeningHours = require('../models/openingHours');


async function createOpeningHoursForWeek(req, res) {
    const weekDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
    try {
        for (const day of weekDays) {
            await OpeningHours.create({
                dayOfWeek: day,
                openingTime: req.body[day].openingTime,
                closingTime: req.body[day].closingTime,
                closed: req.body[day].closed || false
            });
        }
        res.status(200).json({ message: 'Horaires d\'ouverture créés avec succès pour chaque jour de la semaine.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur s\'est produite lors de la création des horaires d\'ouverture.' });
    }
}

async function updateOpeningHoursForWeek(req, res) {
    const weekDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
    const openingHoursUpdates = req.body;

    try {
        for (const day of weekDays) {
            const opening = await OpeningHours.findOne({ where: { dayOfWeek: day } });

            if (opening) {
                const openingHourUpdate = openingHoursUpdates[day];
                opening.openingTime = openingHourUpdate.openingTime;
                opening.closingTime = openingHourUpdate.closingTime;
                opening.closed = openingHourUpdate.closed || false;

                await opening.save();
            }
        }

        res.status(200).json({ message: 'Horaires d\'ouverture mis à jour pour tous les jours de la semaine.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur s\'est produite lors de la mise à jour des horaires d\'ouverture.' });
    }
}


const getOpeningHours = (req, res, next) => {
    OpeningHours.findAll()
        .then(openingHours => {
            res.status(200).json(openingHours);
        })
        .catch(err => console.log(err));
}


module.exports = {
    createOpeningHoursForWeek,
    getOpeningHours,
    updateOpeningHoursForWeek
};