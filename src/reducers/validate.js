const initialState=false
export const validates=(state=initialState,action)=>{
    switch(action.type){
        case "validate":
            return state?false:true
        default:
            return state
    }
}