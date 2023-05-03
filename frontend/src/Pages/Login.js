import React, {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useNavigate} from "react-router-dom";
import Header from "./include/Header";
import nav from "./include/nav";

function Login() {

    useEffect(() => {

        if(JSON.parse(localStorage.getItem('user_info'))){
            const user = JSON.parse(localStorage.getItem('user_info'));
            if(user.isAdmin==true){
                navigate('/dashboard');
            }
            else{
                navigate('/listing');
            }
        }

    }, []);

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate(); //navigation

    const loginPost = async (event) => {
        event.preventDefault();

        let item = {password, email};
        console.warn(email, password)
        let result = await fetch("http://localhost:8000/api/login", {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify(item)
        })
        result = await result.json();
        console.warn("result", result);
        console.warn("result", result.name);
        if(result.name){
            localStorage.setItem("user_info", JSON.stringify(result));
            if(result.isAdmin){
                navigate("/dashboard");
            }
            else {
                navigate("/listing");
            }
        }
    }

    return (
        <div>
            <Header/>

            <div className={"container mt-5"}>

                <Form onSubmit={loginPost} className={"w-50 text-left mx-auto bg-light p-3"}>
                    <h2 className="font-weight-light">Login</h2>
                    <Form.Group className="mb-3 mt-5" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control name="email" type="email" placeholder="Enter email" value={email}
                                      onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password" placeholder="Password" value={password}
                                      onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>
                    <Button type={"submit"} variant="primary">
                        Login
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default Login