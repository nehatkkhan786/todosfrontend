import React, { useContext } from 'react'
import mainContext from '../../ContextAndReducer/MainContext'
import Loader from '../Loader'

const ReviewColumn = ({localTodos}) => {
    const {userDetail, todos, updateTodoStatue, loading} = useContext(mainContext)
    const ReviewTodo = localTodos?.filter((todo)=>todo?.status === 'REVIEW')

  return (
    <div className='bg-pink-100 p-4 rounded-md overflow-scroll scrollbar-hide' style={{ maxHeight: 600 }}>
    <div className='flex items-center gap-1 mb-4'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="purple" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
        </svg>
        <h3 className='text-2xl text-black font-semibold'>Review</h3>
    </div>

    { ReviewTodo?.length > 0 ? (
            <>
            {ReviewTodo?.map((todo)=>{
                        return (
                            <div key={todo?.id} className='bg-white p-4 rounded-md shadow-md mb-3'>
                            <div className='flex justify-between mb-2'>
                                <h2 className='text-xl'>{todo?.title}</h2>
                                {/* <svg onClick={()=>window.my_modal_1.showModal()}  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                </svg> */}
                            </div>
                            {/* Todo Description */}
                            {/* <p>{todo?.description}</p> */}

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
                                        <div className="badge cursor-pointer bg-green-800 text-white" onClick={()=>updateTodoStatue(todo?.id, userDetail?.access, 'DONE')}>Mark As Done</div>
                                    
                                    </div>
                            </div>

                    </div>
                        )
                    })}
            </>
    ) : 
    (
        <div className='bg-white p-4 rounded-md shadow-md'>
            <div className='flex justify-between mb-2'>
                <h2 className='text-xl'>No Task to Review</h2>
            </div>
        </div>
    )
    }

    
</div>
  )
}

export default ReviewColumn