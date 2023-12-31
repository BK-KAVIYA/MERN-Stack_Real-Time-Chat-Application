import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {BiPowerOff} from "react-icons/bi";


export default function Logout() {
    const navigate=useNavigate();
    const handleClick = async () => {
        localStorage.removeItem('chat-app-user');
        navigate("/login");
    }
    return (
        <Button onClick={handleClick}>
            <BiPowerOff/>
        </Button>
    );
    }

const Button = styled.button`
    background-color: transparent;
    border: none;
    color: white;
    font-size: 1.5rem;
    padding: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover{
        color: #4e00ff;
    }
   `;