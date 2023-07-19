const Car = require('../models/car');
const upload = require('../config/multerConfig');


// CREATE CAR
exports.createCar = [
    upload.single('file'),
    (req, res, next) => {
    
    const { body, user } = req;
    body.createdBy = user.id
    if (req.file) {
        body.file = req.file.path;
    }
    Car.create(body)
        .then(result => {
            res.status(201).json({
                message: 'Annonce créée avec succès.',
                car: result
            });
        })
        .catch(err => console.log('Une erreur est survenue :', err))
}
]

exports.updateCar = (req, res, next) => {
    const carId = req.params.carId
    const { body } = req;

    Car.findByPk(carId)
        .then(car => {
            if (!car) {
                return res.status(404).json({ message: 'Annonce introuvable' })
            }
            const carTarget = Object.assign(car, body)
            return carTarget.save()
        })
        .then(result => {
            res.status(200).json({ message: 'Annonce mise à jour.', car: result })
        })
        .catch(err => console.log('Une erreur est survenue : ', err))
}


// DELETE CAR
exports.deleteCar = (req, res, next) => {
    const carId = req.params.carId
    Car.findByPk(carId)
        .then(car => {
            if (!car) {
                return res.status(404).json({ message: 'Annonce introuvable' })
            }
            return Car.destroy({
                where: {
                    id: carId
                }
            })
        })
        .then(result => {
            res.status(200).json({ message: 'Annonce supprimée avec succès.' })
        })
        .catch(err => console.log('Une erreur est survenue : ', err))
}


// GET ALL CARS
exports.getAllCars = (req, res, next) => {
    Car.findAll()
        .then(cars => {
            res.status(200).json(cars)
        })
        .catch(err => console.log('Une erreur est survenue : ', err))
}


//GET CAR BY ID
exports.getCar = (req, res, next) => {
    const carId = req.params.carId
    Car.findByPk(carId)
        .then(car => {
            if (!car) {
                return res.status(404).json({ message: 'Annonce introuvable.' })
            }
            res.status(200).json({ car: car })
        })
        .catch(err => console.log('Une erreur est survenue : ', err))
}

