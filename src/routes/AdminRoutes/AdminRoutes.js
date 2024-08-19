import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Products from '../../admin/container/Products/Products';
import Layout from '../../admin/component/Layout/Layout';
import Reviews from '../../admin/container/Reviews/Reviews';
import Category from '../../admin/container/Category/Category';
// import { Provider } from 'react-redux';
// import { configstore } from '../../redux/store';
import Conter from '../../admin/container/Counter/Conter';
import Facility from '../../admin/container/Facility/Facility';
import Coupon from '../../admin/container/Coupon/Coupon';
import Contact from '../../admin/container/Contact/Contact';
import Subcategory from '../../admin/container/Subcategory/Subcategory';
import Variants from '../../admin/container/Variants/Variants';
import Salespeople from '../../admin/container/Salespeople/Salespeople';






function AdminRoutes(props) {
  
    return (
        <div>
            
            <Layout>
                <Routes>
                    <Route exact path="/Products" element={<Products />} />
                    <Route exact path="/Reviews" element={<Reviews />} />
                    <Route exact path="/Category" element={<Category/>}/>
                    <Route exact path="/Subcategory" element={<Subcategory/>}/>
                    <Route exact path="/Variants" element={<Variants/>}/>
                    <Route exact path="/Counter" element={<Conter/>}/>
                    <Route exact path="/Facility" element={<Facility/>}/>
                    <Route exact path="/Coupon" element={<Coupon/>}/>
                    <Route exact path="/Contact" element={<Contact/>}/>
                    <Route exact path="/Salespeople" element={<Salespeople/>}/>
                </Routes>
            </Layout>
         
        </div>
    );
}

export default AdminRoutes;


