const MainReducer = (state, action) => {
    switch (action.type) {   
        case "USER_LOGOUT":
            return {
                ...state,
                user : null
            }

        case "GET_TODOS":
          return {
            ...state, 
            todos:action.payload
          }
        
          case "ADD_TODOS":
            return {
              ...state, 
              todos :[action.payload, ...state.todos]
            }

            case "DELTE_TODO":
            return {
              ...state, 
              todos :state.todos.filter((todo)=>todo?.id !== action.payload)
            }

            case "UPDATE_TODO_STATUS":
              
              return {
                ...state, 
                todos:state.todos.map((todo)=>{
                  if(todo?.id === action.payload.id){
                    return action.payload
                  }
                  return todo;
                })
              }

          case "UPDATE_TODO":
            const updatetdTodo = action.payload
            return {
              ...state,
              todos: state.todos.map((todo)=>{
                if (todo?.id === updatetdTodo?.id){
                  return updatetdTodo
                }
                return todo;
              })
            }
      default:
        return state;
    }
  };
  export default MainReducer;