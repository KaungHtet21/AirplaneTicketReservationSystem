import './App.css';
import { Route, Routes } from 'react-router-dom';
// import Home from './routes/Home';
// import About from './routes/About';
// import Service from './routes/Service';
// import Contact from './routes/Contact';
// import Login from './screens/LoginScreen/Login';
import Home from './routes/Home';
import About from './routes/About';
import Contact from './routes/Offices';
import Login from './routes/Login';
import SignupScreen from './screens/SignupScreen/SignupScreen';
import CharterServices from './routes/CharterServices';
import Offices from './routes/Offices';
import Promotion from './routes/Promotion';
import TermsAndConditions from './routes/TermsAndConditions';
import TravelPolicy from './routes/TravelPolicy';
import FlyScreen from './screens/FlyScreen/FlyScreen';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/promo' element={<Promotion/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignupScreen/>}/>
        <Route path='/charter_service' element={<CharterServices/>}/>
        <Route path='/offices' element={<Offices/>}/>
        <Route path='/terms&conditions' element={<TermsAndConditions/>}/>
        <Route path='/travel_policy' element={<TravelPolicy/>}/>
        <Route path='/fly' element={<FlyScreen/>}/>
      </Routes>
    </div>
  );
}

export default App;
