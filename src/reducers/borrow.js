const initialState={list:[]}
export const borrow_reducer=(state=initialState,action)=>{
    switch(action.type){
        case "borrow":
            return {...state,list:action.payload}
        default:
            return state
    }
}