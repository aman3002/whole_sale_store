import { useState ,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { borrow } from "../actions/login_sign";
async function borrow_data(user,dispatch) {
  try {
    const response = await fetch("http://localhost:3001/get_user_data", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_name: user }),
    });
    const data = await response.json();
    console.log(data,"ok2")
    dispatch(borrow(data))
    return data;
  } catch (error) {
    console.log("borrow_data_error", error);
    return null;
  }
}
async function call(itemname, cost, store, user) {
  try {
    console.log(store)
    if(store==""){
      alert("please select a store")
    }
    else {
    const response = await fetch("http://localhost:3001/issue_item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item: itemname,
        cost: cost,
        store: store,
        user: user,
      }),
    });
    if(response.status==400){
      alert("item not available or enter correct details")
    }
    if (response.ok) {
      alert("Item issued");
    } if(response.status!=200 && response.status!=400) {
      alert("Failed to issue item");
    }
  }
  } catch (error) {
    console.error("Error issuing item:", error,"nono");
  }
}

function Issue() {
  const [item, setItem] = useState("");
  const [cost, setCost] = useState(0);
  const store = useSelector((state) => state.stores);
  const user = useSelector((state) => state.user_name);
  const borrowed_data = useSelector((state) => state.borrow_reducer.list);
 const dispatch=useDispatch()
  const fr = async () => {
    try {
      const data = await borrow_data(user, dispatch);
      console.log(data,"ok")
      if (JSON.stringify(borrowed_data) !== JSON.stringify(data)) {
        dispatch(borrow(data));
      }
    } catch (error) {
      console.error("Error updating borrowed data:", error);
    }
  };
  

useEffect(() => {
  fr(); // Call fr function when component mounts
}, [user]); // Add dependencies to useEffect hook

  return (
    <div>
      <h1>BORROW A ITEM</h1>
<form
  onSubmit={async (e) => {
    e.preventDefault(); 
    await call(item, cost, store, user);
    fr()
  }}
>        ITEM:&nbsp;{" "}
        <input
          type="text"
          required
          placeholder="item name"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
        COST:&nbsp;{" "}
        <input
          type="number"
          required
          placeholder="cost"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
        />
  <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
}

export default Issue;
