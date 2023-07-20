import React from 'react'
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { Modal, Content } from 'react-bulma-components';

export default function AddUserModal({ onUserCreated, handleOpenAddUser }) {

    const MyTextInput = ({ label, ...props }) => {
        const [field, meta] = useField(props);
        const errorClass = meta.touched && meta.error ? 'is-danger' : 'is-info';
        return (
            <>
                <div className='field'>
                    <div className='control'>
                        <input
                            className={`${errorClass} input`}
                            style={{ fontSize: '1rem' }}
                            {...field}
                            {...props}
                        >
                        </input>
                    </div>
                    {meta.touched && meta.error ? (<div className='help is-danger' style={{ position: 'absolute', margin: '0' }}>{meta.error}</div>) : null}
                </div>
            </>
        )
    };

    const token = localStorage.getItem('token');

    return (
        <>
            <Modal.Card>
                <Modal.Card.Header showClose>
                    <Modal.Card.Title>Ajouter un utilisateur</Modal.Card.Title>
                </Modal.Card.Header>
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: ''
                    }}
                    enableReinitialize={true}
                    validationSchema={Yup.object({
                        firstName: Yup.string()
                            .required('Veuillez renseigner le prénom de l\'utilisateur'),
                        lastName: Yup.string()
                            .required('Veuillez renseigner le nom de l\'utilisateur'),
                        email: Yup.string()
                            .required('Veuillez renseigner votre adresse mail'),
                        password: Yup.string()
                            .required('Veuillez renseigner votre mot de passe')
                    })}
                    onSubmit={values => {
                        fetch('/user', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'x-access-token': token
                            },
                            body: JSON.stringify(values),
                        })
                            .then(response => response.json())
                            .then(data => {
                                onUserCreated(data);
                                handleOpenAddUser()
                                console.log('Utilisateur créé : ', data)
                            })
                            .catch(error => {
                                console.error('Erreur lors de la création : ', error);
                            })
                    }}
                >
                    <Form>
                        <Modal.Card.Body>
                            <Content>
                                <div className='is-flex is-flex-direction-column mb-2 pb-3'>
                                    <h2 className='is-size-5'>Prénom :</h2>
                                    <MyTextInput
                                        label=""
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                    />
                                </div>

                                <div className='is-flex is-flex-direction-column mb-2 pb-3'>
                                    <h2 className='is-size-5'>Nom :</h2>
                                    <MyTextInput
                                        label=""
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                    />
                                </div>

                                <div className='is-flex is-flex-direction-column mb-2 pb-3'>
                                    <h2 className='is-size-5'>Email :</h2>
                                    <MyTextInput
                                        label=""
                                        id="email"
                                        name="email"
                                        type="email"
                                    />
                                </div>

                                <div className='is-flex is-flex-direction-column pb-3'>
                                    <h2 className='is-size-5'>Mot de passe :</h2>
                                    <MyTextInput
                                        label=""
                                        id="password"
                                        name="password"
                                        type="password"
                                    />
                                </div>
                            </Content>
                        </Modal.Card.Body>

                        <Modal.Card.Footer>
                            <button 
                            type='submit' className='button is-success is-medium'
                            >Ajouter</button>
                        </Modal.Card.Footer>

                    </Form>
                </Formik>
            </Modal.Card >
        </>
    )
}
