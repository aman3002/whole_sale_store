import {combineReducers} from "redux"
import { reduc1 } from "./login_sign"
import { showlist_reducer } from "./showlist"
import { validates } from "./validate"
import { stores } from "./store_name_reducer"
import { user_name } from "./user_name"
import { borrow_reducer } from "./borrow"
import { store_da } from "./store_data"
import { owner } from "./owner/owner-type"
import { owners } from "./owner/owner_valiate"
const root=combineReducers({user_name,reduc1,showlist_reducer,validates,stores,store_da,borrow_reducer,owner,owners})
export default root