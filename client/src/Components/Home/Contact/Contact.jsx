import React from 'react'
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { Modal, Content } from 'react-bulma-components';

export default function Contact({car}) {


  const MyTextInput = ({ label, ...props }) => {

    const [field, meta] = useField(props);
    const errorClass = meta.touched && meta.error ? 'is-danger' : 'is-info';
    return (
      <>
        <div className='field'>
          <div className='control'>
            {props.name === 'message' ?
              <textarea
                className={`${errorClass} textarea`}
                style={{ fontSize: '1rem' }}
                {...field}
                {...props}
              >
              </textarea> :
              <input
                className={`${errorClass} input`}
                style={{ fontSize: '1rem' }}
                {...field}
                {...props}
              >
              </input>
            }
          </div>
          {meta.touched && meta.error ? (<div className='help is-danger' style={{ position: 'absolute', margin: '0' }}>{meta.error}</div>) : null}
        </div>
      </>
    )
  };


  return (
    <Modal.Card>
      <Modal.Card.Header showClose>
        <Modal.Card.Title className='is-size-4'>Formulaire de contact</Modal.Card.Title>
      </Modal.Card.Header>

      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          phoneNumber: '',
          email: '',
          message: `${car? `Bonjour, je vous contacte concernant l'annonce ${car.name} (${car.id}). ` : ''}`
        }}
        enableReinitialize={true}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(30)
            .required('Veuillez renseigner votre prénom'),
          lastName: Yup.string()
            .max(30)
            .required('Veuillez renseigner votre nom'),
          phoneNumber: Yup.string()
            .max(15)
            .required('Veuillez renseigner votre numéro de téléphone'),
          email: Yup.string()
            .max(100)
            .required('Veuillez renseigner votre adresse mail'),
          message: Yup.string()
            .max(500)
            .required('Pour un meilleur traitement de votre demande, merci de renseigner un message')
        })}
        onSubmit={async (values) => {
          try {
            const response = await fetch('/contacts', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values)
            })
            if (response.ok) {
              const data = await response.json()
              console.log('Message envoyé :', data)
            }
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <Form>
          <Modal.Card.Body>
            <Content>
              <div className='is-flex is-flex-direction-raw is-justify-content-space-evenly'>
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
                  <h2 className='is-size-5'>Nom :</h2>
                  <MyTextInput
                    label=""
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Dupont"
                  />
                </div>
              </div>

              <div className='is-flex is-flex-direction-raw is-justify-content-space-evenly'>

                <div className='is-flex is-flex-direction-column mb-2 pb-2'>
                  <h2 className='is-size-5'>Téléphone :</h2>
                  <MyTextInput
                    label=""
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    placeholder="06 00 00 00 00"
                  />
                </div>
                <div className='is-flex is-flex-direction-column mb-2 pb-2'>
                  <h2 className='is-size-5'>Email :</h2>
                  <MyTextInput
                    label=""
                    id="email"
                    name="email"
                    type="email"
                    placeholder="jean.dupont@mail.fr"
                  />
                </div>
              </div>
              <div className='is-flex is-flex-direction-column mb-2 pb-2'>
                <h2 className='is-size-5'>Message :</h2>
                <MyTextInput
                  label=""
                  id="message"
                  name="message"
                  type="textarea"
                />
              </div>
            </Content>
          </Modal.Card.Body>

          <Modal.Card.Footer>
            <button type='submit' className='button is-success is-medium'>Envoyer</button>
            <button className='button is-success is-medium'>Annuler</button>
          </Modal.Card.Footer>
        </Form>
      </Formik>
    </Modal.Card >
  )
}
