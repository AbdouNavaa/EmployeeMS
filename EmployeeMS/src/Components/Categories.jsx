import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Categories = () => {
    const [category, setCategory] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3000/auth/categories')
        .then(result =>{
            if (result.data.Status) {
                
                setCategory(result.data.Result);
                console.log(category);
            } else {
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err))

    }, [])

    return (
        <div className='px-5 mt-3'>
            <div className='d-flex justify-contenet-center'>
                <h3>Categories List</h3>
            </div>
            <Link to='/dashboard/add_category' className='btn btn-primary'>Add Category</Link>
            <div className='mt-3'>
                <table className='table'>
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            category.map(c =>(
                                <tr key={c.id}>
                                    <td>{c.id}</td>
                                    <td>{c.name}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Categories