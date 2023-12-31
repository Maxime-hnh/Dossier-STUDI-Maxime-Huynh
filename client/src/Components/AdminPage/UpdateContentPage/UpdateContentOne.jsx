import React, { useState, useEffect } from 'react'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { MyTextInput } from '../../../Hooks/GenericInputFormik'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { MdDescription } from 'react-icons/md'
import { MdSubject } from 'react-icons/md'
import './UpdateContentPage.css'


export default function UpdateContentOne({ updateForm, updateFormClick }) {

    const token = localStorage.getItem('token');

    const [content, setContent] = useState({
        title: "",
        description: "",
        phoneNumber: ""
    });


    useEffect(() => {
        const getContent = async () => {
            try {
                const response = await fetch('/contents/1', {
                    method: 'GET'
                });
                if (response.ok) {
                    const content = await response.json()
                    setContent(content)
                } else {
                    console.log('Échec de récupération du contenu');
                }
            } catch (error) {
                console.error(error)
            }
        }
        getContent()
    }, []);


    return (

        <>
            <Formik
                initialValues={{
                    title: content.title,
                    description: content.description,
                    phoneNumber: content.phoneNumber,

                }}
                enableReinitialize={true}
                validationSchema={Yup.object({
                    title: Yup.string()
                        .required("Veuillez renseigner le nom de l'annonce."),
                    description: Yup.string()
                        .required(),
                    phoneNumber: Yup.string()
                        .required()
                })}
                onSubmit={values => {
                    fetch('/contents/1', {
                        method: 'PUT',
                        headers: {
                            'Content-type': 'application/json',
                            'x-access-token': token,
                        },
                        body: JSON.stringify(values)
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log('Contenu mis à jour :', data)
                        })
                        .catch(error => {
                            console.error('Erreur lors de l\'enregistrement du contenu :', error);
                        })
                }}
            >
                <Form className=''>
                    <div className="columns m-0 is-variable is-centered is-vcentered pt-5 pb-2">
                        <div className="column is-7 updateContent-Form">
                            <fieldset disabled={!updateForm} >
                                <div className='is-flex is-flex-direction-column is-fullwidth is-align-items-flex-start mb-4 pb-5'>
                                    <div className='is-flex is-align-items-center'>
                                        <MdSubject color='#485fc7' size={30} className='mr-3' />
                                        <h3 className='is-size-3 mb-2'>Titre du contenu </h3>
                                    </div>
                                    <MyTextInput
                                        label=""
                                        id="title"
                                        name="title"
                                        type="text"
                                    />
                                </div>


                                <div className='is-flex is-flex-direction-column is-fullwidth is-align-items-flex-start mb-4 pb-5'>
                                    <div className='is-flex is-align-items-center'>
                                        <MdDescription color='#485fc7' size={30} className='mr-3' />
                                        <h3 className='is-size-3 mb-2'>Description </h3>
                                    </div>
                                    <MyTextInput
                                        label=""
                                        id="description"
                                        name="description"
                                        type="textarea"
                                    />
                                </div>

                                <div className='is-flex is-flex-direction-column is-fullwidth is-align-items-flex-start  pb-5 mb-2'>
                                    <div className='is-flex is-align-items-center'>
                                        <BsFillTelephoneFill color='#485fc7' size={28} className='mr-3' />
                                        <h3 className='is-size-3 mb-2'>Numéro de téléphone </h3>
                                    </div>
                                    <MyTextInput
                                        label=""
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        type="text"
                                    />
                                </div>
                                {updateForm && (
                                    <div className="is-flex is-justify-content-center">
                                        <div className="control">
                                            <button type="submit" className="button is-link is-rounded mr-2">Confirmer</button>
                                        </div>
                                        <div className="control">
                                            <button
                                                type="button"
                                                onClick={() => updateFormClick()}
                                                className="button is-danger is-rounded"
                                            >
                                                Annuler
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </fieldset>
                        </div>
                    </div>


                </Form>
            </Formik >
        </>
    )
}
