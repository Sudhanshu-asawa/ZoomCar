
import './App.css';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Dashboard from './Pages/Dashboard/Dashboard';
import Listing from './Pages/Listing';
import CarCreate from './Pages/Dashboard/CarCreate';
import CarEdit from './Pages/Dashboard/CarEdit';
import RentForm from "./Pages/rentForm";
import Home from "./Pages/homePage";
import Logout from "./Pages/include/logout"
import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/'} element={<Signup/>}/>
                    <Route path={'/signup'} element={<Signup/>}/>
                    <Route path={'/dashboard'} element={<Dashboard/>}/>
                    <Route path={'/listing'} element={<Listing/>}/>
                    <Route path={'/carcreate'} element={<CarCreate/>}/>
                    <Route path={'/caredit/:id'} element={<CarEdit/>}/>
                    <Route path={'/rentForm/:id'} element={<RentForm/>}/>
                    <Route path={'/home'} element={<Home/>}/>
                    <Route path={'/logout'} element={<Logout/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
