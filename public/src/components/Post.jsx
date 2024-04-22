import styled from "styled-components";
import { likePost,getComment } from "../utils/APIRoutes"; 
import axios from "axios";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Post =({p})=>{
    const comments=p.Comment;
    const navigate=useNavigate();
    const [C,setC]=useState("white");
    const [liked,setLiked]=useState(0);
    const [likes,setLikes]=useState(p.likeCount);
    const addComment=()=>{
        localStorage.setItem('post',JSON.stringify(p));
        navigate("/addcomment");
    }
    const addLike=()=>{
        if(liked){
            setLiked(0);
            setLikes(likes-1)
            setC("white");
        }else{
        setLiked(1);
        setLikes(likes+1);
        setC("red");
        }
        const send=async()=>{
        const {data}= await axios.post(likePost,{
            _id:p._id,
            likes,
            liked
        }); 
        if(data.status===true){
            
        } 
        }
        send();
        
    }
    return (
    <PostContainer>
        <div className="sidepic" style={{backgroundColor:p.Pcolor}}>
        </div>
        <div className="Main">
            <div className="content">
            { p.content }
            </div>
            <div className="foot">
            <button onClick={addLike} style={{color:C}}>Likes {likes} </button>
            <button onClick={addComment}>add on</button>
            </div>
            <div id="comments">
            {comments.length>0 &&<b>Add on's:</b>}
            {comments && comments.map((c,index) => 
             (index<3 && <div key={index}>{c}</div>)

          )}
        </div>
        </div>
        
    </PostContainer>)
};
const PostContainer = styled.div`
margin-left:4vw;
#comments{
    color:white;
    text-align:right;
    margin-top:1rem;
    display:flex;
    flex-direction: column;
    gap:.5rem;
    margin-right:5%;
}
display:flex;
flex-direction: row;
width: 20;
.sidepic{
    margin-top:10vh;
    border: .1rem solid gold;
    border-radius:50%;
    width:2rem;
    height:2rem;
}
.Main{
    padding:2vw;
    border-bottom: .01vh solid gold;
}
.content{border-radius: 5%;
    margin: 2vw;
    border: .1vw;
    width: 40vw;
    border-bottom: .01vw solid ;
    background-color:#e6dc9518;
    padding: 3vw;
    font-size: 1.25rem;
    color:white;
    }
.foot{
    display:flex;
    flex-direction: row;
    gap:1rem;
    button{
        height: 3rem;
        background-color:gold;
        color:white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor:pointer;
        border-radius:0.4rem;
        font-size:1.25rem;
        text-transform:uppercase;
        transition:0.25s ease-in-out;
            &: hover{
                
                background-color:orange;
            }
    }
    justify-content: center;
}
@media only screen and (max-width: 800px) {
.content{
    height:10vh;
    width:75vw;
}
.Main{
    margin-left:1vw;
}
  }
`;
export default Post;