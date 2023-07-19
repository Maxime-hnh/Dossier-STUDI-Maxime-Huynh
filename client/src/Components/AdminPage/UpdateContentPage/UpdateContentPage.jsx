import React, { useState } from 'react'
import NavBarAdmin from '../NavBarAdmin/NavBarAdmin';
import useWindowWidth from '../../../Hooks/useWindowWidth';
import UpdateContentOne from './UpdateContentOne';
import UpdateContentTwo from './UpdateContentTwo';
import UpdateContentThree from './UpdateContentThree';
import { HiOutlinePlus } from 'react-icons/hi'
import { MdExpandMore } from 'react-icons/md'
import { BsPencilSquare } from 'react-icons/bs'


export default function UpdateContentPage() {

    const width = useWindowWidth()
    const [activeTab, setActiveTab] = useState('contentOne');
    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
    };

    const [updateForm, setUpdateForm] = useState(false)
    const updateFormClick = () => {
        setUpdateForm(!updateForm)
    }

    return (
        <>
            <NavBarAdmin />
            <div breakpoint='fluid' className={` AdminPage ${width > 1023 ? 'AdminPage-desktop-width' : 'AdminPage-ismobile-padding '}`}>
                <div className='adminPage-container'>

                    <h1 className='AdminPage-title mb-2'>Contenu de la page d'<span>accueil</span></h1>
                    <nav
                        role="navigation"
                        arial-label="main navigation"
                        style={{ minHeight: '60px', alignItems: 'center' }}
                        className={`${width < 500 ? 'nav-isMobile' : ''} navbar-brand rainbow-align-content_center rainbow-flex_wrap`}
                    >
                        <div className="navbar-item">
                            <button className='button is-rounded is-link' onClick={() => handleTabChange('contentOne')}>
                                <MdExpandMore color='white' size={20} className='is-flex is-align-items-center mr-2' />
                                <p style={{ color: 'white' }}>Contenu 1</p>
                            </button>
                        </div>
                        <div className="navbar-item" >
                            <button className='button is-rounded is-success' onClick={() => handleTabChange('contentTwo')}>
                                <HiOutlinePlus color='white' className='is-flex is-align-items-center mr-2' />
                                <p>Contenu 2</p>
                            </button>
                        </div>
                        <div className="navbar-item">
                            <button className='button is-rounded is-link' onClick={() => handleTabChange('contentThree')}>
                                <HiOutlinePlus color='white' size={20} className='is-flex is-align-items-center mr-2' />
                                <p style={{ color: 'white' }}>Contenu 3</p>
                            </button>
                        </div>
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
                    </nav>

                    {activeTab === 'contentOne' && < UpdateContentOne updateForm={updateForm} updateFormClick={updateFormClick} />}
                    {activeTab === 'contentTwo' && < UpdateContentTwo updateForm={updateForm} updateFormClick={updateFormClick}/>}
                    {activeTab === 'contentThree' && < UpdateContentThree updateForm={updateForm} updateFormClick={updateFormClick}/>}

                </div>
            </div>
        </>
    )
}
