import React, {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useNavigate} from "react-router-dom";
import Header from "../include/nav";

function Create() {
    useEffect(() => {
        if (JSON.parse(localStorage.getItem('user_info'))) {
            const user = JSON.parse(localStorage.getItem('user_info'));
            if (user.isAdmin == false) {
                navigate('/logout');
            }
        } else {
            navigate('/login');
        }
    }, []);

    const [image, setPhoto] = useState(null);
    const [brand, setBrand] = useState("");
    const [price, setPrice] = useState("");
    const [fuel, setFuel] = useState("");
    const [model, setModel] = useState("");
    const [gearbox, setGearbox] = useState("");
    const [availability, setAvailability] = useState(0);
    const [errImage, setErrImage] = useState("");
    const [errPrice, setErrPrice] = useState("");
    const [errFuel, setErrFuel] = useState("");
    const [errGearbox, setErrGearbox] = useState("");

    const navigate = useNavigate(); //navigation

    const carPost = async (event) => {
        if (price < 1 || price > 100000) {
            alert('Invalid price. Price must be between 1 and 100,000.');
            return;
        }
        event.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        formData.append("brand", brand);
        formData.append("model", model);
        formData.append("price", price);
        formData.append("fuel", fuel);
        formData.append("gearbox", gearbox);
        formData.append('availability', availability);

        let result = await fetch("http://localhost:8000/api/carPost", {
            method: 'POST',
            body: formData
        })
            .catch(error =>{
                alert(error)
            })
        result = await result.json();
        console.warn("result", result);
        if(result.brand){
            alert("Car Regestered Successfully")
            navigate('/dashboard');
        }
        if (result.error) {
            alert("Invalid Data")
        }
        if (result.errors) {
            if (result.errors.price) {
                setErrPrice(result.errors.price[0])
            }
            if (result.errors.image) {
                setErrImage(result.errors.image[0])
            }
            if (result.errors.fuel) {
                setErrFuel(result.errors.fuel[0])
            }
            if (result.errors.gearbox) {
                setErrGearbox(result.errors.gearbox[0])
            }
        }
    }

    return (
        <div>
            <Header/>
            <div className={"container mt-5"}>
                <Form onSubmit={carPost} encType="multipart/form-data" className={"w-50 text-left mx-auto bg-light p-3"}>
                    <h2 className="font-weight-light">New Car Details</h2>
                    <Form.Group  className="mb-3 mt-5" controlId="formBasicBrand">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control required type="text" placeholder="Enter Brand Name" value={brand}
                                      onChange={(e) => setBrand(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicModel">
                        <Form.Label>Model</Form.Label>
                        <Form.Control required type="text" placeholder="Enter Model" value={model}
                                      onChange={(e) => setModel(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPrice">
                        <Form.Label>Price Per day</Form.Label>
                        <Form.Control required type="integer" placeholder="Enter Price" value={price}
                                      onChange={(e) => setPrice(e.target.value)}/>
                        <span className="text-danger">{errPrice}</span>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicFuel">
                        <Form.Label>Fuel</Form.Label>
                        <Form.Select required value={fuel} onChange={(e) => setFuel(e.target.value)} aria-label="Default select example">
                            <option >SELECT FUEL TYPE</option>
                            <option value="Petrol">Petrol</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Electric">Electric</option>
                        </Form.Select>
                        <span className="text-danger">{errFuel}</span>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicGearbox">
                        <Form.Label>Gearbox</Form.Label>
                        <Form.Select required value={gearbox} onChange={(e) => setGearbox(e.target.value)} aria-label="Default select example">
                            <option >SELECT GEARBOX</option>
                            <option value="AMT">AMT</option>
                            <option value="Manual">Manual</option>
                            <option value="CVT">CVT</option>
                        </Form.Select>
                        <span className="text-danger">{errGearbox}</span>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicModel">
                        <Form.Label>Availability</Form.Label>
                        <Form.Check className="ml-4" type="checkbox" checked={availability}
                                    onChange={(e) => setAvailability(Number(e.target.checked))}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formFile">
                        <Form.Label>Upload Image</Form.Label>
                        <Form.Control required type="file" onChange={(e) => setPhoto(e.target.files[0])}/>
                        <span className="text-danger">{errImage}</span>
                    </Form.Group>

                    <Button type={"submit"} variant="primary">
                        Create
                    </Button>
                </Form>

                <footer class="section-footer border-top padding-y">
                    <div class="container">
                        <p class="float-md-right">
                            &copy; Copyright 2021 All rights reserved
                        </p>
                        <p>
                            <a href="#">Terms and conditions</a>
                        </p>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default Create