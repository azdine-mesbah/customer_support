/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Users from './pages/Users';

import { PrivateRoute } from './middlewares/PrivateRoute';
import { AdminOnly } from './middlewares/AdminOnly';


import currentUserStore, { loadUser } from './redux/currentUserStore';
import axios from 'axios';

import { USER } from './constants/urls';

function App() {
    const [isLoading, setLoading] = useState(true)
    if(isLoading){
        axios.get(USER).then(res=>{
            currentUserStore.dispatch(loadUser(res.data))
        }).catch(err=>{
            currentUserStore.dispatch(loadUser({}))
        }).finally(()=>{
            setLoading(false)
        })
    }

    return (
        <BrowserRouter>
            <Header/>
            <main className="container py-3">
                {
                    isLoading?'':
                    <Switch>
                        <AdminOnly exact path="/users" component={Users}/>
                        <AdminOnly exact path="/issues/:user_id" component={Dashboard}/>
                        <Route exact path="/login" component={Login}/>
                        <PrivateRoute component={Dashboard}/>
                    </Switch>
                }
            </main>
            <Footer/>
        </BrowserRouter>
    );
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
