import React,{useState,useEffect} from "react";

import styled from "styled-components";
import loader from "../assets/loader.gif";
import {ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";

export default function SetAvatar() {
    const api='https://api.multiavatar.com/45678945';
    const navigate=useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isloading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);


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
        if(!localStorage.getItem('chat-app-user')){
            navigate ("/login");
          }
      },[]);
      const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
          toast.error(
            "Please select an avatar",
            toastOptions
          )
        }else{
            const user=await JSON.parse(localStorage.getItem('chat-app-user'));
            const {data} = await axios.post(`${setAvatarRoute}/${user._id}`,{image:avatars[selectedAvatar]});

            if(data.isSet){
                user.isAvatarImageSet=true;
                user.avatarImage=data.image;
                localStorage.setItem('chat-app-user',JSON.stringify(user));
                navigate("/");
                }else{
                    toast.error(
                        "Something went wrong!",
                        toastOptions
                      )
                }
        }
      };
      useEffect(() => {
        const fetchData = async () => {
          const fetchedAvatars = [];
          try {
            for (let i = 0; i < 4; i++) {
              const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
              const buffer = Buffer.from(image.data, 'binary').toString('base64');
              fetchedAvatars.push(buffer);
              // Introduce a longer delay between requests (for example, 2 seconds)
              await new Promise(resolve => setTimeout(resolve, 2000));
            }
            setAvatars(fetchedAvatars);
            setIsLoading(false);
          } catch (error) {
            // Handle errors here
          }
        };
      
        fetchData();
      }, []);
      
      
      
      
    return (
        <>
        {
            isloading ?<Container>
                <img className="loader" src={loader} alt="loader" />
            </Container> : (

         
            <Container>
                <div className="title-container">
                    <h1>Pick an avatar as your profile picture</h1>
                </div>
                <div className="avatars">
                    {avatars.map((avatar,index)=>{
                        return(
                            <div key={index} className={`avatar ${selectedAvatar === index ? "selected" : ""}`} >
                                <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" onClick={()=>setSelectedAvatar(index)} />
                            </div>    
                        )
                    })
                }</div>
                <button className="submit-btn" onClick={setProfilePicture}>Set a Profile Picture</button>
            </Container>
               )
            }
            <ToastContainer/>
        </>
    )
    
    }


    const Container=styled.div`
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        gap:3rem;
        background-color:#131324;
        height:100vh;
        width:100vw;
        .loader{
            max-inline-size: 100%;
        }
        .title-container{
            h1{
                color:white;
                text-align:center;
            }
        }
        .avatars{
            display:flex;
            gap:2rem;
            .avatar{
                border:0.4rem solid transparent;
                padding:0.4rem;
                border-radius:5rem;
                display:flex;
                justify-content:center;
                align-items:center;
                transition:all 0.5s ease-in-out;
                img{
                    height:6rem;
                    cursor:pointer;
                }
            }
            .selected{
                border:0.4rem solid #4e0eff;
            }
        }
        .submit-btn{
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
        `;
