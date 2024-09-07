import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditEmployee = () => {
    const { id } = useParams()
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        salary: '',
        address: '',
        category_id: '',
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

        axios.get('http://localhost:3000/auth/employee/' + id)
            .then(result => {
                setEmployee({
                    ...employee,
                    name: result.data.Result[0].name,
                    email: result.data.Result[0].email,
                    address: result.data.Result[0].address,
                    salary: result.data.Result[0].salary,
                    category_id: result.data.Result[0].category_id,
                })
            })
            .catch(err => {
                console.log(err)
            })


    }, [])
    const navigate = useNavigate()
    const handleSubmit = (e) =>{
        e.preventDefault()
        axios.put('http://localhost:3000/auth/edit_employee/' + id, employee)
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

                <h2 className='text-center'>Edit Employee</h2>
                <form className='row g-1' onSubmit={handleSubmit}>
                    <div className='col-12'>
                        <label htmlFor="inputName" className='form-label'>Name</label>
                        <input type="text" id="inputName" placeholder="Enter Name"
                            onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
                            value={employee.name}
                            className='form-control rounded-0' />
                    </div>

                    <div className='col-12'>
                        <label htmlFor="inputEmail4" className='form-label'>Email</label>
                        <input type="email" id="inputEmail4" placeholder="Enter Email"
                            autoComplete='off'
                            onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
                            value={employee.email}
                            className='form-control rounded-0' />
                    </div>



                    <div className='col-12'>
                        <label htmlFor="inputSalary" className='form-label'>Salary</label>
                        <input type="text" id="inputSalary" placeholder="Enter Salary" autoComplete='off'
                            onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}
                            value={employee.salary}
                            className='form-control rounded-0' />
                    </div>

                    <div className='col-12'>
                        <label htmlFor="inputAddress" className='form-label'>Address</label>
                        <input type="text" id="inputAddress" placeholder="Enter Address" autoComplete='off'
                            onChange={(e) => setEmployee({ ...employee, address: e.target.value })}
                            value={employee.address}
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


                    <div className='col-12'>
                        <button className='btn btn-primary w-100 '>Edit  Employee</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default EditEmployee