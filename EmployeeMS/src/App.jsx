import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Components/Login'
import { BrowserRouter , Route, Routes} from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
import Employees from './Components/Employees';
import Profile from './Components/Profile';
import Categories from './Components/Categories';
import AddCategory from './Components/AddCategory';
import AddEmployee from './Components/AddEmployee';
import EditEmployee from './Components/EditEmployee';


function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/adminlogin' element={<Login/>} ></Route>
      <Route path='/dashboard' element={<Dashboard/>} >
      <Route path='' element={<Home />}></Route>
      <Route path='/dashboard/employees' element={<Employees />}></Route>
      <Route path='/dashboard/categories' element={<Categories />}></Route>
      <Route path='/dashboard/profile' element={<Profile />}></Route>
      <Route path='/dashboard/add_category' element={<AddCategory />}></Route>
      <Route path='/dashboard/add_employee' element={<AddEmployee />}></Route>
      <Route path='/dashboard/edit_employee/:id' element={<EditEmployee />}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App 
