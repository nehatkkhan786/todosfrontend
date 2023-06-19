import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { BASE_URL } from '../../../constant'
import mainContext from '../../../ContextAndReducer/MainContext'

const EditModal = ({editTodo, closeModal, id}) => {
  const {userDetail, dispatch, localTodos, setLocalTodos} = useContext(mainContext)
  const todo = localTodos?.filter(todo=>todo?.id === id)
  const [title, setTitle] = useState('')
  const [description, setDiscription] = useState('')

  

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
        const response = await axios.put(`${BASE_URL}updateTodo/${todo[0].id}/`, {'title':title, 'description':description}, {
          headers :{
            'content-type': 'application/json', 
            'Authorization':`Bearer ${userDetail?.access}`
          }
        } )
        if(response.request.status === 200){
            dispatch({
              type:"UPDATE_TODO",
              payload:response?.data
             
            })
            const updatedTodo = localTodos?.map((todo)=>{
              if(todo?.id === response?.data?.id){
                return response?.data
              }else{
                return todo
              }
            })
            setLocalTodos(updatedTodo)
            toast.success('Todo Updated Successfully');
            window.my_modal_1.close();
        }
      
    } catch (error) {
      toast.error("Something went wrong!")
    }
  }
  useEffect(() => {
    if (todo?.[0] && !title && !description ) {
      setTitle(todo[0].title);
      setDiscription(todo[0].description);
      
    }
  }, [todo]);
  return (
    <>
   {/* Open the modal using ID.showModal() method */}
        {/* <button className="btn" onClick={()=>window.my_modal_1.showModal()}>open modal</button> */}
        <dialog id="my_modal_1" className="modal">
        <form method="dialog" className="modal-box" onSubmit={handleSubmit} >
            <h3 className="font-bold text-lg">Update Todo {todo?.[0]?.id}</h3>
            <div className='flex flex-col w-full items-center gap-4 mt-2'>
                <input type="text" required placeholder="Title" className="input input-bordered input-info w-full"
                 value={title} onChange={(e)=>setTitle(e.target.value)} />

                <textarea className="textarea textarea-info w-full" placeholder="Description"
                value={description} onChange={(e)=>setDiscription(e.target.value)} />
            </div>
            <div className="modal-action">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn" type='button' onClick={closeModal}>Close</button>
                <button className="btn" type='submit'>Update</button>
            </div>
        </form>
        </dialog>
        </>
  )
}

export default EditModal