import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import useWindowWidth from '../../../Hooks/useWindowWidth';
import logo from '../../../Assets/logo.png'
import { AiFillCar } from 'react-icons/ai';
import { AiFillHome } from 'react-icons/ai';
import { BsPersonFillUp } from 'react-icons/bs';
import { RiLogoutBoxRFill } from 'react-icons/ri';
import { BsPencilSquare } from 'react-icons/bs';
import { TbClockHour7 } from 'react-icons/tb';
import { SlSpeech } from 'react-icons/sl';
import { RiSpeakFill } from 'react-icons/ri'


import './NavBarAdmin.css'

export default function NavBarAdmin() {

    const width = useWindowWidth();

    const token = localStorage.getItem('token');
    const tokenPayload = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(tokenPayload));
    const userRole = decodedPayload.role

    const logOut = () => {
        localStorage.removeItem('token');
    }

    const [isActive, setIsActive] = useState(false);
    const handleBurgerClick = () => {
        setIsActive(!isActive);
    };

    return (

        <>
            <nav className={width > 1023 ? "navbar is-link is-flex-direction-column is-fullheight custom-navbar-vertical" : 'navbar is-link'} >
                <div className='is-flex is-justify-content-center'>
                    <img src={logo} alt="logo de l'entreprise" className={width > 1023 ? "navbar-item logo-bigger" : 'navbar logo-smaller'} />
                    <a role="button" href="#Menu" onClick={handleBurgerClick} className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div className={isActive ? 'is-active navbar-menu' : 'navbar-menu is-flex-direction-column'}>
                    <NavLink to="/mon-profil" className={width > 1023 ? "navbar-item sidebar-white" : 'navbar-item sidebar-black'}><AiFillHome className='mr-3' /><p>Home</p></NavLink>
                    <NavLink to="/mon-profil/véhicules" className={width > 1023 ? "navbar-item sidebar-white" : 'navbar-item sidebar-black'}><AiFillCar className='mr-3' /><p>Véhicules</p></NavLink>
                    <NavLink to="/mon-profil/temoignages" className={width > 1023 ? "navbar-item sidebar-white" : 'navbar-item sidebar-black'}><SlSpeech className='mr-3' /><p>Témoignages</p></NavLink>
                    <NavLink to="/mon-profil/messages" className={width > 1023 ? "navbar-item sidebar-white" : 'navbar-item sidebar-black'}><RiSpeakFill className='mr-3' /><p>Mes messages</p></NavLink>
                    {(userRole === 'user') ? null : (
                        <>
                            <NavLink to="/mon-profil/contenu" className={width > 1023 ? "navbar-item sidebar-white" : 'navbar-item sidebar-black'}><BsPencilSquare className='mr-3' /><p>Contenu</p></NavLink>
                            <NavLink to="/mon-profil/horaires" className={width > 1023 ? "navbar-item sidebar-white" : 'navbar-item sidebar-black'}><TbClockHour7 className='mr-3' /><p>Horaires</p></NavLink>
                            <NavLink to="/mon-profil/utilisateurs" className={width > 1023 ? "navbar-item sidebar-white" : 'navbar-item sidebar-black'}><BsPersonFillUp className='mr-3' /><p>Gérer les profils</p></NavLink>
                        </>
                    )}
                    <NavLink onClick={(() => logOut)} to="/" className={width > 1023 ? "navbar-item sidebar-white" : 'navbar-item sidebar-black'}><RiLogoutBoxRFill className='mr-3' /><p>Déconnexion</p></NavLink>
                </div>

                {width > 1023 ?
                    <div className='mb-5'>
                        <ul className='is-flex is-justify-content-center is-flex-direction-row is-flex-wrap-wrap is-size-7'>
                            <li className='pr-3'>CGV</li>
                            <li>CGU</li>
                            <li className='mt-1'>Politique de confidentialité</li>
                        </ul>
                    </div>
                    : ''}
            </nav>
        </>
    )
}
