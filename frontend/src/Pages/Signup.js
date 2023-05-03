import React, {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useNavigate} from "react-router-dom";
import Header from "./include/Header";

function Signup() {
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

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate(); //navigation

    const signupPost = async (event) => {
        event.preventDefault();

        let item = {name, password, email};
        console.warn(name, email, password)
        let result = await fetch("http://localhost:8000/api/signup", {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify(item)
        })
        result = await result.json();
        console.warn("result", result);
        localStorage.setItem("user_info", JSON.stringify(result));
        navigate("/login");
    }

    return (
        <div>
            <Header/>
            <div className={"container mt-5"}>
                <Form onSubmit={signupPost} className={"w-50 text-left mx-auto bg-light p-3"}>
                    <h2 className="font-weight-light">SignUp</h2>
                    <Form.Group className="mb-3 mt-5" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" placeholder="Enter name" value={name}
                                      onChange={(e) => setName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
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
                        SignUp
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default Signup