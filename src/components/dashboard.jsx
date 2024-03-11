import React from "react";
import Apps from "./owner/Homed";
import Home from "./homepage";
import Success from "./Valid_success";
import { useDispatch, useSelector} from "react-redux";
import Store_data from "./store_data";
import Borrow from "./user-borrowed";
import Issue from "./issue";
import Return from "./return";
import "./homepage.css"
import { useLocation, useParams } from "react-router-dom";
import { user_name } from "../actions/login_sign";

function Dashboard() {
    const name=useLocation()
    const search=new URLSearchParams(name.search)
    let names=search.get("name")
    function removeSpacesAndConvertToLower(str) {
        // Remove spaces using regex and convert to lowercase
        return str.replace(/\s+/g, '_').toLowerCase();
      }
    names=removeSpacesAndConvertToLower(names)
      
    const dispatch=useDispatch()
    dispatch(user_name(names))
    console.log(names,"jiji")
  return (
    <div>
            <div className="page-contain">
          < div className="store_list">
            <Success />
            </div>
            <div className="item_list"><Store_data/></div>
            <div className="borrow"><Borrow/></div>
            <div className="last">
            <div className="issue"><Issue/></div>
            <div className="return"> <Return/></div>     
          </div>
          </div>
          
        
      </div>
      );
}

export default Dashboard;
