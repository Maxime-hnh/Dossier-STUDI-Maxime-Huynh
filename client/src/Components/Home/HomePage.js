import React, { useState } from 'react'
import './HomePage.css'
import NavBar from './Navbar/NavBar'
import useWindowWidth from '../../Hooks/useWindowWidth'
import { GiAutoRepair } from 'react-icons/gi'
import { LiaBirthdayCakeSolid } from 'react-icons/lia'
import { TbDiscount2 } from 'react-icons/tb'
import { LuCalendarClock } from 'react-icons/lu'
import HomeCardItem from './HomeCardItem'
import Contact from './Contact/Contact'
import { Modal } from 'react-bulma-components';
import CheckCarServices from './Services/CheckCarServices'
import BodyCarServices from './Services/BodyCarServices'
import FixCarServices from './Services/FixCarServices'
import Testimonials from './Testimonials/Testimonials'
import Footer from './Footer/footer'


export default function HomePage() {

  const width = useWindowWidth()

  const [openContact, setOpenContact] = useState(false);
  const openModalContact = () => {
    setOpenContact(!openContact)
  }

  const handleDiscover = () => {
    const checkCarServices = document.getElementById('checkCarServices');
    checkCarServices.scrollIntoView({ behavior: 'smooth' });

  }

  return (
    <div className='home'>
      <NavBar />
      <div className={`${width > 900 ? 'homePage-desktop' : 'homePage-mobile mr-0 ml-0'} columns homePage is-centered`}>
        <div className=" homePage-container column is-12 is-flex is-flex-direction-column mt-3" style={{ height: '100%' }}>
          <h1 className={width > 500 ? 'title is-1 mb-6 homePage-title ' : 'title is-2 homePage-title'}>Acheter, entretenir, réparer ? Votre <span style={{ color: '#eee938' }}>mobilité</span>, nos <span style={{ color: '#eee938' }}>services</span>. </h1>
          <div className={width > 500 ? 'column is-5 ml-2 mt-6 is-flex-grow-1' : ' column is-5 ml-2 mt-6 is-flex-grow-1 is-flex is-align-items-end'} >
            <p className={width > 768 ? 'is-size-3 mt-3 has-text-weight-bold has-text-justified' : ' is-size-3 has-text-centered'}>
              Découvrez notre garage <span style={{ color: '#eee938' }}>100% normand</span>
              {width > 768 ? ", pour vous accompagner de l'achat de votre véhicule neuf ou d'occasion à son entretien." : "."}
            </p>
          </div>
          <div className='homePage-btn-container is-flex is-justify-content-center mb-5 is-centered is-justify-end'>
            <button onClick={handleDiscover} className='homePage-btn homePage-btn1'>Découvrir</button>
            <button onClick={openModalContact} className='homePage-btn homePage-btn2'>Contactez nous</button>
          </div>
        </div>
      </div>

      {/*START SECTION 1*/}
      <CheckCarServices width={width} />
      {/*END SECTION 1*/}

      {/*START SECTION 2*/}
      <div className={`${width < 900 ? 'mr-0 ml-0' : ''} columns is-variable is-centered is-vcentered pt-6 pb-6`} style={{ fontFamily: 'Rajdhani' }}>
        <div className="column is-12">
          <nav className={`${width < 1004 ? 'is-flex-direction-column' : 'is-flex-direction-raw'} level is-flex is-justify-content-space-evenly`}>
            <div className={`${width < 900 ? 'mb-6' : ''} level-item has-text-centered is-flex is-flex-direction-column`}>
              <LiaBirthdayCakeSolid size={80} color='#eee938' />
              <p className="title"> Depuis 2002</p>
            </div>

            <div className={`${width < 900 ? 'mb-6' : ''} level-item has-text-centered is-flex is-flex-direction-column`}>
              <GiAutoRepair size={80} />
              <p className="title" style={{ color: '#eee938' }}>Réparation garantie</p>
            </div>

            <div className={`${width < 900 ? 'mb-6' : ''} level-item has-text-centered is-flex is-flex-direction-column`}>
              <LuCalendarClock size={80} color='#eee938' />
              <p className="title">Avec ou sans RDV</p>
            </div>

            <div className='level-item has-text-centered is-flex is-flex-direction-column'>
              <TbDiscount2 size={80} />
              <p className="title" style={{ color: '#eee938' }}>Remise partenariat</p>
            </div>
          </nav>
        </div>
      </div>
      {/*END SECTION 2*/}

      {/*START SECTION 3*/}
      <BodyCarServices width={width} />
      {/*END SECTION 3*/}


      {/*START SECTION 4*/}
      <div className="column is-variable">
        <div className="column is-12">
          <div className="columns is-multiline is-1 is-flex is-justify-content-center">
            <HomeCardItem name='Nettoyage complet' price='40' />
            <HomeCardItem name='Révision du véhicule' price='60' />
            <HomeCardItem name='Contrôle technique' price='75' />
          </div>
        </div>
      </div>
      {/*END SECTION 4*/}

      {/*START SECTION 5*/}
      <FixCarServices width={width} />
      {/*END SECTION 5*/}

      {/*START SECTION 4*/}
      <Testimonials />
      {/*END SECTION 4*/}
      <Footer openModalContact={openModalContact} width={width}/>

      <Modal show={openContact} onClose={() => setOpenContact(false)}>
        <Contact />
      </Modal>

    </div>
  )
}