import axios from "axios";
import { useReducer } from "react";
import { createContext, useState } from "react";
import { BASE_URL } from "../constant";
import MainReducer from "./MainReducer";






const mainContext = createContext();


export const MainAppContextProvider =  ({children}) =>{

    const localStorageUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
    // Global State
    const [query, setQuery] = useState('')
    const [localTodos, setLocalTodos]= useState()
    const [selectPeriod, setSelectPeriod] = useState(0)
    const [filDate, setFilDate] = useState('')
    const [userDetail, setUserDetail] = useState(localStorageUser)
    const[loading, setLoading] = useState(false)
   

   


    const initialState = {
       todos:[],
       
    }

    const [state, dispatch] = useReducer(MainReducer, initialState)
    
    
    const updateTodoStatue = async(id, accessToken, status)=>{
        setLoading(true)
        const response = await axios.post(`${BASE_URL}updateTodoStatus/${id}/`, {'status':status}, {
            headers:{
                'content-type': 'application/json', 
                'Authorization': `Bearer ${accessToken}`
            }
        })
       if (response?.request.status === 200){
        dispatch({
            type:'UPDATE_TODO_STATUS', 
            payload:response?.data
        })
        const updatedTodo = localTodos?.map((todo)=>{
            if(todo.id === response?.data?.id){
                return {...todo,  ...response?.data}
            }
            else{
                return todo
            }
        })
        setLocalTodos(updatedTodo)
       }
       setLoading(false)
    }


    
    return <mainContext.Provider value={{
        // global state 
       todos:state.todos,
       
        
        // global Fucntions
       dispatch:dispatch,
       updateTodoStatue:updateTodoStatue,

        // Global State 
        query:query, 
        setQuery:setQuery,
        localTodos:localTodos,
        setLocalTodos:setLocalTodos,
        selectPeriod:selectPeriod, 
        setSelectPeriod:setSelectPeriod,
        setLocalTodos:setLocalTodos,
        filDate:filDate,
        setFilDate:setFilDate,
        userDetail:userDetail, 
        setUserDetail:setUserDetail,
        loading:loading,
        setLoading:setLoading,


       
        
    }}>
        {children}
    </mainContext.Provider>
}

export default mainContext;