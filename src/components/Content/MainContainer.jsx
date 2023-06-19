import React, { useContext, useState } from 'react'
import mainContext from '../../ContextAndReducer/MainContext'
import DoneColumn from '../TodoColumn/DoneColumn'
import ProgressColumn from '../TodoColumn/ProgressColumn'
import ReviewColumn from '../TodoColumn/ReviewColumn'
import ContainerHeaders from './ContainerHeaders'
import AddTodoModal from './Modals/AddTodoModal'


const MainContainer = () => {  
  const {todos,  setQuery, localTodos, setLocalTodos, setSelectPeriod, setFilDate} = useContext(mainContext)
  

  const handleDateFilter = (event) =>{  
      const date = event.target.value
      setFilDate(date)
      console.log(date)

      if(date === ''){
        setLocalTodos(todos)
      }else{
        const fildata = todos.filter((todo)=>{
          const todoDate = new Date(todo?.created_at).toISOString().split('T')[0];
          return todoDate === date
        })
        setLocalTodos(fildata)
      }

  }
 

  const handleSearch = (e) => {
    let q = e.target.value.toLowerCase()
    setQuery(q)
    if (q === ''){
      setLocalTodos(todos)
    }else {
      const newLocalNewTodos = todos?.filter((item)=>{
        return item?.title.toLowerCase().includes(q)  
      });
      setLocalTodos(newLocalNewTodos)
    }  
  };

  const handleSelectPeriod = (event) =>{
    const period = event.target.value
    setSelectPeriod(period)
    
    if(period == 0 ){
      setLocalTodos(todos)
    }else{
      const currentData = new Date();
      const filDate = new Date(currentData.getTime() -  period * 24 * 60 * 60 * 1000 )
      const filteredData = todos.filter(todo=>new Date(todo.created_at) >= filDate)
      setLocalTodos(filteredData)
      console.log(filteredData)
    }
  }
  return (
    <>
    <div className=' flex flex-col container mt-10  mx-auto ' >
            <ContainerHeaders handleSearch={handleSearch} handleSelectPeriod={handleSelectPeriod} handleDateFilter={handleDateFilter}/>
            <div className='flex justify-end mt-4 '>
                <button onClick={()=>window.add_todo.showModal()} className="btn btn-primary">Add Todo</button>
            </div>
            <div className='grid grid-cols-3 items-start gap-6 mt-4 overflow-y-auto'>
               
                {/* grid 1 */}
                <ProgressColumn localTodos={localTodos}/>
        
                {/* Grid 2 */}
                <ReviewColumn localTodos={localTodos}/>

                {/* Grid 3 */}
                <DoneColumn localTodos={localTodos}/>
               
            </div>          
    </div>
    <AddTodoModal/>
    </>
  )
}

export default MainContainer