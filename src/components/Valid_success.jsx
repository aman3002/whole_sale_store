import React, { useEffect } from "react";
import { storelist,store_name } from "../actions/login_sign";
import { useSelector,useDispatch } from "react-redux";
async function valid() {
  try {
    const response = await fetch("http://localhost:3001/validation", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const res1 = await response.json();
    return res1;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

function Success() {
  const list = useSelector((state) => state.showlist_reducer.list);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const z = await valid();
        dispatch(storelist(z));
      } catch (error) {
        console.log("error");
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once

  console.log("gctytuv", list);

  return (
    <div>
      <h1>Your Data</h1>
      <ul>
        {list.map((item) => (
          <span onClick={() => dispatch(store_name(item.name))} style={{ cursor: "pointer" }} key={item.id}>
          {item.name || ""}<br/>
        </span>
        ))}
      </ul>
    </div>
  );
}

export default Success;



