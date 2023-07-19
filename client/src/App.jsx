import './App.css';
import { Routes, Route } from 'react-router-dom'
import HomePage from './Components/Home/HomePage';
import Profile from './Components/AdminPage/Profile';
import CarsForm from './Components/AdminPage/CarsFormPage/CarsForm';
import CarsPage from './Components/AdminPage/CarsPage/CarsPage';
import UsersPage from './Components/AdminPage/UsersPage/UsersPage';
import SellPage from './Components/Home/SellPage/SellPage';
import UpdateContentPage from './Components/AdminPage/UpdateContentPage/UpdateContentPage';
import OpeningHoursPage from './Components/AdminPage/OpeningHoursPage/OpeningHoursPage';
import TestimonialPage from './Components/AdminPage/TestimonialPage/TestimonialPage';
import ContactPage from './Components/AdminPage/MessagePage/MessagePage';


function App() {
  return (
    <div className="App">



      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/vehicules" element={<SellPage />} />
        <Route path="/mon-profil" element={<Profile />} />
        <Route path='/mon-profil/formulaire-creation-annonce' element={<CarsForm />} />
        <Route path="/mon-profil/véhicules" element={<CarsPage />} />
        <Route path="/mon-profil/contenu" element={<UpdateContentPage />} />
        <Route path="/mon-profil/temoignages" element={<TestimonialPage />} />
        <Route path="/mon-profil/messages" element={<ContactPage />} />
        <Route path="/mon-profil/horaires" element={<OpeningHoursPage />} />
        <Route path="/mon-profil/utilisateurs" element={<UsersPage />} />
      </Routes>
    </div>
  );
}

export default App;