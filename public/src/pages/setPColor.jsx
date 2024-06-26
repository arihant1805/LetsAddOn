import React,{useState,useEffect} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/ReactToastify.css"
import axios from "axios";
import { setPRoute } from "../utils/APIRoutes";

function SetPColor() {
    const toastOptions={
        position:"bottom-right",
        autoClose: 8000,
        pauseOnHover:true,
        draggable:true,
        theme:"light",
    }
    const user = JSON.parse(localStorage.getItem('blog-app-user'))
    const navigate = useNavigate();

    useEffect(()=>{
        if(!localStorage.getItem('blog-app-user')){
            navigate("/login")
        }
    },[])
    
    const [PColor,setPPColor]=useState("");
    const setColor= async(event)=>{
        setPPColor();
            const { data }=await axios.post(setPRoute,{
                username:user.username,
                color:event.target.id
            });
            if(data.status===false){
                toast.error(data.msg,toastOptions);
            }
            if(data.status===true){
                data.user.PColor=event.target.id;
                localStorage.setItem('blog-app-user',JSON.stringify(data.user));
                navigate("/");
            }
    }
    
    return (<>
    <SelectContainer>
    <h1>Choose a color which depicts your personality best.</h1>
    <div id="choose">
        <div className="Color" id="black" onClick={e=>setColor(e)}>
        </div>
        <div className="Color" id="deepskyblue" onClick={e=>setColor(e)}>
        </div>
        <div className="Color" id="crimson" onClick={e=>setColor(e)}>
        </div>
        <div className="Color" id="lightpink" onClick={e=>setColor(e)}>
        </div>
        <div className="Color" id="gold" onClick={e=>setColor(e)}>
        </div>
        <div className="Color" id="white" onClick={e=>setColor(e)}>
        </div>
    </div>
    </SelectContainer>
    </>);
}

const SelectContainer = styled.div`
    height:100vh;
    width:100vw;
    display:flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    text-align:center;
    background-color:black;
    h1{
        color:white;
    }
    #choose{
        margin:2rem;
        display:flex;
        flex-direction: row;
        gap: 5vw;
    }
    .Color{
        border:.25vw solid gold;
        width:9vw;
        height:9vw;
        border-radius:50%;
        &:hover{
            border:.25rem solid orange;
            cursor:pointer
        }
    }
    #deepskyblue{
        background-color:deepskyblue;
    }
    #white{
        background-color:white;
    }
    #crimson{
        background-color:crimson;
    }
    #black{
        background-color:black;
    }
    #lightpink{
        background-color:lightpink;
    }
    #gold{
        background-color:gold;
    }
`;

export default SetPColor;