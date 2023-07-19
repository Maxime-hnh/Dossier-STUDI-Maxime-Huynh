import React, { useEffect, useState } from 'react'
import NavBarAdmin from '../NavBarAdmin/NavBarAdmin';
import useWindowWidth from '../../../Hooks/useWindowWidth';
import { BsChatDots } from 'react-icons/bs'
import { MdDeleteForever } from 'react-icons/md'


export default function ContactPage() {


    const token = localStorage.getItem('token');
    const width = useWindowWidth()
    const [contacts, setContacts] = useState([])
    useEffect(() => {

        const getMessages = async () => {
          try {
            const response = await fetch('http://51.210.124.204:8000/contacts', {
              method: 'GET',
              headers: {
                'Content-type': 'application/json',
                'x-access-token': token
            }
            })
            if (response.ok) {
              const contacts = await response.json()
              setContacts(contacts)
            } else {
              console.log('Échec de récupération des messages');
            }
          } catch (error) {
            console.error(error)
          }
    
        }
        getMessages()
      }, [token])

      const deleteContact = async (contactId) => {
        try {
            const response = await fetch(`http://51.210.124.204:8000/contacts/${contactId}`, {
                method: 'DELETE',
                headers: {
                    'x-access-token': token
                }
            })
            if (response.ok) {
                setContacts((prevContacts) => {
                    const updatedContacts = prevContacts.filter((contact) => contact.id !== contactId)
                    return updatedContacts
                })
            } else {
                console.error("Erreur lors de la suppression du message");
            }
        } catch (error) {
            console.error("Une erreur s'est produite lors de la suppression du message:", error);
        }
    };
    

    return (
        <>
            <NavBarAdmin />
            <div breakpoint='fluid' className={` AdminPage ${width > 1023 ? 'AdminPage-desktop-width' : 'AdminPage-ismobile-padding '}`}>

                <div className='adminPage-container'>

                    <h1 className='AdminPage-title mb-2'>Nos <span>Messages</span> reçus</h1>
                    <div className="column is-12">

                        <div className="columns is-multiline is-1 is-justify-content-center">
                            {contacts && contacts.map((contact, index) => (


                                <div key={index} className="mt-4 mr-5 card column is-one-third-fullhd is-one-quarter-widescreen is-half-desktop is-full-tablet is-full-mobile p-0">
                                    <div className="card-content">
                                        <p className="title">
                                            “{contact.message}”
                                        </p>
                                    </div>
                                    <div className="media">
                                        <div className="media-left ml-2 is-flex is-flex-direction-raw">
                                            <BsChatDots size={40} color='#48c78e' style={{ transform: 'scaleX(-1)' }} />
                                            <div className='ml-2 is-flex is-align-items-flex-start is-flex-direction-column'>
                                                <p className="title is-4" style={{ fontFamily: 'Rajdhani', color: '#48c78e' }}>{contact.firstName} {contact.lastName} </p>
                                                <p className="subtitle is-6">{contact.email} - {contact.phoneNumber} </p>
                                            </div>
                                        </div>


                                    </div>
                                    <footer className="card-footer is-flex is-justify-content-space-evenly">
                                        <button
                                            className="card-footer-item"
                                            style={{ border: 'none', background: 'none' }}
                                            onClick={(() => deleteContact(contact.id))}
                                        >
                                            <MdDeleteForever color='#F14668' size={35} style={{ cursor: 'pointer' }} />
                                        </button>
                                    </footer>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
