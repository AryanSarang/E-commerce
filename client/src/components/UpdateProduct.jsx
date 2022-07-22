import { React, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CategoryIcon from '@mui/icons-material/Category';
import BusinessIcon from '@mui/icons-material/Business';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

const UpdateProduct = () => {
    const Navigate = useNavigate();
    let [product, setProduct] = useState({
        name: "",
        price: "",
        category: "",
        company: ""
    });

    const params = useParams();
    useEffect(() => {
        getProductDetails();
    }, [])

    const getProductDetails = async () => {

        let result = await fetch("/product/" + params.id, {
            headers: {
                "authorization": `bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        });
        result = await result.json();
        setProduct({
            name: result.name,
            price: result.price,
            category: result.category,
            company: result.company
        });
    }

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
        let result = await fetch("/product/" + params.id, {
            method: "Put",
            body: JSON.stringify(product),
            headers: {
                "authorization": `bearer ${JSON.parse(localStorage.getItem("token"))}`,
                "Content-Type": "application/json"
            }
        });
        result = await result.json();
        console.log(result);
        Navigate("/");
    }

    return (
        <div className="outerDiv">
            <h1>Update Product</h1>
            <br/>
            <Box className="muiBox">
                <AccountCircle sx={{ color: 'action.active', mr: 1, mt: 2 }} />
                <TextField name="name" onChange={handleChange} className="textField" value={product.name} label="name"
                    variant="standard" />
            </Box>

            <Box className="muiBox">
                <CurrencyRupeeIcon sx={{ color: 'action.active', mr: 1, mt: 2 }} />
                <TextField name="price" label="price" className="textField" value={product.price} onChange={handleChange}
                    variant="standard" />
            </Box>

            <Box className="muiBox">
                <CategoryIcon sx={{ color: 'action.active', mr: 1, mt: 2 }} />
                <TextField name="category" label="category" value={product.category}
                    onChange={handleChange} className="textField" variant="standard" />
            </Box>

            <Box className="muiBox">
                <BusinessIcon sx={{ color: 'action.active', mr: 1, mt: 2 }} />
                <TextField name="company" className="textField" label="company" value={product.company}
                    onChange={handleChange} variant="standard" />
            </Box>

            <button onClick={handleSubmit} className="signUpBtn btn btn-md btn-secondary signUpBtn">Update product</button>
        </div>
    )
}

export default UpdateProduct;