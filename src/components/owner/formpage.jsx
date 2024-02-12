import { useSelector } from "react-redux";
import Add_owner_item from "./add_data";
import Homes from "./homepage";
function Page(){
    const store=useSelector((state)=>state.owners)
    return(
        <div>
            {store===false?<div>
                <Homes/></div>:
                <div>
                    <Add_owner_item/>
                    </div>}
        </div>
    )
}
export default Page