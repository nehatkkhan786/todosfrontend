import React, { useContext } from 'react'
import mainContext from '../../ContextAndReducer/MainContext'

const DoneColumn = ({localTodos}) => {
    const {todos} = useContext(mainContext)
    
    const DoneTodo = localTodos?.filter(todo=>todo?.status === 'DONE' )
  return (
    <div className='bg-purple-300 p-4 rounded-md overflow-scroll scrollbar-hide' style={{ maxHeight: 600 }}>
    <div className='flex items-center gap-1 mb-4'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="green" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className='text-2xl text-black font-semibold'>Done</h3>
    </div>

    { DoneTodo?.length > 0 ? (
            <>
            {DoneTodo?.map((todo)=>{
                        return (
                            <div key={todo?.id} className='bg-white p-4 rounded-md shadow-md mb-3'>
                            <div className='flex justify-between mb-2'>
                                <h2 className='text-xl'>{todo?.title}</h2>
                                {todo?.created_at.toString().split('T')[0]}
                            </div>
                            {/* Todo Description */}
                            <p>{todo?.description}</p>

                            {/* Remarks, Priority, and Created By and */}
                            <div className='flex justify-between mt-4'>
                                    {/* Icon and Date */}
                                    <div className='flex gap-2 items-center'>
                                    
                                        <p>Completed at 26-06-2026</p>
                                        
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

export default DoneColumn