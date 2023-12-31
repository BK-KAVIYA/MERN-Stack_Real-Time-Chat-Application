import React,{useState} from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react"
import {IoMdSend} from "react-icons/io";
import {BsEmojiSmileFill} from "react-icons/bs";


export default function ChatInput({handleSendMsg}) {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);  
    const [msg, setMsg] = useState("");

    const handleEmojiPckerHideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    }

    const handleEmojiClick = (emojiObject,event) => {
        setMsg(msg+emojiObject.emoji);
    }

    const sendChat = (e) => {
        e.preventDefault();
        if(msg.length>0){
            handleSendMsg(msg);
            setMsg("");
        }
    }
    return (   
        <Container>
            <div className="button-container">
                <div className="emoji">
                    <BsEmojiSmileFill onClick={handleEmojiPckerHideShow}/>
                    {
                        showEmojiPicker && <Picker onEmojiClick={handleEmojiClick}/>
                    }
                </div>
            </div>
            <form className="input-container" onSubmit={(e)=>sendChat(e)}>
                <input type="text" placeholder="Type a message hear" value={msg} onChange={(e)=>setMsg(e.target.value)}/>
                <button className="submit">
                    <IoMdSend/>
                </button>
            </form>
        </Container>
    );
    }
    const Container = styled.div`
    display: grid;
    grid-template-columns: 5% 95%;
    align-items: center;
    background-color: #080420;
    padding: 0 2rem;
    padding-bottom: 0.3rem;
    .button-container{
        display: flex;
        justify-content: center;
        color: white;
        gap: 1rem;
        .emoji{
            position: relative;
            svg{
                font-size: 1rem;
                color: #ffff00c8;
                cursor: pointer;
            }
            .EmojiPickerReact{
                position: absolute;
                top: -500px;
                background-color: #080420;
                box-shadow: 0 5px 10px #9a86f3;
                border-color: #9a86f3;
                .emoji-scroll-wrapper::-webkit-scrollbar{
                    background-color: #080420;
                    width: 5px;
                    &-thumb{
                        background-color: #9186f3;
                        border-radius: 1rem;
                        width: 5px;
                    }
                }
                .epr-emoji-category-label{
                    background-color: #080420;
                    color: white;
                }
                .imoji-search{
                    background-color: #080420;
                    input{
                        background-color: #ffffff34;
                        color: white;
                        &::placeholder{
                            color: white;
                        }
                    }
                }
                .imoji-category{
                    button{
                        background-color: transparent;
                        border: none;
                        color: white;
                        font-size: 1.5rem;
                        cursor: pointer;
                        transition: all 0.3s ease-in-out;
                        &:hover{
                            color: #4e00ff;
                        }
                    }
                }
                .imoji{
                    font-size: 1.5rem;
                    color: #ffff00c8;
                    cursor: pointer;
                }
            }
        }
    }
    .input-container{
        width: 100%;
        border-radius: 2rem;
        display: flex;
        align-items: center;
        gap: 2rem;
        background-color: #ffffff34;
        input{
            width: 100%;
            height: 60%;
            background-color: transparent;
            border: none;          
            color: white;
            padding-left: 1rem;
            font-size: 1.2rem;
            &::slection{
                background-color: #9186f3;
            }
            &:focus{
                outline: none;
            }
        }
        button{
            background-color: transparent;
            border-radius: 2rem;
            padding: 0.3rem 0.5rem;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            transition: all 0.3s ease-in-out;
            &:hover{
                color: #4e00ff;
            }
        }
    }
    `;
