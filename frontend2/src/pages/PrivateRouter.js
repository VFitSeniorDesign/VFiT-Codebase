import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../components/AuthContext';

const PrivateRouter = () => {
    let {user} = useContext(AuthContext)
    return user? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRouter;