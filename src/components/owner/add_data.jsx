import { useState } from "react"
import { useSelector,useDispatch } from "react-redux"
import { useLocation } from "react-router-dom";
import { user_name } from "../../actions/login_sign";
async function add(store, item, cost, category, count) {
    try {
        const response = await fetch("http://localhost:3001/add_item_owner", {
            method: "post",
            headers: {
                "Content-Type": "application/json" // Corrected typo
            },
            body: JSON.stringify({ store: store, item: item, cost: cost, category: category, count: count })        
        });

        if (response.status==200) {
            alert("Items added");
        } else {
            throw new Error("Failed to add item");
        }
    } catch (error) {
        console.error("Error adding item:", error);
        alert("Item failed to add");
    }
}

function Add_owner_item(){
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
    const store=useSelector((state)=>state.user_name)
    const [item,setitem]=useState("")
    const [category,setcategory]=useState("")
    const [cost,setcost]=useState(0)
    const [count,setcount]=useState(0)
    return(
        <div>
            <form onSubmit={async (e)=>{
                e.preventDefault()
                await add(store,item,cost,category,count)
            }}>
                ITEM &NBSP;<input type="text" placeholder="item name" onChange={(e)=>setitem(e.target.value)} required />
                COST &nbsp; <input type="number" placeholder="cost" onChange={(e)=>setcost(e.target.value)} required  />
                COUNT &nbsp; <input type="number" placeholder="count" onChange={(e)=>setcount(e.target.value)} required />
                CATEGORY &nbsp; <input type="text" placeholder="category" onChange={(e)=>setcategory(e.target.value)} required />
                <button type="submit">submit</button>
            </form>
        </div>
    ) 
}
export default Add_owner_item