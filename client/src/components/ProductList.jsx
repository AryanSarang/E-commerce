import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';



const ProductList = () => {
    const [products, setProducts] = useState([]);
    const Navigate = useNavigate();

    useEffect(() => {
        getProducts();

    }, [])

    const getProducts = async () => {
        let result = await fetch("/products", {
            headers: {
                "authorization": `bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })
        result = await result.json();
        setProducts(result);

    }

    const deleteProduct = async (id) => {
        let result = await fetch("/product/" + id, {
            method: "Delete",
            headers: {
                "authorization": `bearer ${JSON.parse(localStorage.getItem("token"))}`,
            }
        });
        result = result.json();
        getProducts();

    }

    const searchHandle = async (e) => {
        let key = e.target.value;
        if (key) {
            let result = await fetch("/search/" + key, {
                headers: {
                    "authorization": `bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
            });
            result = await result.json();
            if (result) {
                setProducts(result);
            }
        } else {
            getProducts();
        }


    }

    return (
        <div className="outerDiv">
            <h1>Products list</h1>

            <Input type="text" startAdornment={
                <InputAdornment position="start">
                    <SearchIcon color="primary" className="icon" />
                </InputAdornment>
            } className="searchBox" placeholder="Search" onChange={searchHandle} />
            <table className="table table-hover ">
                <thead className="tableHead">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Category</th>
                        <th scope="col">Company</th>
                        <th scope="col">Operation</th>

                    </tr>
                </thead>
               
                {products.length > 0 ? products.map((item, index) =>
                    <tbody  key={item._id}>
                        <tr >
                            <th scope="row">{index + 1}</th>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.category}</td>
                            <td>{item.company}</td>
                            <td><button className="listBtn  btn btn-light"
                                onClick={() => Navigate("/updateproduct/" + item._id)}><EditIcon /></button>
                                <button className="listBtn  btn btn-light"
                                    onClick={() => deleteProduct(item._id)}><DeleteIcon />
                                </button></td>
                        </tr>
                    </tbody>) : <h2>There is no product</h2>}

            </table>

        </div>
    );
}

export default ProductList;