import React, { useContext } from 'react'
import mainContext from '../../ContextAndReducer/MainContext'

const ContainerHeaders = ({handleSearch, handleSelectPeriod, handleDateFilter}) => {
  const {query, setQuery, dispatch, selectPeriod} = useContext(mainContext)
  console.log(selectPeriod)

 

  return (
    <div className='flex w-full justify-between container'>
           {/* Search Bar */}
           <input type="text" placeholder="Search Todos" className="input input-bordered input-info w-full max-w-xs" 
           value={query}
           onChange={(e)=>handleSearch(e)}
           />

           {/* Date Filter */}
           <div className='flex gap-4 items-center'>
            <div className="w-64">
                <input type="date" onChange={(event)=>handleDateFilter(event)} class="w-full px-5 py-3 bg-inherit  border input-info rounded-md shadow-sm focus:outline-none focus:border-blue-500"/>
            </div>
                <select className="select select-info max-w-xs" value={selectPeriod} onChange={(event)=>handleSelectPeriod(event)}>
                    <option value={0}>All</option>
                    <option value ={7} >Last 7 Days</option>
                    <option value ={30}>Last 1 Month</option>
                    <option value ={90}>Last 3 Month</option>
                </select>
           </div>
    </div>
  )
}

export default ContainerHeaders