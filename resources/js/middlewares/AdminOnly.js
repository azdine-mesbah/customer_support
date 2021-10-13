import React from 'react';
import { Route, Redirect } from "react-router-dom";

import currentUserStore from '../redux/currentUserStore';

export function AdminOnly({ component: Component, ...rest }){
    return (
        <Route {...rest} render={props=>currentUserStore.getState().is_admin?
            <Component {...props}/>
        :<Redirect to={{pathname:'/dashboard', state:{from:rest.location.pathname}}}/>
    } />
    );
}