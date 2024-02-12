import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { store_data } from "../actions/login_sign";
import "./homepage.css"
async function store(store_name) {
  try {
    const response = await fetch("http://localhost:3001/get_store_data", {
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
        const data = await store(name);
        console.log(data);
        dispatch(store_data(data));
      } catch (error) {
        console.log("error fetching data");
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
            <table>
            <thead>
              <tr className="heading">
                <th>Item Name</th>
                <th>Rent</th>
              </tr>
            </thead>
            <tbody>
              {datas.map((item) => (
                <tr key={item.id} className="rows">
                  <td>{item.book_name}</td>
                  <td>{item.cost}</td>
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
