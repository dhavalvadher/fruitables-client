import React, { useContext, useEffect } from 'react';
import Header from '../../user/component/Header/Header';
import Footer from '../../user/component/Footer/Footer';
import { Route, Routes } from 'react-router-dom';
import Home from '../../user/container/Home/Home';
import Shop from '../../user/container/Shop/Shop';
import Shop_Detail from '../../user/container/Shop_Detail/Shop_Detail';

import Checkout from '../../user/container/Checkout/Checkout';
import Testimonial from '../../user/container/Testimonial/Testimonial';
import Page from '../../user/container/Page/Page';
import Contact from '../../user/container/Contact/Contact';
import PrivateRoutes from '../PrivateRoutes/PrivateRoutes';
import Reviews from '../../user/container/Reviews/Reviews';
import Card from '../../user/container/Card/Card';
import { ThemeContext } from '../../context/ThemeContext';
// import Categories from '../../user/container/Categories/Categories';
import Login from '../../user/container/Login/Login';
import Register from '../../user/container/Register/Register';
import Chat from '../../user/container/Chat/Chat';
import AuthForm from '../../user/container/AuthForm/AuthForm';
import { useDispatch } from 'react-redux';
import { checkAuth } from '../../redux/slice/auth.slice';




function UserRoutes(props) {


    const themeContext = useContext(ThemeContext);
    console.log(themeContext);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkAuth())
      }, []);
    return (
        <div className={themeContext.theme}>
           
                <Header />
              
                <Routes>
                    <Route exact path="/" element={<Home />} />
                   
                    <Route exact path='/Shop/:id' element={<Shop_Detail />} />
                    <Route exact path='/Shop_Detail' element={<Shop_Detail />} />
                    <Route exact path='/Card' element={<Card />} />
                    
                    <Route element={<PrivateRoutes />}>
                    <Route exact path='/chackout' element={<Checkout />} />
                    </Route>
                    
                    <Route exact path='/Testimonial' element={<Testimonial />} />
                    <Route exact path='/Page' element={<Page />} />
                    <Route exact path='/Contact' element={<Contact />} />
                    <Route exact path='/Reviews' element={<Reviews />} />
                    <Route exact path="/Login" element={<Login />} />
                    <Route exact path="/Register" element={<Register />} />
                    <Route exact path="/Chat" element={<Chat />} />
                    <Route exact path="/Shop" element={<Shop />} />

                    <Route exact path="/authForm" element={<AuthForm />} />
                </Routes>
                <Footer />
           
        </div>
    );
}

export default UserRoutes;