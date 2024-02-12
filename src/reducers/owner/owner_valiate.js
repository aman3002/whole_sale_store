const initialState=false
export const owners=(state=initialState,action)=>{
    switch(action.type){
        case "owner_validate":
            return state?false:true
        default:
            return state
    }
}