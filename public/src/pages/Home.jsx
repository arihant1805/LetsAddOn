import React, { useState,useEffect } from 'react';
import logo from '../assets/letsaddon.png';
import axios from "axios";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getPost } from '../utils/APIRoutes';
import Post from '../components/Post';

function Home(){
    const user = JSON.parse(localStorage.getItem('blog-app-user'))
    const navigate=useNavigate();
    const[posts,setPosts]=useState(null);
    const logOut=()=>{
      localStorage.clear();
      navigate("/");
    }
    useEffect(()=>{
      const getData = async()=>{
      const response= await fetch(getPost);
      const json=await response.json();
      setPosts(json.all);
      // console.log(posts)
  }
  getData();
  },[])
    if(localStorage.getItem('blog-app-user')){
    return (
    <MainPage>
        <header>
          <div className="Header">
            <img src={logo} width="10%" height="10%" alt="Let's add on logo"/>
            <div className="Headline">
            Let's add on
            </div>
          </div>
        </header>
        <div id="Posts">
          {posts && posts.map((po) => (
            <Post p={po} key={po._id}/>
          ))}
        </div>
        <div id="input">
          <button  id="logOut" onClick={logOut}>logOut</button>
          <button  id="addNew" onClick={()=>navigate("/newIdea")}>Add your thoughts</button>
        </div>
        <div className="PColor" style={{backgroundColor:user.PColor}} onClick={()=>{navigate("/setPColor")}}>
        </div>
    </MainPage>
  );}else{
    return(<>
    <HomeContainer>
    <div className="Header" onClick={()=>{navigate("/")}}>
      <img src={logo} alt="Let's Add On log"/>
      <div className="Headline">
            Let's add on
      </div>
    </div>
    <div className="discription">
      Welcome to <b>Let's add on</b> an anonomous site which provide you a platform where you can share your ideas without being judged. So what are you waiting for go on.
    </div>
    <div id='but'>
    <button onClick={()=>navigate("/Login")}>login</button>
    <button onClick={()=>navigate("/register")}>register</button>
    </div>
    </HomeContainer>
    </>);
  }
}
const HomeContainer=styled.div`
background-color:black;
color:white;
#but{
  display:flex;
  flex-direction: row;
  justify-content: center;
  gap:2rem;
  margin-bottom:5rem;
}
.discription{
  margin-left:20vw;
  margin-right:20vw;
  text-align: center;
  font-size: 1.75rem;
}
width:100vw;
height:100vh;
display:flex;
flex-direction: column;
justify-content: center;
gap: 5rem;
align-items: center;
button{
  height: 3rem;
  background-color:gold;
  color:black;
  padding: 1rem 2rem;
  border: none;
  font-weight: bold;
  cursor:pointer;
  border-radius:0.4rem;
  font-size:1.25rem;
  text-transform:uppercase;
  transition:0.1s ease-in-out;
      &: hover{
          
          background-color:orange;
      }
}
.Header{
  // top:0vw;
  // left:0;
  display: flex;
  align-items: center;
  // position:fixed;
  img{
    height:20vh;
  }
  &:hover{
    cursor:pointer;
  }
}
.Headline{
  font-weight: bold;
  padding-top: 15%;
  font-size: 3rem;
}
@media only screen and (max-width: 800px) {
  .discription{
    width:90vw;
    font-size:1.25rem;
  }
}
`;
const MainPage = styled.div`
width:100vw;
height:100vh;
#logOut{
  &:hover{background-color:red;}
  position:fixed;
  top:35vh;
  right:9vw;

}
#addNew{
    position:fixed;
    bottom:5vh;
    right:5vw;
}
.PColor{
    border:.2rem solid gold;
    position:fixed;
    top:10vh;
    right:8vw;
    height:10vw;
    border-radius:50%;
    width:10vw;
    &:hover{
      cursor:pointer;
    }
}
button{

    height: 3rem;
        background-color:gold;
        color:black;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor:pointer;
        border-radius:0.4rem;
        font-size:1rem;
        text-transform:uppercase;
        transition:0.5s ease-in-out;
            &: hover{
                
                background-color:aqua;
            }
}
.Header{
    top:0vw;
    border-left: 2vw;
    width: 100%;
    display: flex;
    align-items: center;
    position:fixed;
    font-weight: bold;
    background-color:black;
  }
  .Headline{
    color:white;
    padding-left: 0.6%;
    padding-top: 3%;
    font-size: 3rem;
    font-family: 'Glacial Indifference', sans-serif;
  }
  #Posts{
    width: 20;
    margin-bottom: 2vh;
    margin-top: 15vh;
    margin-left: 22.5vw;
  }
@media only screen and (max-width: 800px) {
  #Posts{
    margin-left:5vw;
    width: 100vw;
    margin:0;
    margin-top: 10vh;
  }
  .Header{
    top:0vw;
    border-left: 2vw;
    width: 100%;
    display: flex;
    align-items: center;
    position:fixed;
    font-weight: bold;
    img{
      width:15vw;
      height:15vw;
    }
  }
  .Headline{
    padding-left: 0.6%;
    padding-top: 3%;
    font-size: 2rem;
    font-family: 'Glacial Indifference', sans-serif;
  }
    #logOut{
        padding:.5rem;
        font-size: .5rem;
        font-align:center;
        height:3vh;
        width:15vw;
        position:fixed;
        top:4vh;
        right:15vw;
        
      }
    #addNew{
        position:fixed;
        width:90vw;
        bottom:0;
    }
    .PColor{
      border:.2rem solid gold;
      position:fixed;
      top:3vh;
      right:3vw;
      height:10vw;
      border-radius:50%;
      width:10vw;
      &:hover{
        cursor:pointer;
      }
    }
    }
overflow-x:hidden;
background-color:black;
`;
export default Home;
