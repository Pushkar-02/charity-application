import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './signup.css'

const Signup = () => {
    const [creadentials, setCreadentials] = useState({ Email: "", Phone: "", password: "", cpassword: "", pan:""});
    let history = useNavigate();



    const validatePan= async(e)=>{
        e.preventDefault();
        var txtPANCard = document.getElementById("pan");
        var lblPANCard = document.getElementById("pan-err")
        var regex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
        if (regex.test(txtPANCard.value.toUpperCase())) {
            lblPANCard.style.visibility = "hidden";
            return true;
        } else {
            lblPANCard.style.visibility = "visible";
            return false;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { Email, Phone, password, pan } = creadentials;
        const respose = await fetch("http://localhost:5000/api/auth/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Email, Phone, password, pan })
        });
        const json = await respose.json();
        console.log(json);

        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            history("/");
        }
        else {
            alert("Invalid creadentials");
        }
    }
    const onchange = (e) => {
        setCreadentials({ ...creadentials, [e.target.name]: e.target.value });
    }

    return (
        <>
            <h1 style={{ textAlign: "center" }}>Signup</h1>
            <form className='container' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="Email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="Email" id="Email" onChange={onchange} aria-describedby="emailHelp" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="Phone" className="form-label">Phone</label>
                    <input type="tel" className="form-control" name='Phone' onChange={onchange} id="Phone" />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onchange} name='password' id="password" minLength={8} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" onChange={onchange} name='cpassword' id="cpassword" minLength={8} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="pan" className="form-label">PAN Card</label>
                    <input name="pan" type="text" id="pan" onChange={onchange} className="PAN form-control" />
                    <span id="pan-err" className="error">Invalid PAN Number</span><br />
                    {/* <hr /> */}
                    <input className="btn btn-primary" type="button" id="btnSubmit" value="Validate" onClick={validatePan} />
                </div>

                <center>
                    <button type="submit" className="btn btn-primary">Signup</button>
                    <Link className="btn btn-primary mx-2" to="/" >Already a user? Login</Link>
                </center>
            </form>
        </>
    )
}

export default Signup
