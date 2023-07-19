import React, { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import NavBarAdmin from '../NavBarAdmin/NavBarAdmin';
import useWindowWidth from '../../../Hooks/useWindowWidth';
import { BsPencilSquare } from 'react-icons/bs'
import { MyTextInput } from '../../../Hooks/GenericInputFormik'
import { useNavigate } from 'react-router-dom';
import './OpeningHoursPage.css'

export default function OpeningHoursPage() {

    const width = useWindowWidth()
    const token = localStorage.getItem('token');
    const navigate = useNavigate()


    const [updateForm, setUpdateForm] = useState(false)
    const updateFormClick = () => {
        setUpdateForm(!updateForm)
    }
    const [openingHours, setOpeningHours] = useState({
        Lundi: { openingTime: '', closingTime: '' },
        Mardi: { openingTime: '', closingTime: '' },
        Mercredi: { openingTime: '', closingTime: '' },
        Jeudi: { openingTime: '', closingTime: '' },
        Vendredi: { openingTime: '', closingTime: '' },
        Samedi: { openingTime: '', closingTime: '' },
        Dimanche: { openingTime: '', closingTime: '' },
    });

    const weekDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];




    useEffect(() => {
        const getOpeningHours = async () => {
            try {
                const response = await fetch('http://localhost:8000/openingHours', {
                    method: 'GET',
                })
                if (response.ok) {
                    const openingHoursData = await response.json();
                    const openingHoursObj = openingHoursData.reduce((acc, curr) => {
                        const { dayOfWeek, openingTime, closingTime, closed } = curr;
                        return {
                            ...acc,
                            [dayOfWeek]: {
                                openingTime: openingTime || '',
                                closingTime: closingTime || '',
                                closed: closed || false,
                            },
                        };
                    }, {});
                    setOpeningHours(openingHoursObj);
                } else {
                    console.log('Échec de récupération des horaires');
                }
            } catch (error) {
                console.log(error)
            }
        }
        getOpeningHours()
    }, [])

    return (
        <>

            <NavBarAdmin />
            <div breakpoint='fluid' className={` AdminPage ${width > 1023 ? 'AdminPage-desktop-width' : 'AdminPage-ismobile-padding '}`}>
                <div className='adminPage-container'>

                    <h1 className='AdminPage-title mb-2'>Gérer mes <span>horaires</span> d'ouverture</h1>

                    {updateForm ? ''
                        :
                        <div className="navbar-item" >
                            <button
                                onClick={updateFormClick}
                                className='button is-rounded is-warning'
                                style={{ color: 'white', fontWeight: '600' }}
                            >
                                <BsPencilSquare color='white' size={20} className='is-flex is-align-items-center mr-2' />
                                <p className='has-text-white'>Modifier</p>
                            </button>
                        </div>
                    }

                    <Formik
                        initialValues={{
                            openingHours
                        }}
                        enableReinitialize={true}
                        validationSchema={Yup.object({
                            openingTime: Yup.string().nullable(),
                            closingTime: Yup.string().nullable(),
                            closed: Yup.boolean().nullable()
                        })}
                        onSubmit={async (values) => {
                            try {
                                const response = await fetch('http://localhost:8000/openingHours', {
                                    method: 'PUT',
                                    headers: {
                                        'Content-type': 'application/json',
                                        'x-access-token': token,
                                    },
                                    body: JSON.stringify(values.openingHours),
                                });

                                if (response.ok) {
                                    const data = await response.json();
                                    console.log('Horaires mis à jour :', data);
                                } else {
                                    console.log('Échec de la mise à jour des horaires');
                                }
                            } catch (error) {
                                console.log(error);
                            }
                        }}
                    >
                        <Form className=''>
                            <div className='m-0 columns is-variable is-centered is-vcentered pt-5 pb-2'>
                                <div className="column is-half-fullhd is-7-desktop is-full-tablet is-full-mobile updateContent-Form">
                                    <fieldset disabled={!updateForm} className='is-flex is-align-items-center is-flex-direction-column' >
                                        {weekDays.map((day) => (
                                            <div
                                                key={day}
                                                className={`is-flex is-flex-direction-raw is-fullwidth is-align-items-center is-justify-content-center mb-4 ${openingHours[day].closed ? 'closed-style' : ''}`}
                                            >
                                                <label htmlFor={`openingHours.${day}.openingTime`}>{day.slice(0, 3)}. :</label>
                                                <div className={`${width < 500 ? 'ml-1' : 'ml-5'} is-flex is-align-items-center`}>
                                                    {openingHours[day].closed ? '' :

                                                        <div className={`${width < 500 ? 'ml-1' : 'ml-5'} control`}>
                                                            <MyTextInput
                                                                type="time"
                                                                name={`openingHours.${day}.openingTime`}
                                                                id={`openingHours.${day}.openingTime`}
                                                            />
                                                        </div>
                                                    }
                                                    {openingHours[day].closed ? '' :

                                                        <div className={`${width < 500 ? 'ml-1' : 'ml-5'} control`}>
                                                            <MyTextInput
                                                                type="time"
                                                                name={`openingHours.${day}.closingTime`}
                                                                id={`openingHours.${day}.closingTime`}
                                                            />
                                                        </div>
                                                    }
                                                    <div className={`${width < 500 ? 'ml-1 is-flex is-flex-direction-column' : 'ml-5'} control`}>
                                                        <Field
                                                            type="checkbox"
                                                            name={`openingHours.${day}.closed`}
                                                            id={`openingHours.${day}.closed`}
                                                            onChange={() => {
                                                                setOpeningHours((prevOpeningHours) => ({
                                                                    ...prevOpeningHours,
                                                                    [day]: {
                                                                        ...prevOpeningHours[day],
                                                                        closed: !prevOpeningHours[day].closed,
                                                                    },
                                                                }));
                                                            }}
                                                        />
                                                        <label htmlFor={`openingHours.${day}.closed`} className="ml-2">Fermé</label>
                                                    </div>


                                                </div>


                                            </div>
                                        ))}

                                    </fieldset>
                                </div>
                            </div>

                            {updateForm && (
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
                            )}
                        </Form>
                    </Formik >

                </div>
            </div>

        </>
    )
}
