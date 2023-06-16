import React from 'react';
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {toast} from "react-toastify";

const ProtectedRoute = ({children}) => {

    const {user} = useSelector((store) => store.user)

    if(!user) {
        toast.warn('Please login to continue')
        return <Navigate to={'/landing'} />
    }
    return children
};

export default ProtectedRoute;
