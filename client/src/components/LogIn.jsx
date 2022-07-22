import { React, useEffect, useState } from "react";
import { useNavigate,Link} from "react-router-dom";
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import EmailIcon from '@mui/icons-material/Email';

const LogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const Navigate = useNavigate();

    const handleLogIn = async () => {
        console.log(email, password);
        let result = await fetch("http://localhost:3001/login", {
            method: "post",
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.log(result);
        if (result.auth) {
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token",JSON.stringify(result.auth));
            Navigate("/");
        } else{
            alert("Enter correct credentials");
        }
    }

    useEffect((Navigate)=>{
        const auth  = localStorage.getItem("user");
        if(auth){
            Navigate("/");
        }
    },[])
    return (
        <div className="outerDiv">
            <h1>
                Log In
            </h1>
            <Box className="muiBox">
                <EmailIcon sx={{ color: 'action.active', mr: 1,mt:2 }} />
                <TextField  onChange={(e) => setEmail(e.target.value)} className="textField"
                 value={email} label="Email"
                    variant="standard" />
            </Box>
            <Box className="muiBox">
                <KeyRoundedIcon sx={{ color: 'action.active', mr: 1,mt:2 }} />
                <TextField  onChange={(e) => setPassword(e.target.value)} className="textField"
                 value={password} label="Password" type="password"
                    variant="standard" />
            </Box>
            {/* <input className="inputBox" type="email"
                value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Email" />
            <input className="inputBox" type="password"
                value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="Password" /> */}
            <button onClick={handleLogIn} className=" signUpBtn btn btn-md btn-primary"
                type="submit">Log In</button>
                <br/>
                <br/>
                <h6>Create an account</h6>
                <Link to="/signup"> Sign Up
                </Link>
        </div>
    );
}
export default LogIn;