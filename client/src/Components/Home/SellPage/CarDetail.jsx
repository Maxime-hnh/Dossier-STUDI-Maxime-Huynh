import React from 'react'
import moment from 'moment'
import { Modal, Content } from 'react-bulma-components';
import { BsCarFrontFill } from 'react-icons/bs'
import { ImPriceTag } from 'react-icons/im'
import { BsSpeedometer2 } from 'react-icons/bs'
import { MdOutlineAirlineSeatReclineNormal } from 'react-icons/md'
import { PiEngineBold } from 'react-icons/pi'
import { PiEngineDuotone } from 'react-icons/pi'
import { AiOutlineSchedule } from 'react-icons/ai'
import { MdLocationOn } from 'react-icons/md'
import { FaPhoneSquare } from 'react-icons/fa'
import { MdAlternateEmail } from 'react-icons/md'
import { TbBrandBumble } from 'react-icons/tb'

export default function CarDetail({ car, openModalContact }) {

    return (

        <Modal.Card>
            <Modal.Card.Header showClose style={{ background: '#1b1b1b' }}>
                <Modal.Card.Title className='is-size-3' style={{ fontFamily: 'Rajdhani', color: '#eee938' }}>{car.name}</Modal.Card.Title>
            </Modal.Card.Header>
            <Modal.Card.Body>
                <Content>
                    <div className="card-image">
                        <figure className="image is-4by3 ml-0 mr-0">
                            {car.file && car.file.urls && car.file.urls.length > 0 ? (
                                <>
                                    <img
                                        src={car.file.urls[0]}
                                        alt="Voiture"
                                    />
                                </>
                            ) : (
                                <span>Aucune image disponible</span>
                            )}

                        </figure>
                    </div>
                    <div className="card-content p-3" style={{ boxShadow: '0 0 6px 3px rgb(0 0 0 / 10%)' }}>
                        <div className="media mb-0">
                            <div className="media-content mb-4">
                                <div className='mb-4 pb-4' style={{ borderBottom: '1px solid #d8d8d8' }}>
                                    <h2>Critères</h2>

                                    <ul
                                        className="is-flex is-justify-content-space-between mb-3 ml-0 is-flex-wrap-wrap"
                                    >
                                        <div className='is-flex is-flex-direction-raw mr-2'>
                                            <ImPriceTag className='mr-2' size={15} />
                                            <div className='is-flex is-flex-direction-column m-0 p-0'>
                                                <h3 className='m-0 is-size-7'>Prix</h3>
                                                <li className="is-size-6">{car.price} €</li>
                                            </div>
                                        </div>
                                        <div className='is-flex is-flex-direction-raw mr-2'>
                                            <BsSpeedometer2 className='mr-2' size={20} />
                                            <div className='is-flex is-flex-direction-column m-0 p-0'>
                                                <h3 className='m-0 is-size-7'>Kilométrage</h3>
                                                <li className="is-size-6">{car.milage} kms</li>
                                            </div>
                                        </div>
                                        <div className='is-flex is-flex-direction-raw mr-2'>
                                            <BsCarFrontFill className='mr-2' size={20} />
                                            <div className='is-flex is-flex-direction-column m-0 p-0'>
                                                <h3 className='m-0 is-size-7'>Type</h3>
                                                <li className="is-size-6">{car.features.bodyCar}</li>
                                            </div>
                                        </div>
                                        <div className='is-flex is-flex-direction-raw mr-2'>
                                            <TbBrandBumble className='mr-2' size={20} />
                                            <div className='is-flex is-flex-direction-column m-0 p-0'>
                                                <h3 className='m-0 is-size-7'>Marque</h3>
                                                <li className="is-size-6">{car.brand}</li>
                                            </div>
                                        </div>
                                    </ul>
                                    <ul
                                        className="is-flex is-justify-content-space-between mb-3 ml-0 is-flex-wrap-wrap"
                                    >
                                        <div className='is-flex is-flex-direction-raw mr-2'>
                                            <AiOutlineSchedule className='mr-2' size={20} />
                                            <div className='is-flex is-flex-direction-column m-0 p-0'>
                                                <h3 className='m-0 is-size-7'>Date de mise<br />en circulation</h3>
                                                <li className="is-size-6">{moment(car.date).locale('fr').format('DD/MM/YYYY')}</li>
                                            </div>
                                        </div>
                                        <div className='is-flex is-flex-direction-raw mr-2'>
                                            <MdOutlineAirlineSeatReclineNormal className='mr-2' size={20} />
                                            <div className='is-flex is-flex-direction-column m-0 p-0'>
                                                <h3 className='m-0 is-size-7'>Nombre de <br />place</h3>
                                                <li className="is-size-6">{car.features.seatingCapacity}</li>
                                            </div>
                                        </div>
                                        <div className='is-flex is-flex-direction-raw mr-2'>
                                            <PiEngineBold className='mr-2' size={20} />
                                            <div className='is-flex is-flex-direction-column m-0 p-0'>
                                                <h3 className='m-0 is-size-7'>Puissance<br /> fiscale</h3>
                                                <li className="is-size-6">{car.features.engine}</li>
                                            </div>
                                        </div>
                                        <div className='is-flex is-flex-direction-raw mr-2'>
                                            <PiEngineDuotone className='mr-2' size={20} />
                                            <div className='is-flex is-flex-direction-column m-0 p-0'>
                                                <h3 className='m-0 is-size-7'>Puissance <br />DIN</h3>
                                                <li className="is-size-6">{car.features.fiscalHorsePower}</li>
                                            </div>
                                        </div>
                                    </ul>
                                </div>
                                <div className='mb-4 pb-4' style={{ borderBottom: '1px solid #d8d8d8' }}>
                                    <h2>Description</h2>
                                    <p style={{ textAlign: 'justify' }}>{car.description}</p>
                                </div>
                                <div className='mb-4 pb-4' style={{ borderBottom: '1px solid #d8d8d8' }}>
                                    <h2>Options</h2>
                                    <p style={{ textAlign: 'justify' }}>{car.options}</p>
                                </div>
                                <div>
                                    <h2>Adresse et contact</h2>
                                    <ul className='m-0'>
                                        <div className='is-flex is-flex-direction-raw is-align-items-center'>
                                            <MdLocationOn className='mr-2' />
                                            <li>15 rue des garages, 76200 DIEPPE</li>
                                        </div>
                                        <div className='is-flex is-flex-direction-raw is-align-items-center'>
                                            <FaPhoneSquare className='mr-2' />
                                            <li>02 35 35 35 35</li>
                                        </div>
                                        <div className='is-flex is-flex-direction-raw is-align-items-center'>
                                            <MdAlternateEmail className='mr-2' />
                                            <li>v.parrot@garage.fr</li>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <footer className="card-footer is-flex is-justify-content-center">
                            <button
                                onClick={openModalContact}
                                className="button is-success is-size-5 has-text-weight-bold is-rounded mt-4"
                            >
                                Envoyer un message
                            </button>
                        </footer>
                    </div>
                </Content>
            </Modal.Card.Body>
        </Modal.Card>
    )
}
