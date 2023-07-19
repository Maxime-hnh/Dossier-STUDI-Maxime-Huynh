import React, { useState, useEffect } from 'react'
import './footer.css'
import { BsFacebook } from 'react-icons/bs'
import { AiFillInstagram } from 'react-icons/ai'
import { BsYoutube } from 'react-icons/bs'
import { BsTwitter } from 'react-icons/bs'
import { MdLocationOn } from 'react-icons/md'
import { FaPhoneSquare } from 'react-icons/fa'
import { MdAlternateEmail } from 'react-icons/md'


export default function Footer({ openModalContact, width }) {


    const [openingHours, setOpeningHours] = useState([])
    useEffect(() => {
        const getOpeningHours = async () => {
            try {
                const response = await fetch('http://51.210.124.204:8000/openingHours', {
                    method: 'GET'
                });
                if (response.ok) {
                    const openingHours = await response.json()
                    setOpeningHours(openingHours)
                } else {
                    console.log('Échec de récupération des horaires')
                }
            } catch (error) {
                console.error(error)
            }
        }
        getOpeningHours()
    }, [])


    return (
        <>
            <footer className='footer'>
                <div className="content has-text-centered">
                    <div className={`${width < 755 ? 'is-flex is-flex-direction-column' : 'is-flex is-flex-direction-row'} columns`}>
                        <div className={`${width < 769 ? 'is-align-items-center' : 'is-align-items-flex-start'} column is-flex is-flex-direction-column `}>
                            <h4>Horaires</h4>
                            <ul className={`is-flex is-flex-direction-column m-0 ${width < 755 ? 'is-align-items-center' : 'is-align-items-flex-start'} `}>
                                {openingHours && openingHours.sort((a, b) => a.id - b.id).map((openingHour) => (
                                    <li key={openingHour.id}>  {openingHour.dayOfWeek.slice(0, 3)} : {openingHour.closed === true ? 'fermé' : `${openingHour.openingTime.slice(0, 5)} - ${openingHour.closingTime.slice(0, 5)}`}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={`column is-flex is-flex-direction-column ${width < 755 ? 'is-align-items-center' : ' is-align-items-flex-start'} `}>
                            <h4>Contact</h4>
                            <ul className="is-flex is-align-items-flex-start is-flex-direction-column m-0">
                                <li><MdAlternateEmail /> v.parrot@garage.fr</li>
                                <li><FaPhoneSquare /> 02 35 35 35 35</li>
                                <div className='is-flex is-flex-direction-raw mt-1'>
                                    <MdLocationOn />
                                    <div className='is-flex is-flex-direction-column is-align-items-flex-start'>
                                        <li>15 rue des garages</li>
                                        <li>76200 DIEPPE</li>

                                    </div>
                                </div>
                            </ul>
                        </div>
                        <div className={`column is-flex is-flex-direction-column ${width < 755 ? 'is-align-items-center' : ' is-align-items-flex-start'} `}>
                            <h4>Développé par</h4>
                            <ul className="is-flex is-align-items-flex-start is-flex-direction-column m-0">
                                <li>Maxime HUYNH</li>
                                <li>Projet ECF STUDI</li>
                            </ul>
                        </div>
                        <div className={`column is-flex is-flex-direction-column ${width < 755 ? 'is-align-items-center' : ' is-align-items-flex-start'} `}>
                            <div>

                                <h4>Réseaux</h4>
                                <ul className="is-flex is-align-items-center is-flex-direction-column m-0">
                                    <li><BsFacebook size={25} style={{ cursor: 'pointer' }} /></li>
                                    <li><AiFillInstagram size={25} style={{ cursor: 'pointer' }} /></li>
                                    <li><BsTwitter size={25} style={{ cursor: 'pointer' }} /></li>
                                    <li><BsYoutube size={25} style={{ cursor: 'pointer' }} /></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <h3
                        className='is-underlined'
                        style={{ color: '#eee938', cursor: 'pointer' }}
                        onClick={openModalContact}
                    >
                        Pour nous contacter cliquez ici.
                    </h3>
                </div>
            </footer>

        </>
    )
}

