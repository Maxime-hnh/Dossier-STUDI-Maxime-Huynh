import React, { useState } from 'react'
import NavBarAdmin from '../NavBarAdmin/NavBarAdmin';
import useWindowWidth from '../../../Hooks/useWindowWidth';
import { AiFillCheckCircle } from 'react-icons/ai'
import { MdOutlineDoNotDisturbAlt } from 'react-icons/md'
import { ImNotification } from 'react-icons/im'
import { ImFilesEmpty } from 'react-icons/im'
import { BsPencilSquare } from 'react-icons/bs'
import AllTestimonials from './AllTestimonials';
import ToTreat from './ToTreat'
import Denied from './Denied';
import Approved from './Approved';
import PostTestimonial from './PostTestimonial'



export default function TestimonialPage() {

    const token = localStorage.getItem('token')
    const width = useWindowWidth()
    const [activeTab, setActiveTab] = useState('contentOne');
    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
    };


    const [testimonials, setTestimonials] = useState()
    const ChangeToApproved = async (testimonialId) => {
        const data = {
            isApproved: true,
            isChecked: true
        }
        try {
            const response = await fetch(`/testimonials/changeStatus/${testimonialId}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'x-access-token': token
                },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                setTestimonials((prevTestimonials) => {
                    const updatedTestimonials = prevTestimonials.filter((testimonial) => testimonial.id !== testimonialId)
                    return updatedTestimonials
                })
            } else {
                console.log('Échec de récupération des avis');
            }
        } catch (error) {
            console.error(error)
        }
    }
    const ChangeToUnapproved = async (testimonialId) => {
        const data = {
            isApproved: false,
            isChecked: true
        }
        try {
            const response = await fetch(`/testimonials/changeStatus/${testimonialId}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'x-access-token': token
                },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                setTestimonials((prevTestimonials) => {
                    const updatedTestimonials = prevTestimonials.filter((testimonial) => testimonial.id !== testimonialId)
                    return updatedTestimonials
                })
            } else {
                console.log('Échec de récupération des avis');
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleApprovedStatus = (testimonialId) => {
        ChangeToApproved(testimonialId);
    }

    const handleUnapprovedStatus = (testimonialId) => {
        ChangeToUnapproved(testimonialId);
    }


    return (
        <>
            <NavBarAdmin />
            <div breakpoint='fluid' className={` AdminPage ${width > 1023 ? 'AdminPage-desktop-width' : 'AdminPage-ismobile-padding '}`}>

                <div className='adminPage-container'>

                    <h1 className='AdminPage-title mb-2'>Nos <span>témoignages</span></h1>
                    <nav
                        role="navigation"
                        arial-label="main navigation"
                        style={{ minHeight: '60px', alignItems: 'center' }}
                        className={`${width < 800 ? 'nav-isMobile' : ''} navbar-brand rainbow-align-content_center rainbow-flex_wrap`}
                    >
                        <div className="navbar-item">
                            <button className='button is-rounded is-link' onClick={() => handleTabChange('all')}>
                                <ImFilesEmpty color='white' size={20} className='is-flex is-align-items-center mr-2' />
                                <p style={{ color: 'white' }}>Tous les avis</p>
                            </button>
                        </div>
                        <div className="navbar-item" >
                            <button className='button is-rounded is-warning' onClick={() => handleTabChange('toTreat')}>
                                <ImNotification color='black' className='is-flex is-align-items-center mr-2' />
                                <p>A traiter</p>
                            </button>
                        </div>
                        <div className="navbar-item">
                            <button className='button is-rounded is-success' onClick={() => handleTabChange('approved')}>
                                <AiFillCheckCircle color='white' size={20} className='is-flex is-align-items-center mr-2' />
                                <p style={{ color: 'white' }}>Validés</p>
                            </button>
                        </div>
                        <div className="navbar-item">
                            <button className='button is-rounded is-danger' onClick={() => handleTabChange('denied')}>
                                <MdOutlineDoNotDisturbAlt color='white' size={20} className='is-flex is-align-items-center mr-2' />
                                <p style={{ color: 'white' }}>Refusés</p>
                            </button>
                        </div>
                        <div className="navbar-item">
                            <button className='button is-rounded is-link' onClick={() => handleTabChange('postTestimonial')}>
                                <BsPencilSquare color='white' size={20} className='is-flex is-align-items-center mr-2' />
                                <p style={{ color: 'white' }}>Publier un avis</p>
                            </button>
                        </div>
                    </nav>
                    {activeTab === 'all' && < AllTestimonials handleApprovedStatus={handleApprovedStatus} handleUnapprovedStatus={handleUnapprovedStatus} setTestimonials={setTestimonials} testimonials={testimonials} token={token} />}
                    {activeTab === 'toTreat' && < ToTreat handleApprovedStatus={handleApprovedStatus} handleUnapprovedStatus={handleUnapprovedStatus} setTestimonials={setTestimonials} testimonials={testimonials} token={token} />}
                    {activeTab === 'approved' && < Approved handleApprovedStatus={handleApprovedStatus} handleUnapprovedStatus={handleUnapprovedStatus} setTestimonials={setTestimonials} testimonials={testimonials} token={token} />}
                    {activeTab === 'denied' && < Denied handleApprovedStatus={handleApprovedStatus} handleUnapprovedStatus={handleUnapprovedStatus} setTestimonials={setTestimonials} testimonials={testimonials} token={token} />}
                    {activeTab === 'postTestimonial' && < PostTestimonial handleApprovedStatus={handleApprovedStatus} handleUnapprovedStatus={handleUnapprovedStatus} setTestimonials={setTestimonials} testimonials={testimonials} token={token} />}
                </div>
            </div>
        </>
    )
}
