const initialState=""
export const stores=(state=initialState,action)=>{
    switch(action.type){
        case "store":
            return action.payload
        default:
            return state
    }
}