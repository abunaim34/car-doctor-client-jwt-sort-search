import { useContext } from "react";
import { AuthCotext } from "../Provider/AuthProvider";
import {Navigate} from "react-router-dom"

// eslint-disable-next-line react/prop-types
const PrivateRoutes = ({children}) => {
    const {user, loading} = useContext(AuthCotext)

    if(loading){
        return <span className="loading loading-bars loading-lg"></span>
    }
    if(user){
        return children
    }
    return <Navigate to="/login" replace></Navigate>
};

export default PrivateRoutes;