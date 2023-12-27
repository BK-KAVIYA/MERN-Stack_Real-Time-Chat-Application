import React,{useState,useEffect} from "react";

import styled from "styled-components";
import Logo from "../assets/logo.svg";
import {ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registreRoute } from "../utils/APIRoutes";
import { Navigate, useNavigate } from "react-router-dom";
//import { set } from "mongoose";



function Register() {
  const navigate=useNavigate();

  const [values, setValues] = useState({
    username: "",
    email:"",
    password:"",
    confirmPassword:"",
  });

  const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme:"dark",
  }

  useEffect(() => {
    if(localStorage.getItem('chat-app-user')){
      navigate ("/");
    }
  }, []); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(handleValidation()){
      const {password,confirmPassword,username,email} = values;
      const {data} = await axios.post(registreRoute,{username,email,password});
      if(data.status === true){
        localStorage.setItem('chat-app-user',JSON.stringify(data.user));
        toast.success(
          "Registered successfully! Please login to continue",
          toastOptions
          );
          navigate ("/");
      }
      if(data.status === false){
        toast.error(
          data.message,
          toastOptions
          );
      }
      
    }
  }
  
  

  const handleValidation = () => {
    const {password,confirmPassword,username,email} = values;
    if(password !== confirmPassword){
      toast.error(
        "Passwords and confirm password should be same!",
        toastOptions
        );
        return false;
    }else if(username.length < 3){
      toast.error(
        "Username should be atleast 3 characters long!",
        toastOptions
        );
        return false;
    }else if(password.length < 8){
      toast.error(
        "Password should be atleast 8 characters long!",
        toastOptions
        );
        return false;
    }else if(email===""){
        toast.error(
          "Email should not be empty!",
          toastOptions
          );
          return false;
      }
    
    return true;
  }

  const handleChange = (event) => {
      setValues({...values,[event.target.name]:event.target.value});
  }
  return (
    <>
      <FormContainer>
        <form onSubmit={(event)=>handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>Chatty</h1>
          </div>
          <input type="text" placeholder="Username" name="username" onChange={(e)=>handleChange(e)}/>
          <input type="email" placeholder="Email" name="email" onChange={(e)=>handleChange(e)}/>
          <input type="password" placeholder="Password" name="password" onChange={(e)=>handleChange(e)}/>
          <input type="password" placeholder="Confirm Password" name="confirmPassword" onChange={(e)=>handleChange(e)}/>
          <button type="submit">Register</button>
          <span>Already have an account? <a href="/login">Login</a></span>
        </form>
      </FormContainer>
      <ToastContainer/>
      
    </>);
}

const FormContainer = styled.div`
height: 100vh;
width : 100vw;
display: flex;
justify-content: center;
flex-direction: column;
gap: 1rem;
align-items: center;
background-color: #131324;
.brand{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  img{
    height: 5rem;
  }
  h1{
    color: white;
    text-transform: uppercase;
  }
  
}
form{
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #00000076;
  border-radius: 2rem;
  padding: 3rem 5rem;
  input{
    padding: 1rem;
    border-radius: 0.4rem;
    border: 0.1rem solid #4e0eff;
    background-color: transparent;  
    color: white;
    width: 100%;
    font-size: 1.2rem;
    outline: none;
    &:focus{
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button{
    padding: 1rem;
    border-radius: 0.4rem;
    border: 0.1rem solid #4e0eff;
    background-color: #4e0eff;
    color: white;
    font-size: 1.2rem;
    outline: none;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover{
      background-color: #997af0;
    }
  }
  span{
    color: white;
    text-align: center;
    text-transform: uppercase;
    a{
      color: #4e0eff;
      text-decoration: none;
      text-transform: none;
      text-decoration: none;
      &:hover{
        text-decoration: underline;
      }
    }
  }
}

`;

export default Register;