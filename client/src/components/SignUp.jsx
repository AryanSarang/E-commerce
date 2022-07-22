import React, { useState, useEffect } from "react";
import { useNavigate,Link} from "react-router-dom";
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import EmailIcon from '@mui/icons-material/Email';


const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem("user");
    if(auth){
        navigate("/")
    }
    })

    const handleSubmit = async () => {

        let result = await fetch("http://localhost:3001/register", {
            method: "post",
            body: JSON.stringify({ name, email, password }),
            headers: {
                "Content-Type": "application/json"
            },
        })
        result = await result.json();
        console.log(result);
        if (result.auth) {
            navigate("/");
        }
        localStorage.setItem("user", JSON.stringify(result.result));
        localStorage.setItem("token", JSON.stringify(result.auth));
    }

    return (
        <div className="outerDiv">
            <h1>
                Register
            </h1>

            <Box className="muiBox">
                <AccountCircle sx={{ color: 'action.active', mr: 1,mt:2 }} />
                <TextField  onChange={(e) => setName(e.target.value)} className="textField" value={name} label="Name"
                    variant="standard" />
            </Box>

            <Box className="muiBox">
                <EmailIcon sx={{ color: 'action.active', mr: 1,mt:2 }} />
                <TextField  type="email" onChange={(e) => setEmail(e.target.value)} className="textField" value={email} label="Email"
                    variant="standard" />
            </Box>

            <Box className="muiBox">
                <KeyRoundedIcon sx={{ color: 'action.active', mr: 1,mt:2 }} />
                <TextField  type="password" onChange={(e) => setPassword(e.target.value)} className="textField" value={password} label="Password"
                    variant="standard" />
            </Box>
            <button onClick={handleSubmit} className="signUpBtn btn btn-md btn-primary"
             type="submit">Sign up</button>
             <Box sx={{my:2}}>
                <h6>Already have an account </h6> 
                <h6><Link to="/login"> Log in</Link></h6>
             </Box>
        </div>
    );
}

export default SignUp;