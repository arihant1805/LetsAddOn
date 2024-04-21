import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/ReactToastify.css"
import axios from "axios";
import { newIdeaRoute } from "../utils/APIRoutes";

function NewIdea() {
    const user = JSON.parse(localStorage.getItem('blog-app-user'));
    const navigate=useNavigate();
    const toastOptions={
        position:"bottom-right",
        autoClose: 8000,
        pauseOnHover:true,
        draggable:true,
        theme:"light",
    }
    const [idea,setIdea]=useState("");
    const handleChange=(event)=>{
        setIdea(event.target.value);
        
    };
    const handleSubmit= async (event)=>{
        if(idea==="")navigate("/");
        else{event.preventDefault();
        const Col=user.PColor;
        if(handleValidation()){
            const {data}=await axios.post(newIdeaRoute,{
                idea:idea,
                Col:Col,
            });
            if(data.status===false){
                toast.error(data.msg,toastOptions);
            }
            if(data.status===true){
                navigate("/");
            }
        }}  
    };
    const handleValidation=()=>{
        if(idea.length>50){
            toast.error("Idea length should be less than 50 character.",toastOptions);
            return false;
        }
        return true;
    };
    return (<>
    <FormContainer>
    <form onSubmit={(event)=>handleSubmit(event)}>
    <input 
        size="1000"
        type="text" 
        placeholder="Write your Today's idea here." 
        name="content" 
        onChange={e=>handleChange(e)}
        />
    <button type="submit">Let's add</button>
    </form>
    
    </FormContainer>
    <ToastContainer/>
    </>);
}

const FormContainer = styled.div`
height:100vh;
width:100vw;
display:flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: rgba(255, 170, 0, 0.6);
form {
    align-items:center;
    display:flex;
    flex-direction:column;
    gap:2rem;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input{
        width:50vw;
        background-color: white;
        padding: 3rem;
        border:0.1rem solid gold;
        border-radius: 0.5rem;
        color:#010101;
        width 100%;
        font-size: 1.5rem;
        &:focus{
            border: .2rem solid orange;
            outline:none;
        }
        @media only screen and (max-width:800px) {
        font-size:1rem;
        padding:2rem;
        width:70vw;
        }
    }
    button{
        width:25vw;
        height: 4rem;
        background-color:orange;
        color:white;
        padding: 1rem;
        border: 0.01rem solid grey;
        font-weight: bold;
        cursor:pointer;
        border-radius:0.4rem;
        font-size:1rem;
        font-size:2rem;
        transition:0.5s ease-in-out;
        &: hover{
            background-color:gold;
        }
        @media only screen and (max-width:800px) {
            font-size:1rem;
            width:60vw;
            }
    } 
    
`;
export default NewIdea;