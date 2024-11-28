import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateProduct = () => {

    const [name, SetName] = React.useState('');
    const [price, SetPrice] = React.useState('');
    const [category, SetCategory] = React.useState('');
    const [company, SetCompany] = React.useState('');
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        console.warn(params)
        getProductDetail();
    }, [])

    const getProductDetail = async () => {
        console.warn(params)
        let result = await fetch(`${window.location.origin}/product/${params.id}`, {
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        SetName(result.name)
        SetPrice(result.price)
        SetCategory(result.category)
        SetCompany(result.company)
    }

    const updateProduct = async () => {
        console.warn(name, price, category, company)
        let result = await fetch(`${window.location.origin}/product/${params.id}`, {
            method: 'Put',
            body: JSON.stringify({ name, price, category, company }),
            headers:{
                'Content-Type':"application/json",
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`

            }
        });
       result = await result.json()
       console.warn(result)
       navigate('/')

    }

    return (
        <div className='product'>
            <h1>UpdateProduct</h1>
            <input className='inputBox' type='text' placeholder='Enter product name'
                value={name} onChange={(e) => { SetName(e.target.value) }}
            />
            <input className='inputBox' type='text' placeholder='Enter product price'
                value={price} onChange={(e) => { SetPrice(e.target.value) }}
            />
            <input className='inputBox' type='text' placeholder='Enter product category'
                value={category} onChange={(e) => { SetCategory(e.target.value) }}
            />
            <input className='inputBox' type='text' placeholder='Enter product company'
                value={company} onChange={(e) => { SetCompany(e.target.value) }}
            />
            <button onClick={updateProduct} className='appButton' >Update product</button>
        </div>

    )

}

export default UpdateProduct;