import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from "./components/Nav";
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';
import Profile from './components/Profile';
import { useState, useEffect } from 'react';
function App() {
  const [isFooterVisible, setFooterVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) { // Adjust the threshold as needed
        setFooterVisible(false);
      } else {
        setFooterVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
      <Routes className="content">

        <Route element={<PrivateComponent/>}>
        <Route path='/' element={<ProductList/>}/>
        <Route path='/add' element={<AddProduct/>}/>
        <Route path='/update/:id' element={<UpdateProduct/>}/>
        <Route path='/profile' element={<Profile/>}/>
        </Route>
        
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      </BrowserRouter>
      <footer id="Footer" className={isFooterVisible ? 'Footer-visible' : 'Footer-hidden'}>
        <Footer/>
      </footer>
    </div>
  );
}

export default App;
