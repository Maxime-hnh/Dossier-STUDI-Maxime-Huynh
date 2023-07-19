import React, { useState } from 'react'
import 'bulma/css/bulma.css';
import { Navbar, Button, Modal } from 'react-bulma-components';
import logo from '../../../Assets/logoClientPage.png'
import Login from '../../Login/Login';
import './NavBar.css';
import { NavLink } from 'react-router-dom';
import { AiFillCar } from 'react-icons/ai';
import { AiFillHome } from 'react-icons/ai';
import { BsFillInfoCircleFill } from 'react-icons/bs';


export default function NavBar() {


    const [open, setOpen] = useState(false);
    const openModal = () => {
        setOpen(!open)
    }

    const [isActive, setIsActive] = useState(false);
    const handleBurgerClick = () => {
        setIsActive(!isActive);
    };

    return (
        <>
            <Navbar size='large' style={{ fontFamily: 'Rajdhani', background:'#1b1b1b' }}>
                <Navbar.Brand>
                    <Navbar.Item href="/">
                        <img src={logo} alt="logo de l'entreprise" className='logo' />
                        <h1 className='ml-1 is-size-4 is-uppercase has-text-weight-semibold has-text-white'>Garage <span style={{ color: '#eee938' }}>V</span>.<span style={{ color: '#eee938' }}>P</span>arrot</h1>
                    </Navbar.Item>
                    <Navbar.Burger style={{color:'white'}} onClick={handleBurgerClick} />
                </Navbar.Brand>
                <Navbar.Menu className={isActive ? 'is-active is-active-background' : ''}>
                    <Navbar.Container color="link" className={isActive ? 'is-flex is-flex-direction-column is-justify-content-center is-align-items-center' : 'navbar-container-desktop'}>
                        <NavLink to="/" className={'has-text-white is-flex is-align-items-center is-justify-content-center  is-size-5'}>{isActive ? '' : <AiFillHome className='mr-3' color='#eee938' />}<p>Accueil</p></NavLink>
                        <NavLink to="/vehicules" className={'has-text-white  is-flex is-align-items-center is-justify-content-center is-size-5'}>{isActive ? '' : <AiFillCar className='mr-3' color='#eee938' />}<p>Nos véhicules</p></NavLink>
                        <NavLink to="/contact" className={'has-text-white   is-flex is-align-items-center is-justify-content-center is-size-5'}>{isActive ? '' : <BsFillInfoCircleFill className='mr-3' color='#eee938' />}<p>A propos</p></NavLink>
                    </Navbar.Container>
                    <Navbar.Container align="end" className='navBar-button-container'>
                        <Button onClick={openModal} className='is-size-6 is-rounded has-text-weight-bold' style={{ background: '#eee938', textTransform:'uppercase' }}>S'identifier</Button>
                    </Navbar.Container>
                </Navbar.Menu>
            </Navbar>

            <Modal show={open} onClose={() => setOpen(false)}>
                <Login />
            </Modal>
        </>
    )
}
