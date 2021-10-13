import axios from 'axios';
import React, { useState } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import currentUserStore, {loadUser}  from '../redux/currentUserStore';
import { SANCTUM_CSRF_COOKIE, LOGOUT } from '../constants/urls';

export default function Header(){
    const [state, setUser] = useState({isLoading:true, user:currentUserStore.getState()})
    const history = useHistory();

    currentUserStore.subscribe(()=>{
        axios.get(SANCTUM_CSRF_COOKIE).then(()=>{
            setUser({is_loading:false, user:currentUserStore.getState()})
        })
    })

    const handleLogout = e=>{
        e.preventDefault()
        axios.post(LOGOUT).then(res=>{
            currentUserStore.dispatch(loadUser({}))
            history.push('/login')
        })
    }

    return (<header>
                <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
                    <div className="container">
                        <a className="navbar-brand" href="/">
                            APP NAME
                        </a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            {
                                !state.isLoading?<>
                                <ul className="navbar-nav me-auto">
                                    {state.user.is_admin?
                                        <>
                                            <li className="nav-item">
                                                <NavLink className="nav-link" to="/users">users</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink exact className="nav-link" to="/">issues</NavLink>
                                            </li>
                                        </>
                                    :<></>}
                                </ul>
                                <ul className="navbar-nav ms-auto">
                                    {
                                        state.user.name ?<li className="nav-item dropdown">
                                        <a id="navbarDropdown" className="nav-link dropdown-toggle" type="button" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                            {state.user.name}
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                            <a className="dropdown-item" onClick={handleLogout}>
                                                logout
                                            </a>
                                        </div>
                                    </li>:<>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/login">login</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/register">register</a>
                                        </li>
                                    </>
                                    }
                                    
                                </ul></>:<></>
                            }
                            
                        </div>
                    </div>
                </nav>
            </header>);
}