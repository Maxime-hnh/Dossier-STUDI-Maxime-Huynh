import React from 'react'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Modal, Content } from 'react-bulma-components';
import { MyTextInput } from '../../../Hooks/GenericInputFormik';


export default function PostTestimonial() {


    return (


        <>
            <Modal.Card>
                <Modal.Card.Header showClose>
                    <Modal.Card.Title className='is-size-4'>Laisser un avis</Modal.Card.Title>
                </Modal.Card.Header>
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
                        fetch('http://localhost:8000/testimonials/', {
                            method: 'POST',
                            headers: {
                                'Content-type': 'application/json',
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
                    <Form>
                        <Modal.Card.Body>
                            <Content>
                                <div className='is-flex is-flex-direction-column mb-2 pb-2'>
                                    <h2 className='is-size-5'>Prénom :</h2>
                                    <MyTextInput
                                        label=""
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        placeholder="Jean"
                                    />
                                </div>
                                <div className='is-flex is-flex-direction-column mb-2 pb-2'>
                                    <h2 className='is-size-5'>Commentaire :</h2>
                                    <MyTextInput
                                        label=""
                                        id="opinion"
                                        name="opinion"
                                        type="textarea"
                                    />
                                </div>

                                <div className='is-flex is-flex-direction-column mb-2 pb-2'>
                                    <h2 className='is-size-5'>Note :</h2>
                                    <MyTextInput
                                        label=""
                                        id="rate"
                                        name="rate"
                                        type="number"
                                        min="0"
                                        max="5"
                                    />
                                </div>
                            </Content>
                        </Modal.Card.Body>

                        <Modal.Card.Footer>
                            <button type='submit' className='button is-success is-medium'>Envoyer</button>
                        </Modal.Card.Footer>
                    </Form>
                </Formik>
            </Modal.Card >
        </>
    )
}
