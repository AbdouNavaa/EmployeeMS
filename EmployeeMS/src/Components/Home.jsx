import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Home = () => {
    const [adminTotal, setAdminTotal] = useState(0)
    const [employeeTotal, setemployeeTotal] = useState(0)
    const [salaryTotal, setSalaryTotal] = useState(0)
    const [admins, setAdmins] = useState([])

    useEffect(() => {
        adminCount();
        employeeCount();
        salaryCount();
        AdminReccords();
    }, [])
    
    const AdminReccords = () => {
        axios.get('http://localhost:3000/auth/admin_reccords')
        .then(result =>{
            if (result.data.Status) {
                
                setAdmins(result.data.Result);
            } else {
                alert(result.data.Error)
            }
        })
    }
    const adminCount = () =>{
        axios.get('http://localhost:3000/auth/admin_count')
        .then(result =>{
            if (result.data.Status) {
                
                setAdminTotal(result.data.Result[0].admin);
            } else {
                alert(result.data.Error)
            }
        })
    }
    const employeeCount = () =>{
        axios.get('http://localhost:3000/auth/employee_count')
        .then(result =>{
            if (result.data.Status) {
                
                setemployeeTotal(result.data.Result[0].employee);
            } else {
                alert(result.data.Error)
            }
        })
    }
    const salaryCount = () =>{
        axios.get('http://localhost:3000/auth/salary_count')
        .then(result =>{
            if (result.data.Status) {
                
                setSalaryTotal(result.data.Result[0].salary);
            } else {
                alert(result.data.Error)
            }
        })
    }
    return (
        <div>
            <div className='p-3 d-flex justify-content-around mt-3'>
                <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
                    <div className='text-center pb-1'>
                        <h4>Admin</h4>
                    </div>
                    <hr />

                    <div className='d-flex justify-content-between'>
                        <h5>Totals: </h5>
                        <h5>{adminTotal}</h5>
                    </div>
                </div>

                <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
                    <div className='text-center pb-1'>
                        <h4>Employee</h4>
                    </div>
                    <hr />

                    <div className='d-flex justify-content-between'>
                        <h5>Totals: </h5>
                        <h5>{employeeTotal}</h5>
                    </div>
                </div>

                <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
                    <div className='text-center pb-1'>
                        <h4>Salary</h4>
                    </div>
                    <hr />

                    <div className='d-flex justify-content-between'>
                        <h5>Totals: </h5>
                        <h5>{salaryTotal}</h5>
                    </div>
                </div>
            </div>

            <div className='mt-4 px-4 pt-3'>
                <h3>List of Admins</h3>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            admins.map(a =>(
                                <tr key={a.id}>
                                    <td>{a.email}</td>
                                    <td><button className='btn btn-success btn-sm me-2'>Edit</button>
                                    <button className='btn btn-danger btn-sm' >Delete</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home