import react from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Register from "./pages/register";
import Login from "./pages/login";
import Home from "./pages/Home";
import NewIdea from "./pages/NewIdea";
import SetPColor from "./pages/setPColor";
import AddComment from "./pages/addComment";

export default function App(){
  return <BrowserRouter>
  <Routes>
    <Route path="/register" element={<Register/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/" element={<Home/>}/>
    <Route path="/newIdea" element={<NewIdea/>}/>
    <Route path="/setPColor" element={<SetPColor/>}/>
    <Route path="/addComment" element={<AddComment/>}/>
  </Routes>
  </BrowserRouter>
}