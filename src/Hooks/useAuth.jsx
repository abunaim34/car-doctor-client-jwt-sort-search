import { useContext } from "react";
import { AuthCotext } from "../Provider/AuthProvider";


const useAuth = () => {
    const auth = useContext(AuthCotext)
    return auth;
};

export default useAuth;