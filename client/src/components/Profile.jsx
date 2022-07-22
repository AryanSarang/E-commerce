import { React, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddAPhotoSharpIcon from '@mui/icons-material/AddAPhotoSharp';

const Profile = () => {

    const storedUser = localStorage.getItem("user");
    const name = JSON.parse(storedUser).name;
    const email = JSON.parse(storedUser).email;
    const params = useParams();
    const Navigate = useNavigate();
    let auth = localStorage.getItem("user");
    auth = JSON.parse(auth);
    const [newSrc, setNewSrc] = useState("https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8=");

    useEffect(() => {
        getImage();
    }, [])



    const getImage = async () => {
        let result = await fetch("http://localhost:3001/profile/" + auth._id);
        result = await result.json();
        console.log(result);
        if(result.length>0)
           { 
            setNewSrc("http://localhost:3001/" + result);
        }
        
    }

    return (
        <div className="outerDiv">
            <h1>Hello {name}</h1>
            <img src={newSrc} className="profilePic" alt="Profile" width="150" height="150" />

            <h6>Email: {email}</h6><br/>
            <h5>Update Profile Picture</h5>
            <button className="signUpBtn btn btn-md btn-secondary signUpBtn " onClick={() => Navigate("/profile/" + auth._id)}><AddAPhotoSharpIcon sx={{fontSize: 50}} /></button>

        </div>
    )
}
export default Profile;