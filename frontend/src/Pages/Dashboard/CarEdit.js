import React, {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useNavigate, useParams} from "react-router-dom";
import Header from "../include/nav";
import axios from 'axios';
import Swal from 'sweetalert2';

function Update() {

    const { id } = useParams()
    useEffect(()=>{
       if(JSON.parse(localStorage.getItem('user_info'))){
                const user = JSON.parse(localStorage.getItem('user_info'));
                if(user.isAdmin==false){
                    navigate('/logout');
                }
            }
            else{
                navigate('/login');
            }
        fetchCars()
    },[])



    const [image, setPhoto] = useState(null);
    const [brand, setBrand] = useState("");
    const [price, setPrice] = useState("");
    const [fuel, setFuel] = useState("");
    const [model, setModel] = useState("");
    const [gearbox, setGearbox] = useState("");
    const [availability, setAvailability] = useState(0);

    const navigate = useNavigate(); //navigation

    const fetchCars = async () => {
        await axios.get(`http://localhost:8000/api/carData/${id}`).then(({data})=>{
            const { brand,price,fuel,model,gearbox,availability,image } = data
            setBrand(data.brand)
            setPrice(data.price)
            setFuel(data.fuel)
            setModel(data.model)
            setGearbox(data.gearbox)
            setAvailability(data.availability)
            setPhoto(data.image)
        }).catch(({response:{data}})=>{
            Swal.fire({
                text:data.message,
                icon:"error"
            })
        })
    }
    const carUpdate = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        formData.append("brand", brand);
        formData.append("model", model);
        formData.append("price", price);
        formData.append("fuel", fuel);
        formData.append("gearbox", gearbox);
        formData.append('availability', availability);

        let result = await fetch(`http://localhost:8000/api/carUpdate/${id}`, {
            method: 'POST',
            body:formData
        });
        result = await result.json();
        console.warn("result",result);
        navigate('/dashboard')
        // localStorage.setItem("car-info", JSON.stringify(result));



    }

    return (
        <div>
            <Header/>
            <div className={"container mt-5"}>
                <Form onSubmit={carUpdate} encType="multipart/form-data" className={"w-50 text-left mx-auto bg-light p-3"}>
                    <h2 className="font-weight-light">Edit Car Details</h2>
                    <Form.Group className="mb-3 mt-5" controlId="formBasicBrand">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control type="text" placeholder="Enter Brand Name" value={brand}
                                      onChange={(e) => setBrand(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicModel">
                        <Form.Label>Model</Form.Label>
                        <Form.Control type="text" placeholder="Enter Model" value={model}
                                      onChange={(e) => setModel(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPrice">
                        <Form.Label>Price Per day</Form.Label>
                        <Form.Control type="integer" placeholder="Enter Price" value={price}
                                      onChange={(e) => setPrice(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicFuel">
                        <Form.Label>Fuel</Form.Label>
                        <Form.Select value={fuel} onChange={(e) => setFuel(e.target.value)} aria-label="Default select example">
                            <option value="Petrol">Petrol</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Electric">Electric</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicGearbox">
                        <Form.Label>Gearbox</Form.Label>
                        <Form.Select value={gearbox} onChange={(e) => setGearbox(e.target.value)} aria-label="Default select example">
                            <option value="AMT">AMT</option>
                            <option value="Manual">Manual</option>
                            <option value="CVT">CVT</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicModel">
                        <Form.Label>Availability</Form.Label>
                        <Form.Check type="checkbox"  checked={availability} onChange={(e) => setAvailability(Number(e.target.checked))}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formFile">
                        <Form.Label>Upload Image</Form.Label>
                        <Form.Control type="file"  onChange={(e) => setPhoto(e.target.files[0])}/>
                    </Form.Group>

                    <Button type={"submit"} variant="primary">
                        Edit
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default Update