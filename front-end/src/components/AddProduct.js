import React from "react";

const AddProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [error, setError] = React.useState(false);

    // Trim white spaces and convert to lowercase
    const trimmedName = name.trim().toLowerCase();
    const trimmedPrice = price.trim();
    const trimmedCategory = category.trim().toLowerCase();
    const trimmedCompany = company.trim().toLowerCase();

    // Validate price
    const isNumber = !isNaN(Number(trimmedPrice));

    //handle add product
    const addProduct = async () => {
        if (!trimmedName || !trimmedPrice || !trimmedCategory || !trimmedCompany || !isNumber) {
            setError(true);
            return false;
        }

        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch('http://localhost:5000/add-product', {
            method: 'post',
            body: JSON.stringify({ name: trimmedName, price: trimmedPrice, category: trimmedCategory, company: trimmedCompany, userId }),
            headers: {
                'Content-Type': 'application/json',
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        console.warn(result);
    }

    return (
        <div className="product">
            <h3>Add Product</h3>
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

            <button onClick={addProduct} type="button" className="appButton">Add Product</button>
        </div>
    )
}

export default AddProduct;
