import React, { useContext, useEffect } from "react";
import MainContainer from "../components/Content/MainContainer";
import Header from "../components/Header/Header";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../components/Navbar";
import mainContext from "../ContextAndReducer/MainContext";

import axios from 'axios'
import { BASE_URL } from "../constant";


const Homepage = () => {
  const { dispatch, setLocalTodos,userDetail} = useContext(mainContext)

  const getTodos = async (access_token) =>{
    const {data} = await axios.get(`${BASE_URL}todos/`, {
      headers: {
        'content-type': 'application/json',
        'Authorization' : `Bearer ${access_token}`
      }
    })
    dispatch({
      type:'GET_TODOS', 
      payload:data
    })
    setLocalTodos(data)
  }

  useEffect(()=>{
    if(userDetail){
        getTodos(userDetail?.access);
    }
  }, [userDetail])

  return (
    <>
    <Navbar/>
      {/* <Header /> */}
      <div className="container mx-auto px-10">
        <MainContainer />
      </div>
      <div></div>
    </>
  );
};

export default Homepage;
