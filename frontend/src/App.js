import './App.css';
import { Route, Routes } from 'react-router-dom';
// import Home from './routes/Home';
// import About from './routes/About';
// import Service from './routes/Service';
// import Contact from './routes/Contact';
// import Login from './screens/LoginScreen/Login';
import Home from './routes/Home';
import About from './routes/About';
import Service from './routes/Service';
import Contact from './routes/Service';
import Login from './routes/Login';
import SignupScreen from './screens/SignupScreen/SignupScreen';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/service' element={<Service/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignupScreen/>}/>
      </Routes>
    </div>
  );
}

export default App;
