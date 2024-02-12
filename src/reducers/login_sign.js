const initialState=false;
export const reduc1=(state=initialState,action)=>{
    switch(action.type){
        case "login_sign":
            return state?false:true
        default:
            return state
    }
}
