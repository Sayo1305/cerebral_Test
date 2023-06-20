import {  Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import Footer from './components/Footers';
import LoginPage from './pages/LoginPage';
import SignPage from './pages/SignPage';
function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/Plans' element={<HomePage/>}></Route>
        <Route path='/therapy' element={<HomePage/>}></Route>
        <Route path='/Medication' element={<HomePage/>}></Route>
        <Route path='/Insurance' element={<HomePage/>}></Route>
        <Route path='/About' element={<HomePage/>}></Route>
        <Route path='/app/Login' element={<LoginPage/>}></Route>
        <Route path='/app/SignUp' element={<SignPage/>}></Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
