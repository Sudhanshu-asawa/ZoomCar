import Header from "./include/nav_user";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import "./css/css/bootstrap.css";
import "./css/css/responsive.css";



function Listing() {
    const [cars, setCars] = useState([]);
    const navigate = useNavigate(); //navigation
    const [carss, setCarss] = useState([]);

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
        fetch('http://localhost:8000/api/rentData')
            .then(response => response.json())
            .then(data => setCars(data))
            .catch(error => console.error(error));
        fetch('http://localhost:8000/api/rentDataO')
            .then(response => response.json())
            .then(data => setCarss(data))
            .catch(error => console.error(error));



    }, []);

    const handleRent = (id,price) => {
        // Redirect to the ContactForm page with the contact id as a query parameter and isEdit set to true
        localStorage.setItem("price", JSON.stringify(price));
        window.location.href = `/rentForm/${id}`;
    };


    return (
        <div>
            <Header/>
            <div className="App">
                <section class="section-content padding-y">
                    <div class="container">
                        <div class="row">
                            <main class="">
                                <header class="border-bottom mb-4 pb-3">
                                    <div class="form-inline">
                                        <span class="mr-md-auto">32 Items found </span>
                                        <select class="mr-2 form-control">
                                            <option>Latest items</option>
                                            <option>Trending</option>
                                            <option>Most Popular</option>
                                            <option>Cheapest</option>
                                        </select>
                                        <div class="btn-group">
                                            <a href="#" class="btn btn-outline-secondary" data-toggle="tooltip"
                                               title="List view">
                                                <i class="fa fa-bars"></i></a>
                                            <a href="#" class="btn  btn-outline-secondary active" data-toggle="tooltip"
                                               title="Grid view">
                                                <i class="fa fa-th"></i></a>
                                        </div>
                                    </div>
                                </header>
                                <div class="row">
                                    {cars.map(car =>

                                        <div class="col-md-4">
                                            <figure class="card card-product-grid">
                                                <div class="img-wrap">
                                                    {/*(handleAvail(car.availability))*/}
                                                    <span class="badge badge-danger">In Stock</span>
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
                                                    <a href="#" onClick={() => handleRent(car.id,car.price)} class="btn btn-block btn-primary">Rent Now</a>
                                                </figcaption>
                                            </figure>

                                        </div>
                                    )}
                                    {carss.map(car =>

                                        <div class="col-md-4">
                                            <figure class="card card-product-grid">
                                                <div class="img-wrap">
                                                    {/*(handleAvail(car.availability))*/}
                                                    <span class="badge badge-danger">Out of Stock</span>
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
                                                    <a href="#" onClick={() => handleRent(car.id,car.price)} class="btn btn-block btn-primary disabled">Rent Now</a>
                                                </figcaption>
                                            </figure>

                                        </div>
                                    )}
                                </div>
                                <nav class="mt-4" aria-label="Page navigation sample">
                                    <ul class="pagination">
                                        <li class="page-item disabled"><a class="page-link" href="#">Previous</a></li>
                                        <li class="page-item active"><a class="page-link" href="#">1</a></li>
                                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                                        <li class="page-item"><a class="page-link" href="#">Next</a></li>
                                    </ul>
                                </nav>
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

export default Listing