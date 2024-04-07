import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
    const [searchKey,setSearchkey]=useState('');
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products',{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setProducts(result);
    };

    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: 'Delete',
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if (result)
            getProducts();
    }
    const searchHandle=async ()=>{
        const key=searchKey.trim().toLowerCase();
        if(!key)
        getProducts();
        let result=await fetch(`http://localhost:5000/search/${key}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result=await result.json();
        if(result){
            setProducts(result);
        }
    }
    return (
        <div className="product-list">
            <h3>Product List</h3>
            <input className="search-box" type="text" placeholder="search"
            onChange={(e)=>setSearchkey(e.target.value)} onKeyDown={(e)=>{
                if(e.key=="Enter")searchHandle();
            }}
            />
            <ul>
                <li><strong>S.No</strong></li>
                <li><strong>Name</strong></li>
                <li><strong>Price</strong></li>
                <li><strong>Category</strong></li>
                <li><strong>Company</strong></li>
                <li><strong>Delete</strong></li>
                <li><strong>Update</strong></li>
            </ul>
            {
                products.length>0?products.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>${item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li><button className="deleteButton" onClick={() => deleteProduct(item._id)}>Delete</button></li>
                        <li> <button className="updateButton"><Link to={"/update/"+item._id}>Update</Link></button></li>
                    </ul>
                )
                :<h2>No Result Found!!!</h2>
            }
        </div>
    )
}

export default ProductList;