import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { store_data } from "../actions/login_sign";
import "./homepage.css"
async function store(store_name) {
  try {
    const response = await fetch(`${process.env.REACT}//get_store_data`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ store_name: store_name }),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("data error");
  }
}

function Store_data() {
  const name = useSelector((state) => state.stores);
  const datas = useSelector((state) => state.store_da.list);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = await store(name);
        console.log(data);
        data = data.map((item) => {
          return {
            ...item, // Spread the existing properties
            filename: `${process.env.REACT}/${item.filename}` // Update the filename property
          };
        })
        console.log(data,"after updation")
        dispatch(store_data(data));
        console.log(datas,"datas")
      } catch (error) {
        console.log("error fetching data",error);
      }
    };

    fetchData();
  }, [name, dispatch]);

  return (
    <>
      {name === "" ? (
        <h4>Please select a store</h4>
      ) : (
        <>
          {datas.length > 0 ? ( // Check if data is available
            <table style={{border:"black solid 1px"}}>
            <thead>
              <tr className="heading">
                <th>Item Name</th>
                <th>Rent</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {datas.map((item) => (
                <tr key={item.id} className="rows">
                  <td>{item.book_name}</td>
                  <td>{item.cost}</td>
                  <td>   <img src={item.filename} style={{ maxWidth: '30vw', maxHeight: '30vh' }} alt="Description" />
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
          ) : (
            <p>Loading...</p>
          )}
        </>
      )}
    </>
  );
}

export default Store_data;
