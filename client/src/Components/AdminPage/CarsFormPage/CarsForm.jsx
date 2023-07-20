import React, { useState } from 'react'
import { Formik, Form } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import * as Yup from 'yup';
import './CarsForm.css';
import NavBarAdmin from '../NavBarAdmin/NavBarAdmin'
import CarsFormContent from './CarsFormContent';
import useWindowWidth from '../../../Hooks/useWindowWidth';


// VALIDATION DATE
const dateSchema = Yup.date()
    .test('valid-date', 'error date', function (value) {
        const date = moment(value, 'DD/MM/YYYY')
        if (!date.isValid() || date.year() < 1900 || date.year() > 2100) {
            return this.createError({ message: 'La date est erronée' });
        }
        return true;
    })
    .required('La date est obligatoire');


export default function CarsForm() {

    const navigate = useNavigate()
    const width = useWindowWidth()

    const [updateForm, setUpdateForm] = useState(false)
    const updateFormClick = () => {
        setUpdateForm(!updateForm)
    }
    const token = localStorage.getItem('token');

    const location = useLocation();
    let { car } = location.state || {}

    return (
        <>
            <NavBarAdmin />

            <div breakpoint='fluid' className={` AdminPage ${width > 1023 ? 'AdminPage-desktop-width' : 'AdminPage-ismobile-padding '}`}>
                <div className='Carsform-container'>

                    <h1 className='Carsform-title has-text-centered'>Ajouter une annonce</h1>
                    <div className='CarsForm-btnTop-container'>
                        {updateForm ? ''
                            :
                            <button
                                onClick={updateFormClick}
                                className='button is-warning'
                                style={{ color: 'white', top: '10px', fontWeight: '600' }}
                            >
                                Modifier
                            </button>}
                    </div>
                    <Formik
                        initialValues={car || {
                            name: '',
                            price: 0,
                            date: '',
                            milage: 0,
                            features:
                            {
                                engine: 0,
                                fiscalHorsePower: 0,
                                body: '',
                                seatingCapacity: 0,
                                power: ''
                            },
                            brand: '',
                            options: '',
                            description: '',
                            file: []
                        }}
                        enableReinitialize={true}
                        validationSchema={Yup.object({
                            name: Yup.string()
                                .max(100, '100 caractères maximum')
                                .required("Veuillez renseigner le nom de l'annonce."),
                            features: Yup.object({
                                engine: Yup.number(),
                                fiscalHorsePower: Yup.number(),
                                bodyCar: Yup.string()
                                    .oneOf(
                                        [
                                            'Citadine',
                                            'Berline',
                                            'Break',
                                            'Monospace',
                                            '4X4',
                                            'Coupé',
                                            'Cabriolet',
                                            'Pick-up'
                                        ]
                                    )
                                    .required('Sélectionnez la catégorie'),
                                seatingCapacity: Yup.number()
                                    .oneOf([2, 3, 4, 5])
                                    .required('Sélectionnez le nombre de place'),
                                power: Yup.string()
                                    .oneOf(['Essence', 'Gasoil'])
                                    .required('Sélectionnez un carburant')
                            }),
                            brand: Yup.string()
                                .oneOf(
                                    [
                                        'Renault',
                                        'Peugeot',
                                        'Citroën',
                                        'Opel',
                                        'Audi',
                                        'Mercedes',
                                        'Volkswagen',
                                        'Toyota'
                                    ]
                                )
                                .required('Sélectionnez la catégorie'),
                            price: Yup.number()
                                .required(),
                            description: Yup.string().max(1000, '1000 caractères maximum')
                            ,
                            milage: Yup.number()
                                .required(),
                            options: Yup.string(),
                            file: Yup.mixed(),
                            date: dateSchema
                        })}
                        onSubmit={values => {
                            fetch(`http://localhost:8000/cars${car && car.id ? `/${car.id}` : ''}`, {
                                method: car && car.id ? 'PUT' : 'POST',
                                headers: {
                                    'Content-type': 'application/json',
                                    'x-access-token': token,
                                },
                                body: JSON.stringify(values)
                            })
                                .then(response => response.json())
                                .then(data => {
                                    console.log(`${car && car.id ? 'Annonce mise à jour : ' : 'Annonce créée : '}`, data)
                                    alert('Annonce créée avec succès !')
                                })
                                .catch(error => {
                                    console.error('Erreur lors de l\'enregistrement des données de l\'événement :', error);
                                })
                        }}
                    >

                        {formik => (
                            <Form className='CarsForm-FormContainer'>

                                <CarsFormContent
                                    updateForm={updateForm}
                                    setFieldValue={formik.setFieldValue}
                                    token={token}
                                />
                                {updateForm && (
                                    <div className="CarsForm-submit-container">
                                        <div className="control">
                                            <button type="submit" className="button is-link">Confirmer</button>
                                        </div>
                                        <div className="control">
                                            <button
                                                type="button"
                                                onClick={() => navigate('/mon-profil')}
                                                className="button is-danger"
                                            >
                                                Annuler
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </Form>
                        )}
                    </Formik >
                </div>
            </div>
        </>

    );

};

