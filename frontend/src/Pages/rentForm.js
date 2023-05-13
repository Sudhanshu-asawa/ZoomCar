import Header from "./include/nav_user";
import React, {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useNavigate, useParams} from "react-router-dom";

function RentForm() {
    useEffect(() => {

        if(JSON.parse(localStorage.getItem('user_info'))){
            const user = JSON.parse(localStorage.getItem('user_info'));
            if(user.isAdmin==true){
                navigate('/logout');
            }
        }
        else{
            navigate('/login');
        }

    }, []);
    const {id} = useParams()
    const user = JSON.parse(localStorage.getItem('user_info'));
    const price = JSON.parse(localStorage.getItem('price'));

    const [rent_date, setRent_Date] = useState("");
    const [return_date, setReturn_Date] = useState("");
    const navigate = useNavigate(); //navigation

    const rentDateObj = new Date(rent_date);
    const returnDateObj = new Date(return_date);
    const timeDiff = returnDateObj.getTime() - rentDateObj.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24); // number of milliseconds in a day
    const totalPrice = daysDiff * price;

    const rentPost = async (event) => {
        if (totalPrice > 1450000) {
            alert("You cannot rent the car for that long.");
            return;
        }

        if (isNaN(totalPrice) || totalPrice < 0) {
            alert("Invalid price calculation. Please check the rent dates.");
            return;
        }
        event.preventDefault();
        const formData = new FormData();
        formData.append("userid", user.userid);
        formData.append("carid", id);
        formData.append("rental_date", rent_date);
        formData.append("return_date", return_date);
        formData.append('price', totalPrice);

        let result = await fetch("http://localhost:8000/api/rentDetails", {
            method: 'POST',
            body: formData
        })
            .catch((error)=>{
                alert("error")
            })
        result = await result.json();
        console.warn("result", result);
        if(result.carid){
            alert("Car Rented Successfully")
            navigate('/listing');
        }
        else{
            alert("Network error")
        }

    }
    const today = new Date().toISOString().split('T')[0];

    return (
        <div>
            <Header/>
            <div className={"container mt-5"}>
                <Form onSubmit={rentPost} encType="multipart/form-data" className={"w-50 text-left mx-auto bg-light p-3"}>
                    <h2 className="font-weight-light">Car Renting details</h2>
                    <Form.Group className="mb-3 mt-5" controlId="formBasicBrand">
                        <Form.Label>Rent Date</Form.Label>
                        <Form.Control required min={today} type="date" placeholder="Enter Rent Date" value={rent_date}
                                      onChange={(e) => setRent_Date(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicBrand">
                        <Form.Label>Return Date</Form.Label>
                        <Form.Control required min={rent_date || today} type="date" placeholder="Enter Return Date" value={return_date}
                                      onChange={(e) => setReturn_Date(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPrice">
                        <Form.Label>Price Per day</Form.Label>
                        <Form.Control disabled type="integer" placeholder="Enter Price" value={price}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPrice">
                        <Form.Label>Total Price</Form.Label>
                        <Form.Control disabled type="integer" placeholder="Enter Price" value={totalPrice}/>
                    </Form.Group>
                    <Button type={"submit"} variant="primary">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default RentForm