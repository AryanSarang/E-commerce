import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CategoryIcon from '@mui/icons-material/Category';
import BusinessIcon from '@mui/icons-material/Business';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

const AddProduct = () => {
    const Navigate = useNavigate();
    let [product, setProduct] = useState({
        name: "",
        price: "",
        category: "",
        company: ""
    });

    const [error, setError] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;

        setProduct(prevVal => {
            return {
                ...prevVal,
                [name]: value
            };
        });
    }

    const handleSubmit = async () => {
        const userId = JSON.parse(localStorage.getItem("user"))._id;
        product = { ...product, userId }

        if (!product.name || !product.price || !product.category || !product.company) {
            setError(true);
            return (false);
        }

        let result = await fetch("/add-product", {
            method: "post",
            body: JSON.stringify(product),
            headers: {
                "authorization": `bearer ${JSON.parse(localStorage.getItem("token"))}`,
                "Content-type": "application/json"
            }
        });
        result = await result.json();
        Navigate("/");
    }

    return (
        <div className="outerDiv">
            <h1>Add a product</h1>
            <br />
            <Box className="muiBox">
                <AccountCircle sx={{ color: 'action.active', mr: 1, mt: 2 }} />
                <TextField name="name" onChange={handleChange} className="textField " value={product.name} label="name"
                    variant="standard" />
            </Box>
            {error && !product.name && <span className="blankError">*name require</span>}

            <Box className="muiBox">
                <CurrencyRupeeIcon sx={{ color: 'action.active', mr: 1, mt: 2 }} />
                <TextField name="price" label="price" className="textField" value={product.price} onChange={handleChange}
                    variant="standard" />
            </Box>
            {error && !product.price && <span className="blankError">*price require</span>}

            <Box className="muiBox">
                <CategoryIcon sx={{ color: 'action.active', mr: 1, mt: 2 }} />
                <TextField name="category" label="category" value={product.category}
                    onChange={handleChange} className="textField" variant="standard" />
            </Box>
            {error && !product.category && <span className="blankError">*category require</span>}

            <Box className="muiBox">
                <BusinessIcon sx={{ color: 'action.active', mr: 1, mt: 2 }} />
                <TextField name="company" className="textField" label="company" value={product.company}
                    onChange={handleChange} variant="standard" />
            </Box>
            {error && !product.company && <span className="blankError">*company require</span>}

            <button onClick={handleSubmit} className="signUpBtn btn btn-md btn-secondary signUpBtn">Add</button>
        </div>
    );
}
export default AddProduct;