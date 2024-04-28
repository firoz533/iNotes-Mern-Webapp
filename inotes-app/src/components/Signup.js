import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

export default function Login(props) {

    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (credentials.password !== credentials.cpassword) {
            alert("Passwords do not Match!!")
            return false;
        }
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: "POST", headers: {
                "Content-Type": "application/json"
            }, body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });

        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authToken);
            setTimeout(navigate('/'), 1500);
            props.showAlert("Account Created Succesfully", "success")
        }

        else {
            props.showAlert("User Already Exists", "danger")
        }
    }

    return (
        <div className='container my-3 py-3'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" value={credentials.name} name='name' onChange={handleChange} minLength={3} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={credentials.email} name='email' onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" value={credentials.password} name='password' onChange={handleChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" value={credentials.cpassword} name='cpassword' onChange={handleChange} minLength={5} required />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}
