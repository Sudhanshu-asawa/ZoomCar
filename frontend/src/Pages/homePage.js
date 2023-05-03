import React, {useEffect, useState} from 'react';
import Header from "./include/nav_user";
import "./css/home.css"

import {Button} from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import {useNavigate} from "react-router-dom";

function Home() {
    const [cars, setCars] = useState([]);
    const navigate = useNavigate(); //navigation

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
    return (
        <div>
            <Header/>
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="img/car1.jpg"
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="img/car2.jpg"
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="img/car3.jpg"
                        alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
            <h3 className="font-italic text-center p-4 bg-dark text-light">Rent Your Dream Car !! With ZoomCar</h3>
            <article className="banner">
                <img
                    className="d-block w-100"
                    src="img/car4.jpg"
                    alt="Third slide"
                />
            </article>
            <p className="banner-text">The Only Solution for </p>
            <p className="banner-text"> for </p>
            <p className="banner-text"> Your Next Trip</p>

        </div>
    );
}

export default Home;