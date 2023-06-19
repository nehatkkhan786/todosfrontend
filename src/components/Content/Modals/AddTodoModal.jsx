import React, { useContext, useState } from 'react'
import { BASE_URL } from '../../../constant'
import mainContext from '../../../ContextAndReducer/MainContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import Loader from '../../Loader'

const AddTodoModal = () => {
  const {userDetail, dispatch, localTodos, setLocalTodos, loading, setLoading} = useContext(mainContext)
  const [title, setTitle] = useState('')
  const [description, setDiscription] = useState('')
  

  const handleSubmit = async (e)=>{
    e.preventDefault();
    setLoading(true)
    try {
        const response = await axios.post(`${BASE_URL}todos/`, {'title':title, 'description':description}, {
          headers :{
            'content-type': 'application/json', 
            'Authorization':`Bearer ${userDetail?.access}`
          }
        } )
        if(response.request.status === 200){
            dispatch({
              type:'ADD_TODOS', 
              payload:response?.data,
            })
            setLocalTodos((prevState)=>[response?.data, ...prevState])
            toast.success('Todo Created Successfully');
            setTitle('');
            setDiscription('');
            setLoading(false)
            window.add_todo.close();
        }
      
    } catch (error) {
      toast.error("Something went wrong!")
      setLoading(false)
    }
  }
  return (
    <>
   {/* Open the modal using ID.showModal() method */}
        {/* <button className="btn" onClick={()=>window.my_modal_1.showModal()}>open modal</button> */}
        <dialog id="add_todo" className="modal">
        <form method="dialog" className="modal-box bg-slate-600" onSubmit={handleSubmit}>
            <h3 className="font-bold text-lg">Add Todo</h3>
            <div className='flex flex-col w-full items-center gap-4 mt-2'>
                <input type="text" required placeholder="Title" className="input input-bordered input-info w-full"
                 value={title} onChange={(e)=>setTitle(e.target.value)} />

                <textarea className="textarea textarea-info w-full" placeholder="Description"
                value={description} onChange={(e)=>setDiscription(e.target.value)} />
            </div>
            <div className="modal-action">
                {/* if there is a button in form, it will close the modal */}
                {loading ? <Loader/> : (
                  <>
                    <button className="btn" type='button' onClick={()=>window.add_todo.close()}>Close</button>
                    <button className="btn" type='submit'>Add</button>  
                  </>
                )}
            </div>
        </form>
        </dialog>
        </>
  )
}

export default AddTodoModal