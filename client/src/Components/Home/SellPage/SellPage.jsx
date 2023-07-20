import React, { useState, useEffect } from 'react'
import NavBar from '../Navbar/NavBar';
import useWindowWidth from '../../../Hooks/useWindowWidth';
import './SellPage.css'
import { CgSearchFound } from 'react-icons/cg'
import CarItem from './CarItem'
import Contact from '../Contact/Contact'
import { Modal } from 'react-bulma-components';
import Footer from '../Footer/footer'
import { BiMailSend } from 'react-icons/bi'


export default function SellPage() {

    const [openContact, setOpenContact] = useState(false);
    const openModalContact = () => {
        setOpenContact(!openContact)
    }

    const width = useWindowWidth()
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

    const [filteredCars, setFilteredCars] = useState([]);
    const [isFiltered, setIsFiltered] = useState(false)

    const [priceRange, setPriceRange] = useState([0, 50000]);
    const [milageRange, setMilageRange] = useState([0, 300000]);
    const [endYear, setEndYear] = useState(2023);


    const handleFilter = () => {
        let filteredCars = cars.filter((car) => {
            const isPriceInRange = car.price >= priceRange[0] && car.price <= priceRange[1];
            const isMilageInRange = car.milage >= milageRange[0] && car.milage <= milageRange[1];
            const carYear = new Date(car.date).getFullYear() - 1;
            const isYearInRange = carYear <= endYear;
            return isPriceInRange && isMilageInRange && isYearInRange;
        });
        setFilteredCars(filteredCars);
        setIsFiltered(true);
    };

    useEffect(() => {
    }, [priceRange, milageRange, endYear, cars]);


    const handleMilageRangeChange = (event) => {
        setMilageRange([0, parseInt(event.target.value)]);
        handleFilter()
    };
    const handlePriceRangeChange = (event) => {
        setPriceRange([0, parseInt(event.target.value)]);
        handleFilter()
    };

    const handleEndYearChange = (event) => {
        setEndYear(parseInt(event.target.value));
        handleFilter()

    };

    return (


        <div>
            <NavBar />
            <h2 className={`${width < 500 ? 'mt-2 has-text-centered' : 'p-3 has-text-left'} title is-1`} style={{ fontFamily: 'Rajdhani'}}>Trouvez votre véhicule en <span style={{ color: '#eee938' }}>quelques clics</span>. <CgSearchFound /></h2>

            <div className={`is-flex is-align-items-center is-justify-content-center is-size-5 mt-6 ${width < 968 ? 'is-flex-direction-column' : ''}`}>
                <div className={`is-flex is-align-items-center ${width < 968 ? '' : 'pr-6'}`} style={{ fontFamily: 'Rajdhani' }}>
                    <label htmlFor="priceRange">Plage de prix :</label>
                    <input
                        className='ml-2 mr-2'
                        type="range"
                        id="priceRange"
                        min={0}
                        max={50000}
                        value={priceRange[1]}
                        onChange={handlePriceRangeChange}
                    />
                    <span>{priceRange[1]} €</span>
                </div>
                <div className={`is-flex is-align-items-center ${width < 968 ? '' : 'pr-6'}`} style={{ fontFamily: 'Rajdhani' }}>
                    <label htmlFor="milageRange">kilomètres :</label>
                    <input
                        className='ml-2 mr-2'
                        type="range"
                        id="milageRange"
                        min={0}
                        max={300000}
                        value={milageRange[1]}
                        onChange={handleMilageRangeChange}
                    />
                    <span>{milageRange[1]} kms</span>
                </div>
                <div className={`is-flex is-align-items-center ${width < 968 ? '' : 'pr-6'}`} style={{ fontFamily: 'Rajdhani' }}>
                    <label htmlFor="endYear">Année de fin :</label>
                    <input
                        className='ml-2 mr-2'
                        type="range"
                        id="endYear"
                        min={2000}
                        max={new Date().getFullYear()}
                        value={endYear}
                        onChange={handleEndYearChange}
                    />
                    <span>{endYear}</span>
                </div>
            </div>


            <div className={width > 1023 ? '' : ''}>
                <div className="column is-variable">
                    <div className="column is-12">
                        <div className="columns is-multiline is-1 is-justify-content-center">
                            {isFiltered && filteredCars ? (
                                filteredCars.length > 0 ? (
                                    filteredCars.map((car, index) => (
                                        <CarItem key={index} car={car} width={width} />
                                    ))
                                ) : (
                                    <a
                                        href='#contact'
                                        className='is-size-4 is-underlined m-5'
                                        onClick={openModalContact}
                                    >
                                        Aucun résultat trouvé, revenez plus tard ou contactez-nous en cliquant ici <BiMailSend size={30} /></a>
                                )
                            ) : (
                                cars.map((car, index) => (
                                    <CarItem key={index} car={car} width={width} />
                                ))
                            )}
                        </div>
                    </div>
                </div >
            </div>
            <Footer openModalContact={openModalContact} width={width}/>

            <Modal show={openContact} onClose={() => setOpenContact(false)}>
                <Contact />
            </Modal>
        </div>


    )
}
