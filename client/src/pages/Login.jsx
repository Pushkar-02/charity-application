import React, { useState } from 'react'
import {useNavigate,Link} from 'react-router-dom'

const Login = () => {
    const [creadentials, setCreadentials] = useState({ Email: "", password: "" });
    let history = useNavigate();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const respose = await fetch("http://localhost:5000/api/auth/login",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({Email: creadentials.Email, password: creadentials.password})
        });
        const json = await respose.json();
        console.log(json);

        if(json.success){
            localStorage.setItem('token', json.authtoken);
            history("/home");
        }
        else{
            alert("Invalid creadentials");
        }
    }

    const onchange = (e) => {
        setCreadentials({ ...creadentials, [e.target.name]: e.target.value });
    }
    return (
        <>
            <h1 style={{textAlign : "center"}}>LOGIN</h1>
            <form className='container' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="Email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="Email" id="Email" value={creadentials.Email} onChange={onchange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" value={creadentials.password} onChange={onchange} id="password" />
                </div>
                <button type="submit" className="btn btn-primary" >Login</button>
                <Link class="btn btn-primary mx-2" to="/signup" >Signup</Link>
            </form>
        </>
    )
}

export default Login
