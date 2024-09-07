import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom'
const AddEmployee = () => {
    const navigate = useNavigate()
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        password: '',
        salary: '',
        address: '',
        category_id: '',
        image: '',
    })
    const [category, setCategory] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3000/auth/categories')
            .then(result => {
                if (result.data.Status) {

                    setCategory(result.data.Result);
                    console.log(category);
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))

    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('name', employee.name);
        formData.append('email', employee.email);
        formData.append('password', employee.password);
        formData.append('address', employee.address);
        formData.append('salary',employee.salary);
        formData.append('image', employee.image); // Le fichier image
        formData.append('category_id', employee.category_id);
        axios.post('http://localhost:3000/auth/add_employee', formData)
        .then(result => {
            if (result.data.Status) {
                navigate('/dashboard/employees')
            } else {
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err))

    }
    return (
        <div className='d-flex justify-content-center align-items-center mt-3'>
            <div className="p-3 rounded w-50 border">

                <h2 className='text-center'>Add Employee</h2>
                <form className='row g-1' onSubmit={handleSubmit}>
                    <div className='col-12'>
                        <label htmlFor="inputName" className='form-label'>Name</label>
                        <input type="text" id="inputName" placeholder="Enter Name"
                            onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
                            className='form-control rounded-0' />
                    </div>

                    <div className='col-12'>
                        <label htmlFor="inputEmail4" className='form-label'>Email</label>
                        <input type="email" id="inputEmail4" placeholder="Enter Email"
                            autoComplete='off'
                            onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
                            className='form-control rounded-0' />
                    </div>

                    <div className='col-12'>
                        <label htmlFor="inputPassword4" className='form-label'>Password</label>
                        <input type="password" id="inputPassword4" placeholder="Enter Password"
                            onChange={(e) => setEmployee({ ...employee, password: e.target.value })}
                            className='form-control rounded-0' />
                    </div>

                    <div className='col-12'>
                        <label htmlFor="inputSalary" className='form-label'>Salary</label>
                        <input type="text" id="inputSalary" placeholder="Enter Salary" autoComplete='off'
                            onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}
                            className='form-control rounded-0' />
                    </div>

                    <div className='col-12'>
                        <label htmlFor="inputAddress" className='form-label'>Address</label>
                        <input type="text" id="inputAddress" placeholder="Enter Address" autoComplete='off'
                            onChange={(e) => setEmployee({ ...employee, address: e.target.value })}
                            className='form-control rounded-0' />
                    </div>

                    <div className='col-12'>
                        <label htmlFor="category" className='form-label'>Category</label>
                        <select name='category_id' id='category_id' className='form-select'
                            onChange={(e) => setEmployee({ ...employee, category_id: e.target.value })} >
                            {
                                category.map((c) => {
                                    return <option key={c.id} value={c.id}>{c.name}</option>
                                })
                            }
                        </select>
                    </div>

                    <div className='col-12 mb-3'>
                        <label htmlFor="inputGroupFile01" className='form-label'>Select Image</label>
                        <input type="file" id="inputGroupFile01" name='image'
                            onChange={(e) => setEmployee({ ...employee, image: e.target.files[0] })}
                            className='form-control rounded-0' />
                    </div>

                    <div className='col-12'>
                        <button className='btn btn-primary w-100 '>Add Employee</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default AddEmployee