import React, { useEffect, useState } from 'react'
import { BsChatDots } from 'react-icons/bs'
import { SlBubbles } from 'react-icons/sl'
import moment from 'moment'
import 'moment/locale/fr';
import PostTestimonial from './PostTestimonial';
import { Modal } from 'react-bulma-components';



export default function Testimonials() {

    const [testimonials, setTestimonials] = useState([])

    useEffect(() => {

        const getTestimonials = async () => {
            try {
                const response = await fetch('/testimonials/approved', {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
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
    }, [])

    const [openTestimonial, setOpenTestimonial] = useState(false);
    const openModalTestimonial = () => {
        setOpenTestimonial(!openTestimonial)
    }

    return (
        <>
            <div className="column is-12 mb-5 mt-5">
                <h2 className='title is-1' style={{ fontFamily: 'Rajdhani', textAlign: 'start' }}>Ils nous ont fait <span>confiance</span>.</h2>
                <div className="columns is-multiline is-1 is-flex is-justify-content-center">
                    {testimonials && testimonials.slice(0, 4).map((testimonial, index) => (


                        <div
                            key={index}
                            className="card p-0 column is-one-fifth-fullhd is-one-quarter-widescreen is-half-desktop is-half-tablet is-four-fifths-mobile m-3"
                            style={{
                                borderRadius: '8px',
                                fontFamily: 'Rajdhani'
                            }}
                        >
                            <div className="card-content">
                                <p className="title">
                                    “{testimonial.opinion}”
                                </p>
                            </div>
                            <div className="media">
                                <div className="media-left ml-2 is-flex is-flex-direction-raw">
                                    <BsChatDots size={40} color='#eee938' style={{ transform: 'scaleX(-1)' }} />
                                    <div className='ml-2 is-flex is-align-items-flex-start is-flex-direction-column'>
                                        <p className="title is-4" style={{ fontFamily: 'Rajdhani', color: '#eee938' }}>{testimonial.firstName}</p>
                                        <p className="subtitle is-6">Posté le {moment(testimonial.createdAt).locale('fr').format('DD MMM YYYY')}</p>

                                    </div>
                                </div>


                            </div>
                        </div>
                    ))}
                </div>
                    <h2 onClick={openModalTestimonial} className='title is-2 has-text-right' style={{ fontFamily: 'Rajdhani', color: '#eee938', cursor:'pointer' }}><SlBubbles /> Laisser un avis</h2>
            </div>
            <Modal show={openTestimonial} onClose={() => setOpenTestimonial(false)}>
                <PostTestimonial />
            </Modal>
        </>
    )
}