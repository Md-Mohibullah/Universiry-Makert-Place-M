import {Navigate, Outlet} from 'react-router-dom'
import useAuthState from './../hooks/useAuthState'

import React from 'react'
import Spinner from './Spinner'

const PrivateRoute = () => {

    const {loggedIn , checkState} = useAuthState();
    if(checkState){
        return <Spinner/>;
    }

    return loggedIn ? <Outlet /> : <Navigate to="/signin"/>
}

export default PrivateRoute
