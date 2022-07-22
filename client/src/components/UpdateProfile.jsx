import { React, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

const UpdateProfile = () => {

    let auth = localStorage.getItem("user");
    auth = JSON.parse(auth);
    const name = auth.name;
    const email = auth.email;
    const Navigate = useNavigate();


    const params = useParams();
    const [newImage, setNewImage] = useState();
    const [newSrc, setNewSrc] = useState("https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8=");

    useEffect(() => {
        getImage();
    }, [])
    const getImage = async () => {
        let result = await fetch("http://localhost:3001/profile/" + auth._id);
        result = await result.json();
        console.log(result);
        if (result.length > 1) {
            setNewSrc("http://localhost:3001/" + result);
        }
    }

    const handleChange = (e) => {
        setNewImage(e.target.files[0]);
        console.log(e.target.files[0]);
        console.log(newImage);
    }

    const uploadPicture = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("image", newImage);
        let result = await fetch("http://localhost:3001/profile/" + params.id, {
            method: "Put",
            body: data,

        });
        result = await result.json();
        console.log(newImage);
        console.log(result);
        Navigate("/profile");
    }

    return (
        <div className="outerDiv">


            <h1>Hello {name}</h1>
            <h6>{email}</h6>
            <img className="profilePic" src={newSrc} alt="Profile Picture" width="150" height="150" />
            <br />
            <form onSubmit={uploadPicture}>
                <input type="file" name="myImage" accept="image/*" onChange={handleChange} />
                <br/>
                <button type="submit" className="signUpBtn btn btn-md btn-secondary signUpBtn"><ChangeCircleIcon sx={{ fontSize: 40 }} /></button>
            </form>
        </div>
    )
}
export default UpdateProfile;