import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Header from "../include/nav";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import '../css/css/dashboard.css'

function Dashboard() {
    const [cars, setCars] = useState([]);
    const navigate = useNavigate(); //navigation

    useEffect(() => {
        if(JSON.parse(localStorage.getItem('user_info'))){
            const user = JSON.parse(localStorage.getItem('user_info'));
            if(user.isAdmin==false){
                navigate('/logout');
            }
        }
        else{
            navigate('/login');
        }
        fetch('http://localhost:8000/api/carData')
            .then(response => response.json())
            .then(data => setCars(data))
            .catch(error => console.error(error));
    }, []);

    const carDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this car?');
        if (confirmed) {
            let result =await fetch(`http://localhost:8000/api/carDelete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': "application/json",
                    'Accept': 'application/json'
                }
            })
            result = await result.json();
            setCars(cars.filter((car) => car.id !== id));
            console.warn("result", result.success);
            navigate("/dashboard");
        }
    }
    const handleEdit = (id) => {
        // Redirect to the ContactForm page with the contact id as a query parameter and isEdit set to true
        window.location.href = `/caredit/${id}`;
    };

    return (
        <div className="">
            <Header />
            <div className="car-data-container">
                <h2 className="car-data-title w-75 mx-auto mt-5 p-2">Car Data</h2>
                <div className="table-container">
                    <Table striped bordered hover size="sm" className="w-75 mx-auto">
                        <thead>
                        <tr>
                            <th>Brand</th>
                            <th>Model</th>
                            <th>Price per day</th>
                            <th>Fuel Type</th>
                            <th>Gearbox</th>
                            <th>Image</th>
                            <th>Availability</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {cars.map((car) => (
                            <tr key={car.id}>
                                <td>{car.brand}</td>
                                <td>{car.model}</td>
                                <td>{car.price}</td>
                                <td>{car.fuel}</td>
                                <td>{car.gearbox}</td>
                                <td>
                                    <img
                                        className="car-image"
                                        src={`http://localhost:8000/storage/images/${car.image}`}
                                        alt="Car"
                                    />
                                </td>
                                <td>{car.availability}</td>
                                <td>
                                    <Button
                                        variant="secondary"
                                        onClick={() => carDelete(car.id)}
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        className="m-lg-1"
                                        variant="secondary"
                                        onClick={() => handleEdit(car.id)}
                                    >
                                        Edit
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>

    );
}

export default Dashboard