import React from 'react'
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'
import { Modal, Content } from 'react-bulma-components';

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

const Login = () => {

    const navigate = useNavigate()

    return (
        <Modal.Card>
            <Modal.Card.Header showClose>
                <Modal.Card.Title className='is-size-4'>Connexion</Modal.Card.Title>
            </Modal.Card.Header>

            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                enableReinitialize={true}
                validationSchema={Yup.object({
                    email: Yup.string()
                        .required('Veuillez renseigner votre adresse mail'),
                    password: Yup.string()
                        .required('Veuillez renseigner votre mot de passe')
                })}
                onSubmit={async (values) => {
                    try {
                        const response = await fetch('http://localhost:8000/login', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(values),
                        })
                        if (response.ok) {
                            const data = await response.json();
                            const token = data.token;
                            localStorage.setItem('token', token);
                            navigate('/mon-profil')
                            console.log('connexion réussie')
                        } else {
                            console.log('Echec de connexion')
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }}
            >
                <Form>
                    <Modal.Card.Body>
                        <Content>
                            <div className='is-flex is-flex-direction-column mb-4 pb-4'>
                                <h2 className='is-size-5'>Email :</h2>
                                <MyTextInput
                                    label=""
                                    id="email"
                                    name="email"
                                    type="email"
                                />
                            </div>

                            <div className='is-flex is-flex-direction-column mb-4 pb-4'>
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
                        <button type='submit' className='button is-success is-medium'>Connexion</button>
                    </Modal.Card.Footer>
                </Form>
            </Formik>
        </Modal.Card >
    )
}

export default Login