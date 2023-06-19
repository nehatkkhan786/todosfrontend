import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
import mainContext from '../ContextAndReducer/MainContext'
import { BASE_URL } from '../constant'


const Login = () => {
    const {dispatch,userDetail, loading, setUserDetail} = useContext(mainContext)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    useEffect(()=>{
        if(userDetail){
            navigate('/')
        }
    }, [userDetail])


    const handleLogin = async (e) =>{
            
            e.preventDefault();
            try {
               const response = await axios.post(`${BASE_URL}login/`, {'username':username, 'password':password},{
                headers:{
                    'content-type': 'application/json'
                }
               })
               if (response.request.status === 200){
                localStorage.setItem('user', JSON.stringify(response?.data))
                setUserDetail(JSON.parse(localStorage.getItem('user')))
                toast.success('Successfully Login')
                navigate('/')
               }
            } catch (error) {
                toast.error('Something went wrong!')  
            }
    }

  return (
    <div className="relative flex flex-col justify-center h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-current rounded-md shadow-md lg:max-w-lg">
            <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase">Todo</h1>
            <form className="space-y-4" onSubmit={handleLogin} >
                <div>
                    <label className="label">
                        <span className="text-base label-text text-black">Username</span>
                    </label>
                    <input type="text" placeholder="Username" className="w-full input input-bordered input-info" value={username} onChange={(e)=>setUsername(e.target.value)} />
                </div>
                <div>
                    <label className="label">
                        <span className="text-base label-text text-black">Password</span>
                    </label>
                    <input type="password" placeholder="Enter Password"
                        className="w-full input input-bordered input-info"
                        value={password} onChange={(e)=>setPassword(e.target.value)}
                        />
                </div>
                <div className='flex justify-end'>
                    <button  type='submit' className="btn btn-primary self-end">Login</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login