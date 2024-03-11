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
import dashboard from "./dashboard";
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
           <dashboard/>          
        )}
      </div>
      
    </div>
  );
}

export default Valid;
