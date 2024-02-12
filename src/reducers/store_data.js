const initialState={list:[]}
export const store_da=(state=initialState,action)=>{
    switch(action.type){
        case "data_store":
            return {...state,list:action.payload}
        default:
            return state
    }
}