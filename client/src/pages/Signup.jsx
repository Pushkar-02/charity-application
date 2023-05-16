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
        var corrpan = document.getElementById("pan-corr");
        var regex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
        if (regex.test(txtPANCard.value.toUpperCase())) {
            lblPANCard.style.visibility = "hidden";
            corrpan.style.visibility = "visible";
            return true;
        } else {
            lblPANCard.style.visibility = "visible";
            corrpan.style.visibility = "hidden";
            return false;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { Email, Phone, password, pan } = creadentials;
        // const [error, setError] = useState("");
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
            <div className="register-screen">
                {/* <h1 style={{ textAlign: "center" }}>Signup</h1> */}
                <form className='register-screen__form' onSubmit={handleSubmit}>
                    <h3 className="register-screen__title" style={{fontSize:'30px'}}>Register</h3>
                    {/* {error && <span className="error-message">{error}</span>} */}
                    
                    <div className="form-group">
                        <label style={{fontSize:'18px'}} htmlFor="Email">Email:</label>
                        <input type="email" name="Email" id="Email" placeholder="Enter Email" value={creadentials.Email} onChange={onchange} required/>
                    </div>

                    <div className="form-group">
                        <label style={{fontSize:'18px'}} htmlFor="Phone">Phone:</label>
                        <input type="tel" name='Phone' placeholder="Enter Phone" onChange={onchange} value={creadentials.Phone} id="Phone" />
                    </div>

                    <div className="form-group">
                        <label style={{fontSize:'18px'}} htmlFor="password">Password:</label>
                        <input type="password" name="password" id="password" placeholder="Enter Password" value={creadentials.password} onChange={onchange} required/>
                    </div>

                    <div className="form-group">
                        <label style={{fontSize:'18px'}} htmlFor="cpassword">Confirm Password:</label>
                        <input type="password" name="cpassword" id="cpassword" placeholder="Enter Password again" onChange={onchange} required/>
                    </div>

                    <div className="form-group">
                        <label style={{fontSize:'18px'}}htmlFor="pan" >PAN Card</label>
                        <input name="pan" type="text" id="pan" onChange={onchange} className="PAN form-control" />
                        <span id="pan-err" className="error">Invalid PAN Number</span><br />
                        <span id="pan-corr" className="corr">Valid PAN Number</span><br />
                        <input className="btn" style={{backgroundColor:'#ff7f50', color:'white'}} type="button" id="btnSubmit" value="Validate" onClick={validatePan} />
                    </div>


                    <button type="submit" className="btn btn-primary">Register</button>
                    <span className="register-screen__subtext">
                        Already have an account?<Link to="/">Login</Link>
                    </span>
                    {/* <div className="mb-3">
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
                        <input className="btn btn-primary" type="button" id="btnSubmit" value="Validate" onClick={validatePan} />
                    </div>

                    <center>
                        <button type="submit" className="btn btn-primary">Signup</button>
                        <Link className="btn btn-primary mx-2" to="/" >Already a user? Login</Link>
                    </center> */}
                </form>
            </div>
        </>
    )
}

export default Signup
