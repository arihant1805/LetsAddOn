import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import logo from "../assets/logo (2).png";
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/ReactToastify.css"
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";

function Register() {
    const navigate= useNavigate();
    const [values,setValues]=useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:"",
    });
    const toastOptions={
        position:"bottom-right",
        autoClose: 8000,
        pauseOnHover:true,
        draggable:true,
        theme:"light",
    }
    const handleSubmit= async (event)=>{
        event.preventDefault();
        if(handleValidation()){
            const {password,username, email}=values;
            const { data }=await axios.post(registerRoute,{
                username,
                email,
                password,
            });
            if(data.status===false){
                toast.error(data.msg,toastOptions);
            }
            if(data.status===true){
                localStorage.setItem('blog-app-user',JSON.stringify(data.user));
                navigate("/setPColor");
            }
            
        }
        
        
    };

    const handleValidation=()=>{
        const {password,confirmPassword,username,email}=values;
        if(password!==confirmPassword){
            toast.error("password and confirm password should be same.",toastOptions);
            return false;
        }else if(username.length<3){
            toast.error("Username should be greater than 3 characters",toastOptions);
            return false;
        }else if(password.length<8){
            toast.error("Password should be greater than 8 characters",toastOptions);
            return false;
        }else if(email===""){
            toast.error("Email is required",toastOptions);
            return false;
        }
        return true;
    };

    const handleChange=(event)=>{
        setValues({...values,[event.target.name]:event.target.value});
    };

    return (
        <>
        <FormContainer>
            <form onSubmit={(event)=>handleSubmit(event)}>
                <div className="brand">
                    <img src={logo} alt="Logo"/>
                    <h1>Let's Add On</h1>
                </div>
                <input 
                type="text" 
                placeholder="Username" 
                name="username" 
                onChange={e=>handleChange(e)}
                />
                <input 
                type="email" 
                placeholder="Email" 
                name="email" 
                onChange={e=>handleChange(e)}
                />
                <input 
                type="password" 
                placeholder="Password" 
                name="password" 
                onChange={e=>handleChange(e)}
                />
                <input 
                type="password" 
                placeholder="Confirm Password" 
                name="confirmPassword" 
                onChange={e=>handleChange(e)}
                />
                <button type="submit">Create</button>
                <span>
                    Already have an account?  <Link to="/login">Login</Link>
                    </span>
            </form>
        </FormContainer>
        <ToastContainer/>
        </>
    );
}
const FormContainer = styled.div`
    height:100vh;
    width:100vw;
    display:flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: black;
    .brand{
        display:flex;
        align-items:center;
        gap:1rem;
        justify-content:center;
        img{
           
            height: 5rem;
        }
        h1{
            color:Black;
            
        }
    }
        form {
            display:flex;
            flex-direction:column;
            gap:2rem;
            background-color:white;
            border-radius: 2rem;
            padding: 3rem 5rem;
            input{
                background-color: transparent;
                padding: 1rem;
                border:0.1rem solid gold;
                border-radius: 0.4rem;
                color:#010101;
                width 100%;
                font-size: 1rem;
                &:focus{
                    border: .15rem solid rgba(255, 180, 0);
                    outline:none;
                }
            } 
            button{
                height: 3rem;
                background-color:gold;
                color:white;
                padding: 1rem 2re,;
                border: none;
                font-weight: bold;
                cursor:pointer;
                border-radius:0.4rem;
                font-size:1rem;
                text-transform:uppercase;
                transition:0.5s ease-in-out;
                &: hover{
                    
                    background-color:rgba(255, 170, 0, 0.695);
                }
            }
            span{
                color:black;
                text-transform: uppercase;
                a {
                    text-decoration: none;
                    font-weight:bold;
                }
            }
        }
`;
export default Register;