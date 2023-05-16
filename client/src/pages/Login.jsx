import React, { useState } from 'react'
import {useNavigate,Link} from 'react-router-dom'
import "./login.css";

const Login = () => {
    const [creadentials, setCreadentials] = useState({ Email: "", password: "" });
    const [error, setError] = useState("");
    // const [password, setPassword] = useState("");
    // const [email, setEmail] = useState("");

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
            <div className="login-screen">
                <form className="login-screen__form" onSubmit={handleSubmit}>
                    <h3 className="login-screen__title">Login</h3>
                    {error && <span className="error-message">{error}</span>}

                    <div className="form-group">
                        <label htmlFor="Email">Email:</label>
                        <input type="email" name="Email" id="Email" placeholder="Enter Email" value={creadentials.Email} tabIndex={1} onChange={onchange} required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">
                            Password:{" "}
                            {/* <Link
                            to="/forgotpassword"
                            className="login-screen__forgotpassword"
                            tabIndex={4}
                            >
                            Forgot Password?
                            </Link> */}
                        </label>
                        <input tabIndex={2} type="password" name="password" id="password" placeholder="Enter Password" value={creadentials.password} onChange={onchange} required/>
                    </div>

                    <button type="submit" className="btn btn-primary" tabIndex={3}>Login</button>
                    <span className="login-screen__subtext">
                        Don't have an account?
                        <Link to="/signup" tabIndex={5}>
                            Register
                        </Link>
                    </span>

                    {/* <div className="mb-3">
                        <label htmlFor="Email" className="form-label">Email address</label>
                        <input type="email" className="form-control" name="Email" id="Email" value={creadentials.Email} onChange={onchange} aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" name="password" className="form-control" value={creadentials.password} onChange={onchange} id="password" />
                    </div>
                    <button type="submit" className="btn btn-primary" >Login</button>
                    <Link class="btn btn-primary mx-2" to="/signup" >Signup</Link> */}
                </form>
            </div>
        </>
    )
}

export default Login
