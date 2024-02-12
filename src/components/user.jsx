import React from "react";
import Apps from "./owner/Homed";
import Home from "./homepage";
import Success from "./Valid_success";
import { useSelector} from "react-redux";
import Store_data from "./store_data";
import Borrow from "./user-borrowed";
import Issue from "./issue";
import Return from "./return";
import "./homepage.css"

function Valid() {
  const validat = useSelector((state) => state.validates);
  return (
    <div>
      <div>
        {validat === false ? (
          <div className="home">
            <Home />
          </div>
        ) : (
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
          
        )}
      </div>
    </div>
  );
}

export default Valid;
