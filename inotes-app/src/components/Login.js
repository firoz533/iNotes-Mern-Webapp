import React from 'react'
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'

export default function Login(props) {
    
    let navigate = useNavigate();
    const [credentials,setCredentials] = useState({email:"",password:""}) 
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
      }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST", headers: {
                "Content-Type": "application/json"
            },body:JSON.stringify({email:credentials.email,password:credentials.password})
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            props.showAlert("Login Successful","success");
            localStorage.setItem('token',json.authToken);
            setTimeout(navigate('/'),1500);
        }
        
        else{
            props.showAlert("Invalid Credentials","danger");
        }
    }
    return (
        <div className='container my-3 py-3'>
            <h2 className='mb-3 pb-3'>Login to continue to iNoteBook</h2>
            <form onSubmit={handleSubmit}>
                <div className="my-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={credentials.email} name='email' onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" value={credentials.password} name='password' onChange={handleChange}/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}
