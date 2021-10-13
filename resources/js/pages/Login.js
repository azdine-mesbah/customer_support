import React from 'react';

export default function Login(){

    return (
        <div className="row justify-content-center">
            <div className="col">
                <div className="card">
                    <div className="card-header">Login required</div>
                    <div className="card-body">
                        <div className="alert alert-danger" role="alert">
                            <p>This page requires authentication!!</p>
                            <p>Please click <a href="/login">here</a> to login</p>
                        </div> 
                    </div>
                </div>
            </div>
        </div>)
}