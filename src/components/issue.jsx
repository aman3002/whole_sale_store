import { useState } from "react";
import { useSelector } from "react-redux";

async function call(itemname, cost, store, user) {
  try {
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

    if (response.ok) {
      alert("Item issued");
    } else {
      alert("Failed to issue item");
    }
  } catch (error) {
    console.error("Error issuing item:", error);
  }
}

function Issue() {
  const [item, setItem] = useState("");
  const [cost, setCost] = useState(0);
  const store = useSelector((state) => state.stores);
  const user = useSelector((state) => state.user_name);

  return (
    <div>
      <h1>BORROW A ITEM</h1>
<form
  onSubmit={(e) => {
    e.preventDefault(); 
    call(item, cost, store, user);
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
