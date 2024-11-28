import React from 'react'
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {

    const [name, SetName] = React.useState('');
    const [price, SetPrice] = React.useState('');
    const [category, SetCategory] = React.useState('');
    const [company, SetCompany] = React.useState('');
    const [error, setError] = React.useState(false)
    const navigate = useNavigate();


    const addProduct = async () => {

        console.warn(!name)

        if (!price || !name || !category || !company) {
            setError(true)
            return false;
        }
        console.warn(name, price, category, company)
        const userId = JSON.parse(localStorage.getItem('user'))._id;

        let result = await fetch(`${window.location.origin}/add-product`, {
            method: 'post',
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                "Content-Type": "application/json",
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`

            }
        })
        result = await result.json();
        console.warn(result)
        navigate('/')
        

    }

    return (
        <div className='product'>
            <h1>AddProduct</h1>
            <input className='inputBox' type='text' placeholder='Enter product name'
                value={name} onChange={(e) => { SetName(e.target.value) }}
            />

            {error && !name && <span className='invalid-input'>Enter valid name</span>}

            <input className='inputBox' type='text' placeholder='Enter product price'
                value={price} onChange={(e) => { SetPrice(e.target.value) }}
            />

            {error && !price && <span className='invalid-input'>Enter valid price</span>}


            <input className='inputBox' type='text' placeholder='Enter product category'
                value={category} onChange={(e) => { SetCategory(e.target.value) }}
            />

            {error && !category && <span className='invalid-input'>Enter valid category</span>}

            <input className='inputBox' type='text' placeholder='Enter product company'
                value={company} onChange={(e) => { SetCompany(e.target.value) }}
            />

            {error && !company && <span className='invalid-input'>Enter valid company</span>}

            <button onClick={addProduct} className='appButton' >Add product</button>
        </div>

    )

}

export default AddProduct;