import React from "react";
import Nav from "./Nav";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from './Footer';
import SignUp from "./SignUp";
import PrivateComponent from "./PrivateComponent";
import LogIn from "./LogIn";
import AddProduct from "./AddProduct";
import ProductList from "./ProductList";
import UpdateProduct from "./UpdateProduct";
import Profile from "./Profile";
import UpdateProfile from "./UpdateProfile";

function App() {
   return (<div>
      <BrowserRouter>
         <Nav />
         <Routes>
            <Route element={<PrivateComponent/>}>
               <Route path="/" element={<ProductList/>} />
               <Route path="/addproduct" element={<AddProduct/>} />
               <Route path="/updateproduct/:id" element={<UpdateProduct/>} />
               <Route path="/logout" element={<h1>logout page</h1>} />
               <Route path="/profile" element={<Profile/>}/>
               <Route path="/profile/:id" element={<UpdateProfile/>} />
            </Route>
            <Route path="/login" element={<LogIn />}/>
            <Route path="/signup" element={<SignUp />} />

         </Routes>
         <Footer />

      </BrowserRouter>
   </div>);
}
export default App;