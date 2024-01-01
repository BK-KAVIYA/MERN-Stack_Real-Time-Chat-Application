import React,{useState,useEffect} from "react";
import styled from "styled-components";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import axios from "axios";
import { getAllMessagesRoute, sendMessageRoute } from "../utils/APIRoutes";
import { set } from "mongoose";
import { use } from "../../../server/routes/userRoutes";


export default function ChatContainer({currentChat,currentUser,socket}) {

    const [messages, setMessages] = useState([]);
    const [arivalMsg, setArivalMsg] = useState(null);

    useEffect(() => {
        const fetchData = async () => {

            const response = await axios.post(getAllMessagesRoute,{
                from: currentUser._id,
                to: currentChat._id,
            });
            console.log(response.data);
            setMessages(response.data);
        };
      
        fetchData();
      }, [currentUser]);
    

    const handleSendMsg = async (msg) => {
        await axios.post(sendMessageRoute,{
            from: currentUser._id,
            to: currentChat._id,
            message: msg,
        });
        socket.current.emit("send-msg", {
            from: currentUser._id,
            to: currentChat._id,
            message: msg,
        });

        const msgs= [...messages];
        msgs.push({
            fromSelf: true,
            message: msg,
        });
        setMessages(msgs);
    }

    useEffect(() => {
        if(socket.current){
            socket.current.on("msg-receive", (msg) => {
                setArivalMsg({
                    fromSelf: false,
                    message: msg,
                });
            });
        }
      }, []);


    useEffect(() => {
            arivalMsg && setArivalMsg((prev)=>[...prev,arivalMsg]);
      }, [arivalMsg]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"});
      }, []);
    return( 
        <>
        {
            currentChat && (
            <Container>
            <div className="chat-header">
                <div className="user-details">
                    <div className="avatar">
                    <img src={`data:image/svg+xml;base64,${currentChat.avataraImage}`} alt="avatar" />
                    </div>
                    <div className="username">
                        <h3>{currentChat.username}</h3>
                    </div>
                </div>
                <Logout />
            </div>
            <div className="chat-messages">
                {
                    messages.map((message)=>{
                        return(
                            <div>
                                <div className={`message ${message.fromSelf ? "sended" : "received"}`} >
                                    <div className="content">
                                        <p>{message.message}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <ChatInput handleSendMsg={handleSendMsg} />
        </Container>
            )
        }
        </>
     ) ;

}

const Container = styled.div`
    padding-top: 1rem;
    display: grid;
    grid-template-rows: 10% 65% 25%;
    gap: 1rem;
    overflow: hidden;
    @media screen and (min-width: 720px) and (max-width: 1080px){
        grid-template-rows: 15% 70% 15%;
      }
    .chat-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 2rem;
        .user-details{
            display: flex;
            align-items: center;
            gap: 1rem;
            .avatar{
                img{
                    width: 3rem;
                }
            }
            .username{
                h3{
                    color: white;
                }
            }
        }
    }
    .chat-messages{
        padding: 1rem 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow-y: auto;
        .message{
            display: flex;
            align-items: center;
            .content{
                max-width: 50%;
                overflow-wrap: break-word;
                padding: 0.5rem 1rem;
                border-radius: 1rem;
                color: #d1d1d1;
            }
        }
        .sended{
            justify-content: flex-end;
            .content{
                background-color: #4e00ff;
            }
        }
        .received{
            justify-content: flex-start;
            .content{
                background-color: #9900ff20;
            }
        }
    }

`;