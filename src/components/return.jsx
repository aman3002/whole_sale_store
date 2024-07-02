import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { borrow } from '../actions/login_sign';

async function returns(item, cost, user, shop,isbn) {
  try {
    const response = await fetch('http://localhost:3001/return', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        item: item,
        user: user,
        shop: shop,
        cost: cost,
        isbn:isbn
      })
    });
    console.log(response.status,"vguty")

    if (response.ok) {
      alert('Item returned');
    }
    else if(response.status===400){
      alert("please write correct details")
    }
  } catch (error) {
    alert('Error returning item');
  }
}
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
      dispatch(borrow(data))
      return data;
    } catch (error) {
      console.log("borrow_data_error", error);
      return null;
    }
  }
  
  function Return() {
    const borrowed_data = useSelector((state) => state.borrow_reducer.list);
    const [cost, setCost] = useState(0);
    const [item, setItem] = useState('');
    const [shop, setShop] = useState('');
    const [isbn,setisbn]=useState("")
    const user = useSelector((state) => state.user_name);
    const dispatch=useDispatch();
  
    // Define fr function
    const fr = async () => {
        try {
          const data = await borrow_data(user, dispatch);
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
        <h1>RETURN AN ITEM</h1>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await returns(item, cost, user, shop, isbn);
            fr(); // Call fr function after returning item
          }}
        >
          ITEM &nbsp;
          <input type="text" placeholder="Item" onChange={(e) => setItem(e.target.value)} required />
          Shop &nbsp;<input type="text" placeholder="Shop" onChange={(e) => setShop(e.target.value)} required />
          ISBN_NO<input type="text" placeholder="isbn" onChange={(e) => setisbn(e.target.value)} required />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
  
  export default Return;
  