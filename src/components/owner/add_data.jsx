import { useState } from "react"
import { useSelector,useDispatch } from "react-redux"
import { useLocation } from "react-router-dom";
import { user_name } from "../../actions/login_sign";
async function add(store, item, cost, category, count,file) {
    try {
        const response = await fetch(`${process.env.REACT}/add_item_owner`, {
            method: "post",
            headers: {
                "Content-Type": "application/json" // Corrected typo
            },
            body: JSON.stringify({ file:file,store: store, item: item, cost: cost, category: category, count: count })        
        });

        if (response.status==200) {
            alert("Items added");
        } else {
            throw new Error("Failed to add item  or data is already available for same item");
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
        if (str == null) {
            return ''; // Return an empty string or handle it as per your requirements
          }
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
    const [file, setFile] = useState(null);
    const [filename, setFilename] = useState("");

  
    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
    };
    
    return(
        <div>
            <form onSubmit={async (e)=>{
                e.preventDefault()
                try {
                  const formData = await new FormData();
                  formData.append('file', file);
                  formData.append('name', names);
                  formData.append('item', item); 
                  console.log(names,item,"okok")
              
                  let res=await fetch(`${process.env.REACT}/upload`, {
                    method: 'POST',
                    body: formData 
                  });
                  res=await res.json()
                  if(res.name){
                    console.log(res,"df")
                    setFilename(res.name)
                    console.log(res.name,filename,"eergr")

                  }
                  console.log('File uploaded successfully',filename,res);
                } catch (error) {
                  console.error('Error uploading file:', error);
                }
                await add(store,item,cost,category,count,filename)
            }} enctype="multipart/form-data">
                ITEM &NBSP;<input type="text" placeholder="item name" onChange={(e)=>setitem(e.target.value)} required />
                COST &nbsp; <input type="number" placeholder="cost" onChange={(e)=>setcost(e.target.value)} required  />
                COUNT &nbsp; <input type="number" placeholder="count" onChange={(e)=>setcount(e.target.value)} required />
                CATEGORY &nbsp; <input type="text" placeholder="category" onChange={(e)=>setcategory(e.target.value)} required />
                <form onSubmit={handleSubmit}>
                Image &nbsp; <input type="file" onChange={handleFileChange} />
                {file && <button type="button" onClick={handleSubmit}>Upload</button>}
                <br/>
                </form>
                {item && cost && count && category && file && <button type="submit">submit</button>}
            </form>
        </div>
    ) 
}
export default Add_owner_item