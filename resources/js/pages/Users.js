import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

import { USERS } from '../constants/urls';

import swal from '../helpers/Swal';

export default function Users(){

    const [users, setUsers] = useState([]);

    useEffect(()=>{
        axios.get(USERS).then(response=>{
            setUsers(response.data)
        }).catch(error=>{
            console.log(error)
        })
    },[])
    
    const handleClick = e =>{
        swal.fire()
    }

    return (
    <div className="row justify-content-center">
        <div className="col">
            <div className="card">
                <div className="card-header d-flex align-items-baseline justify-content-between">Users list<span className="btn btn-primary" onClick={handleClick}>new User</span></div>

                <div className="card-body">
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">id</th>
                                <th scope="col">username</th>
                                <th scope="col">email</th>
                                <th scope="col">actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(user=>{
                                    return <tr key={Math.random()}>
                                                <th scope="row">{user.id}</th>
                                                <td>{user.is_admin?"(admin) ":<NavLink exact to={`/issues/${user.id}`}>(customer) </NavLink>}{user.name}</td>
                                                <td>{user.email}</td>
                                                <td></td>
                                            </tr>
                                })
                            }
                        </tbody>
                    </table> 

                    
                </div>
            </div>
        </div>
    </div>)
}