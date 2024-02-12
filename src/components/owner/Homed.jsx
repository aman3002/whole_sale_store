import Page from "./formpage";
import { useSelector } from "react-redux";
import Valid from "../user";
function Apps(){
    const onwer_user=useSelector((state)=>state.owner)
    return (
        <div>
            {onwer_user===false?<div>
                <Page/>
            </div>:<div><Valid/></div>}
        </div>
    )
}
export default Apps
