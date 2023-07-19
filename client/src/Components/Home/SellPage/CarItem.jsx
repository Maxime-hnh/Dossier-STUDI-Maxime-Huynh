import React, {useState} from 'react'
import moment from 'moment'
import { BsCarFrontFill } from 'react-icons/bs'
import { FiFlag } from 'react-icons/fi'
import { FiMail } from 'react-icons/fi'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { MdOutlineOpenInNew } from 'react-icons/md'
import Contact from '../Contact/Contact'
import { Modal } from 'react-bulma-components';
import { truncateText } from '../../../Hooks/TruncateText'
import CarDetail from './CarDetail'

export default function CarItem({ car, index, width }) {

    const [openContact, setOpenContact] = useState(false);
    const openModalContact = () => {
      setOpenContact(!openContact)
    }

    const [openCarDetail, setOpenCarDetail] = useState(false);
    const openModalCarDetail = () => {
        setOpenCarDetail(!openCarDetail)
    }
  

    return (
        <>
            <div key={index}
                className="mt-4 mr-5 card column is-one-fifth-fullhd is-one-quarter-widescreen is-5-desktop is-5-tablet is-full-mobile p-0"
                style={(width > 1408) ? { borderRadius: '5px', minWidth: '25%' } : { borderRadius: '5px' }}
            >
                <div className='carsPage-date'>
                    <span className="tag is-link is-size-6">{moment(car.date).locale('fr').format('DD MMM YYYY')}</span>
                </div>
                <div className='carsPage-brand'>
                    <span className="tag is-success is-size-6">{car.brand}</span>
                </div>
                <div className="card-image">
                    <figure className="image is-4by3 ml-0 mr-0">
                        {car.file && car.file.urls && car.file.urls.length > 0 ? (
                            <>
                                <img
                                    src={car.file.urls[0]}
                                    alt="Voiture"
                                    className="carsPage-img"
                                    onClick={openModalCarDetail}
                                    style={{cursor:'pointer'}}
                                />
                                <span className="tag is-link is-size-6 sellPage-milage">{car.milage} kms</span>
                            </>
                        ) : (
                            <span>Aucune image disponible</span>
                        )}

                    </figure>
                    <div className='carsPage-brand'>
                        <span className="tag is-success is-size-6">{car.brand}</span>
                    </div>
                </div>
                <div className="card-content p-3">
                    <div className="media mb-0">
                        <div className="media-content mb-4">
                            <div className="is-flex is-justify-content-flex-start is-align-items-center mb-3">
                                <FiFlag />
                                <h2 className="title is-5 pl-3 has-text-left">{car.name}</h2>
                            </div>
                            <div className="is-flex is-justify-content-flex-start is-align-items-center mb-2">
                                <BsCarFrontFill />
                                <p className="subtitle is-6 pl-3">{car.features.bodyCar}</p>
                            </div>
                            <p style={{ textAlign: 'justify' }}>{truncateText(car.description, 100)}</p>
                        </div>
                    </div>
                    <footer className="card-footer">
                        <a
                            href="#contact"
                            onClick={openModalContact}
                            className="card-footer-item"
                        >
                            <FiMail color='#48c78e' size={25} />
                        </a>
                        <a
                            href="#call"
                            className="card-footer-item"
                        >
                            <BsFillTelephoneFill color='#485FC7' size={25} />
                        </a>
                        <a
                            href="#mail"
                            className="card-footer-item"
                        >
                            <MdOutlineOpenInNew color='#48c78e' size={25} />
                        </a>
                    </footer>
                    <footer className="card-footer is-flex is-justify-content-center pt-2">
                        <span className="tag is-warning is-size-3 has-text-weight-bold is-rounded">{car.price} €</span>
                    </footer>
                </div>
            </div>

            <Modal show={openContact} onClose={() => setOpenContact(false)}>
                <Contact car={car} />
            </Modal>

            <Modal show={openCarDetail} onClose={() => setOpenCarDetail(false)}>
                <CarDetail car={car} openModalContact={openModalContact}/>
            </Modal>
        </>
    )
}
