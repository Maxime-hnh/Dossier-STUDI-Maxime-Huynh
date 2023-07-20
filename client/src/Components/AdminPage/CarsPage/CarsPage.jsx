import React, { useEffect, useState } from 'react'
import NavBarAdmin from '../NavBarAdmin/NavBarAdmin';
import moment from 'moment'
import { useNavigate } from 'react-router-dom';
import useWindowWidth from '../../../Hooks/useWindowWidth';
import { truncateText } from '../../../Hooks/TruncateText';
import { BsCarFrontFill } from 'react-icons/bs'
import { BsPencilSquare } from 'react-icons/bs'
import { MdDeleteForever } from 'react-icons/md'
import { FiFlag } from 'react-icons/fi'
import './CarsPage.css'


export default function CarsPage() {

    const navigate = useNavigate()
    const width = useWindowWidth();
    const token = localStorage.getItem('token');
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const getAllCars = async () => {
            try {
                const response = await fetch('http://localhost:8000/cars/all', {
                    method: 'GET'
                })
                if (response.ok) {
                    const cars = await response.json()
                    setCars(cars);
                } else {
                    console.log('Échec de récupération des informations des véhicules');

                }
            } catch (error) {
                console.error(error);
            };
        }
        getAllCars();
    }, []);


    const deleteCar = async (carId) => {
        try {
            const response = await fetch(`http://localhost:8000/cars/${carId}`, {
                method: 'DELETE',
                headers: {
                    'x-access-token': token
                }
            })
            if (response.ok) {
                setCars((prevCars) => {
                    const updatedCars = prevCars.filter((car) => car.id !== carId)
                    return updatedCars
                })
            } else {
                console.error("Erreur lors de la suppression du véhicule");
            }
        } catch (error) {
            console.error("Une erreur s'est produite lors de la suppression du véhicule:", error);
        }
    };
    const totalCars = cars.length;

    return (
        <>
            <NavBarAdmin />
            <div className={width > 1023 ? 'carsPage-container' : ''}>
                <div className="column is-variable p-0">
                    <h1 className='AdminPage-title mb-2 has-text-centered'>Il y a actuellement <span>{totalCars}</span> véhicules listés</h1>
                    <div className="column is-12">

                        <div className="columns is-multiline is-1 is-justify-content-center">
                            {cars ? cars.map((car, index) => (
                                <div key={index}
                                    className="mt-4 mr-5 card column is-one-fifth-fullhd is-one-quarter-widescreen is-3-desktop is-full-tablet is-full-mobile p-0"
                                    style={{
                                        borderRadius: '5px',
                                    }}
                                >
                                    <div className='carsPage-date'>
                                        <span className="tag is-link">{moment(car.date).locale('fr').format('DD MMM YYYY')}</span>
                                    </div>
                                    <div className='carsPage-brand'>
                                        <span className="tag is-success">{car.brand}</span>
                                    </div>
                                    <div className="card-image">
                                        <figure className="image is-4by3 ml-0 mr-0">
                                            {car.file && car.file.urls && car.file.urls.length > 0 ? (
                                                <img
                                                    src={car.file.urls[0]}
                                                    alt="Voiture"
                                                    className="carsPage-img"
                                                />
                                            ) : (
                                                <span>Aucune image disponible</span>
                                            )}
                                        </figure>
                                    </div>
                                    <div className="card-content p-3">
                                        <div className="media mb-0">
                                            <div className="media-content mb-4">
                                                <div className="is-flex is-justify-content-flex-start is-align-items-center mb-3">
                                                    <FiFlag />
                                                    <h2 className="title is-5 pl-3">{truncateText(car.name, 15)}</h2>
                                                </div>
                                                <div className="is-flex is-justify-content-flex-start is-align-items-center mb-2">
                                                    <BsCarFrontFill />
                                                    <p className="subtitle is-6 pl-3">{car.features.bodyCar}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <footer className="card-footer is-flex is-justify-content-space-evenly">
                                            <button
                                                onClick={() => navigate('/mon-profil/formulaire-creation-annonce', { state: { car: car, token: token } })}
                                                className="card-footer-item"
                                                style={{ border: 'none', background: 'none' }}
                                            >
                                                <BsPencilSquare color='#485FC7' size={25} />
                                            </button>
                                            <a
                                                href="#delete"
                                                onClick={(() => { deleteCar(car.id) })}
                                                className="card-footer-item"
                                            >
                                                <MdDeleteForever color='#F14668' size={30} />
                                            </a>
                                        </footer>
                                    </div>


                                </div>
                            )) : <p>Aucune voiture pour le moment</p>}
                        </div>
                    </div>
                </div >
            </div>
        </>
    )

}
