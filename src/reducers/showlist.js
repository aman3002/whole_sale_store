const initialState={list:[]}
export const showlist_reducer=(state=initialState,action)=>{
    switch(action.type){
        case "storelist":
            return {...state,list:action.payload}
        case "showlist":
            return state
        default :
        return state
    }
}