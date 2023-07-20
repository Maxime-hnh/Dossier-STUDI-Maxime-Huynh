import React, { useEffect } from 'react'
import { AiFillCheckCircle } from 'react-icons/ai'
import { MdOutlineDoNotDisturbAlt } from 'react-icons/md'
import { BsChatDots } from 'react-icons/bs'
import moment from 'moment'

export default function AllTestimonials({ handleApprovedStatus, handleUnapprovedStatus, setTestimonials, testimonials, token }) {


    useEffect(() => {

        const getTestimonials = async () => {
            try {
                const response = await fetch('http://localhost:8000/testimonials/toTreat', {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'x-access-token': token
                    }
                })
                if (response.ok) {
                    const testimonials = await response.json()
                    setTestimonials(testimonials)
                } else {
                    console.log('Échec de récupération des avis');
                }
            } catch (error) {
                console.error(error)
            }

        }
        getTestimonials()
    }, [setTestimonials, token])



    return (
        <>
            <div className="column is-12">

                <div className="columns is-multiline is-1 is-justify-content-center">
                    {testimonials && testimonials.map((testimonial, index) => (


                        <div key={index} className="mt-4 mr-5 card column is-one-third-fullhd is-one-quarter-widescreen is-half-desktop is-full-tablet is-full-mobile p-0">
                            <div className="card-content">
                                <p className="title">
                                    “{testimonial.opinion}”
                                </p>
                            </div>
                            <div className="media">
                                <div className="media-left ml-2 is-flex is-flex-direction-raw">
                                    <BsChatDots size={40} color='#48c78e' style={{ transform: 'scaleX(-1)' }} />
                                    <div className='ml-2 is-flex is-align-items-flex-start is-flex-direction-column'>
                                        <p className="title is-4" style={{ fontFamily: 'Rajdhani', color: '#48c78e' }}>{testimonial.firstName}</p>
                                        <p className="subtitle is-6">Posté le {moment(testimonial.createdAt).locale('fr').format('DD MMM YYYY')}</p>

                                    </div>
                                </div>


                            </div>
                            <footer className="card-footer is-flex is-justify-content-space-evenly">
                                <button
                                    className="card-footer-item"
                                    style={{ border: 'none', background: 'none' }}
                                    onClick={(() => handleUnapprovedStatus(testimonial.id))}

                                >
                                    <MdOutlineDoNotDisturbAlt color='#F14668' size={35} style={{ cursor: 'pointer' }} />
                                </button>
                                <button
                                    className="card-footer-item"
                                    style={{ border: 'none', background: 'none' }}
                                    onClick={(() => handleApprovedStatus(testimonial.id))}

                                >
                                    <AiFillCheckCircle color='#48c78e' size={35} style={{ cursor: 'pointer' }} />
                                </button>
                            </footer>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
