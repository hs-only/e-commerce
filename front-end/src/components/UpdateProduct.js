import React, { useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [error, setError] = React.useState(false);
    const params = useParams();
    const navigate=useNavigate();
    //useeffect
    useEffect(() => {
        getProductDetails();
    }, []);

    const getProductDetails = async () => {
    let result = await fetch(`http://localhost:5000/product/${params.id}`,{
        headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
    });
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }
    // Trim white spaces and convert to lowercase
    const trimmedName = name.trim().toLowerCase();
    const trimmedPrice = price.trim();
    const trimmedCategory = category.trim().toLowerCase();
    const trimmedCompany = company.trim().toLowerCase();

    // Validate price
    const isNumber = !isNaN(Number(trimmedPrice));

    //handle update product
    const updateProduct = async () => {
        if (!trimmedName || !trimmedPrice || !trimmedCategory || !trimmedCompany || !isNumber) {
            setError(true);
            return false;
        }
        
        let result=await fetch(`http://localhost:5000/product/${params.id}`,{
            method:'put',
            body:JSON.stringify({ name: trimmedName, price: trimmedPrice, category: trimmedCategory, company: trimmedCompany}),
            headers:{
                'Content-Type':'application/json',
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        navigate('/');
    }

    return (
        <div className="product">
            <h2>Update Product</h2>
            <input type="text" placeholder="Enter Product Name" className="inputBox"
                value={name} onChange={(e) => { setName(e.target.value) }} />
            {error && !trimmedName && <span className="invalid-input">Enter valid Name</span>}

            <input type="text" placeholder="Enter Product Price" className="inputBox"
                value={price} onChange={(e) => { setPrice(e.target.value) }} />
            {error && (!trimmedPrice || isNaN(Number(trimmedPrice))) && <span className="invalid-input">Enter valid price</span>}

            <input type="text" placeholder="Enter Product Category" className="inputBox"
                value={category} onChange={(e) => { setCategory(e.target.value) }} />
            {error && !trimmedCategory && <span className="invalid-input">Enter valid category</span>}

            <input type="text" placeholder="Enter Product Company" className="inputBox"
                value={company} onChange={(e) => { setCompany(e.target.value) }} />
            {error && !trimmedCompany && <span className="invalid-input">Enter valid company</span>}

            <button onClick={updateProduct} type="button" className="appButton">Update Product</button>
        </div>
    )
}

export default UpdateProduct;

