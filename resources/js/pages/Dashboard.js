import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { ISSUES } from '../constants/urls';
import currentUserStore   from '../redux/currentUserStore';
import swal from '../helpers/Swal';

import { NewIssueForm, DetailsIssue } from '../models/Issue';

export default function Dashboard(){
    const [issues, setIssues] = useState([]);
    const currentUser = currentUserStore.getState()
    const { user_id } = useParams();

    useEffect(()=>{
        axios.get(ISSUES+(user_id?`?user=${user_id}`:"")).then(response=>{
            setIssues(response.data.data)
        }).catch(error=>{
            console.log(error)
        })
    },[])

    const handleAdd = e =>{
        swal.fire({
            title:"Submit new issue",
            html:<NewIssueForm/>,
            showCancelButton:true,
            cancelButtonText:"Cancel",
            confirmButtonText:"Submit",
            showLoaderOnConfirm: true,
            preConfirm:()=>{
                const payload = {
                    title:swal.getPopup().querySelector('#title').value,
                    content:swal.getPopup().querySelector('#content').value
                }
                return axios.post(ISSUES, payload).then(response=>{
                    return response.data
                }).catch(err=>{
                    const {message, errors} = err.response.data
                    for (const [field, error] of Object.entries(errors)) {
                        swal.getPopup().querySelector(`#${field}`).classList.add('is-invalid')
                        swal.getPopup().querySelector(`#${field}-errors`).innerText = error
                    }
                    swal.showValidationMessage(message)
                })
            },
        }).then(results=>{
            const issue = results.value.data;
            setIssues([issue,...issues])
        })
    }

    const handleEdit = e=>{
        const issue = issues.find(issue=>issue.id.toString() == e.target.getAttribute('data'))
        swal.fire({
            title:"Submit new issue",
            html:<NewIssueForm issue={issue}/>,
            showCancelButton:true,
            cancelButtonText:"Cancel",
            confirmButtonText:"Submit",
            showLoaderOnConfirm: true,
            preConfirm:()=>{
                const payload = {
                    title:swal.getPopup().querySelector('#title').value,
                    content:swal.getPopup().querySelector('#content').value
                }
                return axios.put(`${ISSUES}/${issue.id}`, payload).then(response=>{
                    return response.data
                }).catch(err=>{
                    const {message, errors} = err.response.data
                    for (const [field, error] of Object.entries(errors)) {
                        swal.getPopup().querySelector(`#${field}`).classList.add('is-invalid')
                        swal.getPopup().querySelector(`#${field}-errors`).innerText = error
                    }
                    swal.showValidationMessage(message)
                })
            },
        }).then(results=>{
            const closedIssue = results.value.data;
            swal.fire('Edited!','success')
            const index = issues.findIndex(issue=>issue.id==closedIssue.id)
            setIssues([...issues.slice(0,index), closedIssue, ...issues.slice(index+1)])
        })
    }

    const handleOpen = e=>{
        const issue = issues.find(issue=>issue.id.toString() == e.target.getAttribute('data'))
        swal.fire({
            title:issue.title,
            html:<DetailsIssue issue={issue}/>
        })
    }

    const handleInProgress = e=>{
        const issue_id = e.target.getAttribute('data')
        swal.showLoading()
        axios.put(`${ISSUES}/${issue_id}`, {status:"1"}).then(res=>{
            const closedIssue = res.data.data;
            swal.fire('Edited!','success')
            const index = issues.findIndex(issue=>issue.id==closedIssue.id)
            setIssues([...issues.slice(0,index), closedIssue, ...issues.slice(index+1)])
            swal.fire({
                icon: 'success',
                title: 'Issue InProgress',
              })
        }).catch(err=>{
            swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
              })
        })
    }

    const handleResolve = e=>{
        const issue_id = e.target.getAttribute('data')
        swal.showLoading()
        axios.put(`${ISSUES}/${issue_id}`, {status:"2"}).then(res=>{
            const closedIssue = res.data.data;
            swal.fire('Edited!','success')
            const index = issues.findIndex(issue=>issue.id==closedIssue.id)
            setIssues([...issues.slice(0,index), closedIssue, ...issues.slice(index+1)])
            swal.fire({
                icon: 'success',
                title: 'Issue Resolved',
              })
        }).catch(err=>{
            swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
              })
        })
    }

    const handleClose = e=>{
        const issue_id = e.target.getAttribute('data')
        swal.fire({
            title: 'Are you sure',
            text: "You want to close this issue ?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, close it!'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.post(`${ISSUES}/${issue_id}/close`).then(res=>{
                    const closedIssue = res.data.data
                    swal.fire('Closed!','success')
                    const index = issues.findIndex(issue=>issue.id==issue_id)
                    setIssues([...issues.slice(0,index), closedIssue, ...issues.slice(index+1)])
                }).catch(err=>{
                    swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                      })
                })
            }
          })
    }

    return (
        <div className="row justify-content-center">
            <div className="col">
                <div className="card">
                    <div className="card-header d-flex align-items-baseline justify-content-between">Issues list<span className="btn btn-primary" onClick={handleAdd}>new Issue</span></div>
                    <div className="card-body">
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">id</th>
                                    <th scope="col">customer</th>
                                    <th scope="col">title</th>
                                    <th scope="col">status</th>
                                    <th scope="col">actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    issues.map(issue=>{
                                        return <tr key={Math.random()}>
                                                    <th scope="row">{issue.id}</th>
                                                    <td>{issue.customer.name}</td>
                                                    <td className="btn btn-sm text-primary text-left w-100" data={issue.id} onClick={handleOpen}>{issue.title}</td>
                                                    <td>{issue.status} in {issue.updated_at.replace(" ", " at ")}</td>
                                                    <td>
                                                        {
                                                            currentUser.is_admin?<>
                                                            <button className="btn btn-sm btn-info me-1 text-white" data={issue.id} onClick={handleInProgress}>Handle</button>
                                                            <button className="btn btn-sm btn-success me-1" data={issue.id} onClick={handleResolve}>Resolve</button>
                                                            <button className="btn btn-sm btn-secondary me-1" data={issue.id} onClick={handleEdit}>Edit</button>
                                                            </>:<></>
                                                        }
                                                        {
                                                            issue.status == "Closed"?"":<button className="btn btn-sm btn-danger" data={issue.id} onClick={handleClose}>Close</button>
                                                        }
                                                    </td>
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