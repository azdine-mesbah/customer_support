import React, { useState, useRef } from 'react';
import swal from '../helpers/Swal';

export function NewIssueForm({issue}){
    const [state, setState] = useState(issue || {title:"", content:""})

    const handleChange = e=>{
        const {name, value} = e.target;
        swal.resetValidationMessage()
        swal.getPopup().querySelector(`#${name}`).classList.remove('is-invalid')
        swal.getPopup().querySelector(`#${name}-errors`).innerText = ""
        setState({...state, [name]:value})
    }

    return (
        <form>
            <div className="col-12">
                <div className="input-group my-3">
                    <input id="title" type="text" className="form-control" placeholder="Title" name="title" value={state.title} onChange={handleChange}/>
                    <span className="invalid-feedback" role="alert">
                        <strong id="title-errors"></strong>
                    </span>
                </div>
            </div>
            <div className="col-12">
                <div className="input-group my-3">
                    <textarea id="content" className="form-control" placeholder="Content" rows={5} name="content" value={state.content} onChange={handleChange}/>
                    <span className="invalid-feedback" role="alert">
                        <strong id="content-errors"></strong>
                    </span>
                </div>
            </div>
        </form>
    )
}

export function DetailsIssue({issue}){
    return (
        <div>
            <div className="col-12">
                <div className="my-3 text-left border-bottom">
                <label>Content:</label>
                    <p>{issue.content}</p>
                </div>
            </div>
            <div className="col-12">
                <div className="my-3 text-left border-bottom">
                    <label>Status:</label>
                    <p>{issue.status} in {issue.updated_at.replace(" ", " at ")}</p>
                </div>
            </div>
        </div>
    )
}