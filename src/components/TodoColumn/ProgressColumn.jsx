import axios from 'axios'
import React, { useContext, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { BASE_URL } from '../../constant'
import mainContext from '../../ContextAndReducer/MainContext'
import EditModal from '../Content/Modals/EditModal'
import Loader from '../Loader'

const ProgressColumn = ({localTodos}) => {
    const {todos, userDetail, dispatch, updateTodoStatue,  setLocalTodos, loading} = useContext(mainContext)
    const [title, setTitle] = useState()
    const [description, setDiscription] = useState()
    const progress = localTodos?.filter((todo)=>todo?.status === 'TODO')
    const [editTodo, setEditTodo] = useState(null)

    const openModal = (id)=>{
        setEditTodo(id)
        window.my_modal_1.showModal()
       
    }
    const closeModal =()=>{
        setEditTodo(null)
        window.my_modal_1.close();  
    }
    const deleteTodoHandler = async (id) =>{
        try {
            const response = await axios.post(`${BASE_URL}deleteTodo/${id}/`, {
                headers :{
                    'content-type': 'application/json',
                    'Authorization' : `Bearer ${userDetail?.access}`
                }
            })
            if(response?.request.status === 200) {
                dispatch({
                    type:"DELTE_TODO",
                    payload: id
                })
                const updateTodo = localTodos.filter((todo)=>todo?.id !== id) 
                setLocalTodos(updateTodo)
                toast.success('Todo Deleted Successfully')
            }
        } catch (error) {
            toast.error('Something Went Wrong!')
        }
       
    }


  return (
    <div className='bg-blue-300 p-4 rounded-md h-[300] overflow-scroll scrollbar-hide' style={{ maxHeight: 600 }}>
                    <div className='flex items-center gap-1 mb-4'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="gold" viewBox="0 0 24 24"  className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.867 19.125h.008v.008h-.008v-.008z" />
                        </svg>
                        <h3 className='text-2xl text-black font-semibold'>Todo</h3>
                    </div>
                    {progress?.map((todo)=>{
                        return (
                            <div key={todo?.id} className='bg-white p-4 rounded-md shadow-md mb-3 '>
                            <div className='flex justify-between mb-2'>
                                <h2 className='text-xl'>{todo?.title}</h2>
                                <div className='flex gap-2'>
                                    <svg onClick={()=>openModal(todo?.id)}  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                    </svg>
                                    <svg onClick={()=>deleteTodoHandler(todo?.id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>

                                </div>
                            </div>
                            {/* Todo Description */}
                            <p>{todo?.description}</p>

                            {/* Remarks, Priority, and Created By and */}
                            <div className='flex justify-between mt-4'>
                                    {/* Icon and Date */}
                                    <div className='flex gap-2 items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                        </svg>
                                        {/* <p>26-06-2026</p> */}
                                        {todo?.created_at.toString().split('T')[0]}
                                    </div>

                                    {/* Priority and Created By */}
                                    <div className='flex items-center gap-2'>

                                     
                                           
                                                <div className="badge cursor-pointer" onClick={()=>updateTodoStatue(todo?.id, userDetail?.access, 'DONE')}>Mark As Done</div>
                                                <div className="badge cursor-pointer" onClick={()=>updateTodoStatue(todo?.id, userDetail?.access, 'REVIEW')}>Mark Under Review</div>
                                           
                                     
                                       
                                        
                                        {/* <p>Salman Khan</p> */}
                                    </div>
                            </div>

                    </div>
                        )
                    })}
                    <EditModal closeModal={closeModal} id={editTodo} key={editTodo?.id}/>
                </div>
  )
}

export default ProgressColumn