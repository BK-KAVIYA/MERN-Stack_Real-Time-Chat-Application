import React from "react";

import styled from "styled-components";
import Logo from "../assets/logo.svg";



function Register() {

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("You have registered!");
  }

  const handleChange = (event) => {

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
          <input type="password" placeholder="Confirm Password" name="confimPassword" onChange={(e)=>handleChange(e)}/>
          <button type="submit">Register</button>
          <span>Already have an account? <a href="/login">Login</a></span>
        </form>
      </FormContainer>
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