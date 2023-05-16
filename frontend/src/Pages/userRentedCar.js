import Header from "./include/nav_user";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import "./css/css/bootstrap.css";
import "./css/css/responsive.css";

function RentedCar() {
    const [cars, setCars] = useState([]);
    const navigate = useNavigate(); //navigation

    useEffect(() => {

        const user = JSON.parse(localStorage.getItem('user_info'));
        if(JSON.parse(localStorage.getItem('user_info'))){
            const user = JSON.parse(localStorage.getItem('user_info'));
            if(user.isAdmin==true){
                navigate('/logout');
            }
        }
        else{
            navigate('/login');
        }
        fetch(`http://localhost:8000/api/userRentCar/${user.userid}`)
            .then(response => response.json())
            .then(data => setCars(data))
            .catch(error => console.error(error));

    }, []);
    const handleEnd = async (id) => {
        const confirmed = window.confirm('Are you sure you want to end this rent?');
        if (confirmed) {
            let result =await fetch(`http://localhost:8000/api/carRentDelete/${id}`, {
                method: 'DELETE',
            })
            result = await result.json();
            console.warn("result", result.success);
            window.location.href = '/listing';
        }
    }
    


    return (
        <div>
            <Header/>
            <div className="App">
                <section class="section-content padding-y">
                    <div class="container">
                        <div class="row">
                            <main class="">
                                <header class="border-bottom mb-4 pb-3">
                                    <h2 className="text-center font-weight-bold ">RENTED CAR BY YOU!!</h2>
                                </header>
                                <div class="row">
                                    {cars.map(car =>

                                        <div class="col-md-4">
                                            <figure class="card card-product-grid">
                                                <div class="img-wrap">
                                                    <span class="badge badge-danger">End now</span>
                                                    <img width="100px"
                                                         src={`http://localhost:8000/storage/images/${car.image}`}/>
                                                </div>
                                                <figcaption class="info-wrap">
                                                    <div class="fix-height h-100 ">
                                                        <span className="price">Brand:  </span>
                                                        <span className="">{car.brand}</span>
                                                        <div class="price-wrap">
                                                            <span className="price">Model:  </span>
                                                            <span className="">{car.model}</span>
                                                        </div>
                                                        <div class="price-wrap">
                                                            <span className="price">Rent Duration:  </span>
                                                            <span className="">{car.rent_duration}</span>
                                                        </div>
                                                        <div class="price-wrap">
                                                            <span className="price">Return Date:  </span>
                                                            <span className="">{car.return_date}</span>
                                                        </div>
                                                        <div className="price-wrap">
                                                            <span className="price">GearBox:  </span>
                                                            <span className="">{car.gearbox}</span>
                                                        </div>
                                                        <div className="price-wrap">
                                                            <span className="price">Fuel:  </span>
                                                            <span className="">{car.fuel}</span>
                                                        </div>
                                                        <div class="price-wrap mt-2">
                                                            <span class="price">{car.price}</span>
                                                            <del class="price-old">{car.price + 2000}</del>
                                                        </div>
                                                    </div>
                                                    <a href="#" onClick={() => handleEnd(car.id)} class="btn btn-block btn-primary">End Now</a>
                                                </figcaption>
                                            </figure>

                                        </div>
                                    )}
                                </div>
                            </main>
                        </div>
                    </div>
                </section>

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

export default RentedCar
