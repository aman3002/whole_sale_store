const initialState=""
export const user_name=(state=initialState,action)=>{
    switch(action.type){
        case "user_name":
            return action.payload
        default:
            return state
    }
}