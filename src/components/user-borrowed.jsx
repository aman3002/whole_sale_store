import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { borrow } from "../actions/login_sign";

async function borrow_data(user,dispatch) {
  try {
    const response = await fetch(`${process.env.REACT}/get_user_data`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_name: user }),
    });
    const data = await response.json();
    dispatch(borrow(data))
    return data;
  } catch (error) {
    console.log("borrow_data_error", error);
    return null;
  }
}

function Borrow() {
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.user_name);
  const dispatch = useDispatch();
  const borrowed_data = useSelector((state) => state.borrow_reducer.list);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await borrow_data(user,dispatch);
        console.log(data, "borrowed data");
        // Only dispatch if the data is different
      } catch (error) {
        console.log("error fetching data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user,borrow_data]); // Only re-run the effect if user changes

  if (isLoading) {
    return <div>Loading...</div>;
  }

  
  return (
    <div>
      {borrowed_data.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Rent</th>
              <th>Shop Name</th>
              <th>ISBN NO</th>
            </tr>
          </thead>
          <tbody>
            {borrowed_data.map((item) => (
              <tr key={item.id}>
                <td>{item.book_name}</td>
                <td>{item.cost}</td>
                <td>{item.shop_name}</td>
                <td>{item.ISBN_No}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>NO ITEM BORROWED</div>
      )}
    </div>
  );
}

export default Borrow;
