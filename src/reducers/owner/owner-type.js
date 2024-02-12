const initialState=false
export const owner=(state=initialState,action)=>{
    switch(action.type){
        case "owner":
            return state?false:true
        default:
            return state
    }
}