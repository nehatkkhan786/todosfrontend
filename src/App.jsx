import React, { useContext, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import mainContext from './ContextAndReducer/MainContext'
import Homepage from './pages/Homepage'
import Login from './pages/Login'


const App = () => {
  const {userDetail} = useContext(mainContext)
  const navigate = useNavigate()

  useEffect(()=>{
    if(!userDetail){
      navigate('/login')
    }
  }, [])
  return (
    <>
      <Routes>
       
            <Route path='/' exact element={<Homepage/>}/>
            <Route path='/login' element={<Login/>}/>
      </Routes>
    
    </>
  )
}

export default App