import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

import mainContext from '../ContextAndReducer/MainContext'

const Navbar = () => {
const {dispatch, setUserDetail} = useContext(mainContext)
const navigate = useNavigate()

    const logoutHandler = () =>{
        localStorage.removeItem('user')
        setUserDetail(null)
        toast.success('User Logout Successfully')
        navigate('/login')

    }


  return (
    <div className="navbar bg-base-100">
    <div className="flex-1">
      <a className="btn btn-ghost normal-case text-xl">TODO</a>
    </div>
    <div className="flex-none gap-2">
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>

          </div>
        </label>
        <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-dark rounded-box w-52">
          <li onClick={()=>logoutHandler()}><a>Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
  )
}

export default Navbar