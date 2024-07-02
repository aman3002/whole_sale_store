import { Route, Routes, Navigate } from "react-router-dom";
import Valid from "../user";
import Apps from "./Homed";
import Add_owner_item from "./add_data";
import Dashboard from "../dashboard";
function Over() {
    return (
        <Routes>
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/dashboard_google" element={<Dashboard/>}/>
            <Route path="dashboard_owner" element={<Add_owner_item/>}/>
            <Route path="/login" element={<Apps />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
}

export default Over;
