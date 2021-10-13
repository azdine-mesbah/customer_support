import React from 'react';
import { Route, Redirect } from "react-router-dom";

import currentUserStore from '../redux/currentUserStore';

export function PrivateRoute({ component: Component, ...rest }){
    return (
        <Route {...rest} render={props=>currentUserStore.getState().name?
            <Component {...props}/>
        :<Redirect to={{pathname:'/login', state:{from:rest.location.pathname}}}/>
    } />
    );
}