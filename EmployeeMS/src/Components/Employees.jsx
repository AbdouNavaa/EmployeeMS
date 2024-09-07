import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Employees = () => {
    const [employee, setEmployee] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3000/auth/employees')
        .then(result =>{
            if (result.data.Status) {
                
                setEmployee(result.data.Result);
                console.log(category);
            } else {
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err))

    }, [])

    const navigate = useNavigate()
    const handleDelete = (id) =>{
        axios.delete('http://localhost:3000/auth/delete_employee/' + id)
        .then(result => {
            if (result.data.Status) {
                window.location.reload()
                alert('Employee has Deleted Successfully!')

            } else {
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    }
    return (
        <div className='px-5 mt-3'>
            <div className='d-flex justify-contenet-center'>
                <h3>Employees List</h3>
            </div>
            <Link to='/dashboard/add_employee' className='btn btn-primary'>Add Employee</Link>
            <div className='mt-3'>
                <table className='table'>
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Image</th>
                        <th>EMail</th>
                        <th>Address</th>
                        <th>Salary</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employee.map(e =>(
                                <tr key={e.id}>
                                    <td>{e.name}</td>
                                    <td><img src={`http://localhost:3000/Images/`+e.image} className="employee_image" /></td>
                                    <td>{e.email}</td>
                                    <td>{e.address}</td>
                                    <td>{e.salary}</td>
                                    <td><Link to={`/dashboard/edit_employee/`+e.id} className='btn btn-success btn-sm me-2'>Edit</Link>
                                    <button className='btn btn-danger btn-sm' onClick={() => handleDelete(e.id)}>Delete</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Employees