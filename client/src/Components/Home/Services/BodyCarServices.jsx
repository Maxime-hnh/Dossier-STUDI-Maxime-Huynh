import React, { useState, useEffect } from 'react'
import BodyCar from './BodyCar.jpg'
import { BiMailSend } from 'react-icons/bi'

export default function FixCarServices({ width }) {

    const [content, setContent] = useState([])

    useEffect(() => {
        const getContent = async () => {
            try {
                const response = await fetch('http://localhost:8000/contents/2', {
                    method: 'GET'
                });
                if (response.ok) {
                    const content = await response.json()
                    setContent(content)
                } else {
                    console.log('Échec de récupération du contenu')
                }
            } catch (error) {
                console.error(error)
            }
        }
        getContent()
    }, [])


    return (
        <>
            <div style={{ minHeight: '100vh', background: '#1b1b1b' }}>
                <div className={`${width < 900 ? 'ml-0 mr-0' : ''} columns is-variable is-5 is-centered is-vcentered has-text-white`} style={{ height: '100%' }}>
                    {width < 768 ?
                        <div className="column is-4">
                            <figure className="image is-3by4">
                                <img src={BodyCar} alt='#' className='homePage-imgServices' />
                            </figure>
                        </div> : ''}

                    <div className="column is-5 is-flex is-flex-direction-column is-align-items-flex-start" style={{ height: '80%' }}>
                        <h2 className='title is-3 mb-1' style={{ fontFamily: 'Rajdhani', color: '#eee938' }}>{content.title}</h2>
                        <h2 className='title is-1 pb-5 has-text-white' style={{ fontFamily: 'Rajdhani' }}><span>G</span>arage V<span>.</span>PARROT<span>.</span></h2>

                        <p className='is-size-4 pr-4' style={{ textAlign: 'justify', borderRight: '1px solid #eee938' }}>
                            {content.description}
                        </p>
                        <div className={`pt-6 is-flex ${width < 500 ? 'is-flex-direction-column' : 'is-flex-direction-row'}`} style={{ fontFamily: 'Rajdhani' }}>
                            <BiMailSend size={120} color='#eee938' />
                            <div className='is-flex is-flex-direction-column is-align-items-flex-start pt-3 ml-5' style={{ borderTop: '1px solid white' }}>
                                <p>Pour toutes question, n'hésitez pas à nous contacter.</p>
                                <p className='is-size-2'>{content.email}</p>
                            </div>
                        </div>
                    </div>
                    {width > 500 ?
                        <div className={`column ${width < 1000 && width > 768 ? 'is-6' : 'is-4'}`}>
                            <figure className="image is-3by4">
                                <img src={BodyCar} alt='#' className='homePage-imgServices' />
                            </figure>
                        </div> : ''}
                </div>
            </div>
        </>
    )
}
