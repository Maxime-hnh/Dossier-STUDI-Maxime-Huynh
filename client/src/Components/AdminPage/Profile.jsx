import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import NavBarAdmin from './NavBarAdmin/NavBarAdmin';
import moment from 'moment'
import 'bulma/css/bulma.css';
import { Button } from 'react-bulma-components';
import './Profile.css'
import car from '../../Assets/profileCar.png'
import { CiViewList } from 'react-icons/ci';
import { AiOutlineFileAdd } from 'react-icons/ai';
import useWindowWidth from '../../Hooks/useWindowWidth';


export default function Profile() {



    const width = useWindowWidth();
    const navigate = useNavigate()
    const token = localStorage.getItem('token');

    const [user, setUser] = useState(null)
    const [cars, setCars] = useState(null);
    const [showAllCars, setShowAllCars] = useState(false);

    const ShowCarsClick = () => {
        setShowAllCars(!showAllCars);
    };


    const createCar = () => {
        navigate('/mon-profil/formulaire-creation-annonce')
    }

    // CALL API TO GET MY PROFIL
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch('http://localhost:8000/user/myprofil', {
                    method: 'GET',
                    headers: {
                        'x-access-token': token,
                    }
                });

                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                } else {
                    console.log('Échec de récupération des informations de l\'utilisateur');
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchUserInfo();
    }, [token]);


    // CALL API TO GET MY CARS
    useEffect(() => {
        const getMyCars = async () => {
            try {
                const response = await fetch('http://localhost:8000/cars/all', {
                    method: 'GET',
                    headers: {
                        'x-access-token': token,
                    }
                })
                if (response.ok) {
                    const cars = await response.json()
                    setCars(cars);
                } else {
                    console.log('Échec de récupération des informations des évènements');

                }
            } catch (error) {
                console.error(error);
            };
        }
        getMyCars();
    }, [token]);

    return (
        <>

            <NavBarAdmin />
            {user ?
                <div breakpoint='fluid' className={` AdminPage ${width > 1023 ? 'AdminPage-desktop-width' : 'AdminPage-ismobile-padding '}`}>
                    <div className=' dashboard'>
                        <h1 className='AdminPage-title mb-2'>Bonjour <span>{user.firstName}</span>, bienvenue sur votre <span>dashboard</span></h1>
                        <div className='pl-3 pr-3'>
                            <div className='handleCars'>
                                <div className="subtitle-container">
                                    <AiOutlineFileAdd size={34} />
                                    <h2 className='subtitle-handleCars'>Gérer mes véhicules</h2>
                                </div>
                                <div className={width > 1023 ? 'handleCars-container handleCars-container-row' : 'handleCars-container handleCars-container-column'}>

                                    <div className='imgContainer-handleCars'>
                                        <img src={car} alt="voiture" className='img-handleCars' />
                                    </div>

                                    <div className='btnContainer-handleCars'>
                                        <Button
                                            color="link"
                                            size="medium"
                                            onClick={createCar}
                                            style={{ marginBottom: '8px' }}
                                        >
                                            Ajouter un véhicule
                                        </Button>
                                        <Button
                                            color="primary"
                                            size="medium"
                                            onClick={(() => { navigate('/mon-profil/véhicules') })}
                                        >
                                            Consulter les véhicules
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            {width < 600 ? '' :
                                <div className='cars-container'>
                                    <div className="subtitle-container">
                                        <CiViewList size={34} />
                                        <h2 className='subtitle-handleCars'>  Liste de mes véhicules</h2>
                                    </div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Nom</th>
                                                <th>Ajouter le </th>
                                                <th>Moteur</th>
                                                <th>Kilométrage</th>
                                                <th>Prix</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cars && (showAllCars ? cars : cars.slice(0, 2)).map((car) => (

                                                <tr key={car.id}>
                                                    <td>{car.name}</td>
                                                    <td>{moment(car.date).locale('fr').format('DD MMM YYYY')}</td>
                                                    <td>{car.features.power}</td>
                                                    <td>{car.milage} kms</td>
                                                    <td>{car.price} €</td>
                                                    <td>
                                                        <Button
                                                            onClick={() => navigate('/mon-profil/formulaire-creation-annonce', { state: { car: car, token: token } })}
                                                            color="warning"
                                                            size='small'
                                                            rounded='true'
                                                            className=' handle-btn'>
                                                            Détails
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                            <tr>
                                                <td colSpan="6">
                                                    <Button
                                                        onClick={ShowCarsClick}
                                                        color="primary"
                                                        size='small'
                                                        rounded='true'
                                                        className='handle-btn'>
                                                        {showAllCars ? 'Voir moins' : 'Voir plus'}
                                                    </Button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                : <p>Utilisateur introuvable...</p>
            }
        </>
    )

}