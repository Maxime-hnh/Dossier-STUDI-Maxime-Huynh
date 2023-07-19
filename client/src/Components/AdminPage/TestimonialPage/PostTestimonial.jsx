import React from 'react'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {MyTextInput} from '../../../Hooks/GenericInputFormik'
import { useNavigate } from 'react-router-dom';
import { BsFillStarFill } from 'react-icons/bs'
import { BsChatDots } from 'react-icons/bs'
import { BsFillPersonFill } from 'react-icons/bs'
import './PostTestimonial.css'


export default function PostTestimonial({ token }) {

    const navigate = useNavigate()

    return (

        <>
            <Formik
                initialValues={{
                    firstName: '',
                    opinion: '',
                    rate: '',

                }}
                enableReinitialize={true}
                validationSchema={Yup.object({
                    firstName: Yup.string()
                        .required("Veuillez renseigner le nom du client."),
                    opinion: Yup.string()
                        .required(),
                    rate: Yup.number().min(0).max(5)
                })}
                onSubmit={values => {
                    fetch('http://51.210.124.204:8000/testimonials/', {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json',
                            'x-access-token': token,
                        },
                        body: JSON.stringify(values)
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log('Avis envoyé :', data)
                        })
                        .catch(error => {
                            console.error('Erreur lors de la publication de l\'avis :', error);
                        })
                }}
            >
                <Form className=''>
                    <div className="columns is-variable is-centered is-vcentered pt-5 pb-2">
                        <div className="column is-7 postTestimonial-Form">
                            <fieldset>
                                <div className='is-flex is-flex-direction-column is-fullwidth is-align-items-flex-start mb-4 pb-5'>
                                    <div className='is-flex is-align-items-center'>
                                        <BsFillPersonFill color='#485fc7' size={30} className='mr-3' />
                                        <h3 className='is-size-3 mb-2'>Nom </h3>
                                    </div>
                                    <MyTextInput
                                        label=""
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                    />
                                </div>


                                <div className='is-flex is-flex-direction-column is-fullwidth is-align-items-flex-start mb-4 pb-5'>
                                    <div className='is-flex is-align-items-center'>
                                        <BsChatDots color='#485fc7' size={30} className='mr-3' />
                                        <h3 className='is-size-3 mb-2'>Avis </h3>
                                    </div>
                                    <MyTextInput
                                        label=""
                                        id="opinion"
                                        name="opinion"
                                        type="textarea"
                                    />
                                </div>

                                <div className='is-flex is-flex-direction-column is-fullwidth is-align-items-flex-start  pb-5 mb-2'>
                                    <div className='is-flex is-align-items-center'>
                                        <BsFillStarFill color='#485fc7' size={28} className='mr-3' />
                                        <h3 className='is-size-3 mb-2'>Note </h3>
                                    </div>
                                    <MyTextInput
                                        label=""
                                        id="rate"
                                        name="rate"
                                        type="number"
                                        min="0"
                                        max="5"
                                    />
                                </div>
                                <div className="CarsForm-submit-container">
                                    <div className="control">
                                        <button type="submit" className="button is-link is-rounded">Confirmer</button>
                                    </div>
                                    <div className="control">
                                        <button
                                            type="button"
                                            onClick={() => navigate('/mon-profil')}
                                            className="button is-danger is-rounded"
                                        >
                                            Annuler
                                        </button>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>

                </Form>
            </Formik >
        </>
    )
}
