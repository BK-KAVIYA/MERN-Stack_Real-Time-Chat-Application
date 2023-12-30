import React,{useState,useEffect} from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import { constants } from "buffer";

export default function Contacts({contacts,currentUser}) {    
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);

    useEffect(() => {
        if(currentUser){
            console.log(contacts);
            setCurrentUserName(currentUser.username);
            setCurrentUserImage(currentUser.avataraImage);
        }
    }, [currentUser]);
    const changeCurrentChat = (index,contact) => {};
    return (
        <>
           {
                currentUserImage && currentUserName &&(
                    
                    <Container>
                        <div className="brand">
                            <img src={Logo} alt="logo" />
                            <h3>Chatty</h3>
                        </div>
                        <div className="contacts">
                            {
                                contacts.map((contact,index)=>{
                                    return(
                                        <div className={`contact ${index===currentSelected ? "selected" : ""}`} key={index}>
                                            <div className="avatar">
                                                <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar" />
                                            </div>
                                            <div className="username">
                                                <h3>{contact.username}</h3>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="current-user">
                            <div className="avatar">
                                <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar" />
                            </div>
                            <div className="username">
                                <h1>{currentUserName}</h1>
                            </div>
                        </div>
                    </Container>
                )
           }
        </>
    )
}

const Container = styled.div`
display:grid;
grid-template-rows:10% 75% 15%;
overflow:hidden;
background-color:#080420;
.brand{
    display:flex;
    justify-content:center;
    align-items:center;
    gap:1rem;
    img{
        height:2rem;
    }
    h3{
        color:white;
     
    }
}
    .contacts{
        display:flex;
        flex-direction:column;
        align-items:center;
        overflow:auto;
        gap:0.8rem;
        .contact{
            background-color:#ffffff39;
        }
    }

`;