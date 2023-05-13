import React, {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useNavigate} from "react-router-dom";
import Header from "./include/Header";


function Signup() {
    useEffect(() => {

        if (JSON.parse(localStorage.getItem('user_info'))) {
            const user = JSON.parse(localStorage.getItem('user_info'));
            if (user.isAdmin == true) {
                navigate('/dashboard');
            } else {
                navigate('/listing');
            }
        }

    }, []);

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [errName, setErrName] = useState("");
    const [errEmail, setErrEmail] = useState("");
    const [errPass, setErrPass] = useState("");
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
            .catch(error => console.error(error))

        result = await result.json();
        // console.warn("result", result);
        if (result.name) {
            localStorage.setItem("user_info", JSON.stringify(result));
            if (result.isAdmin) {
                navigate("/dashboard");
            } else {
                navigate("/listing");
            }
        }
        if (result.error) {
            alert("Invalid Data")
        }
        if (result.errors) {
            if (result.errors.name) {
                setErrName(result.errors.name[0])
            }

            if (result.errors.email) {
                setErrEmail(result.errors.email[0])
            }
            if (result.errors.password) {
                setErrPass(result.errors.password[0])
            }
        }


    }

    return (
        <div>
            <Header/>
            <div className={"container mt-5"}>
                <Form onSubmit={signupPost} className={"w-50 text-left mx-auto bg-light p-3"}>
                    <h2 className="font-weight-light">SignUp</h2>
                    <Form.Group className="mb-3 mt-5" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control required type="text" name="name" placeholder="Enter name" value={name}
                                      onChange={(e) => setName(e.target.value)}/>
                        <span className="text-danger">{errName}</span>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control required name="email" type="email" placeholder="Enter email" value={email}
                                      onChange={(e) => setEmail(e.target.value)}/>
                        <span className="text-danger">{errEmail}</span>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required name="password" type="password" placeholder="Password" value={password}
                                      onChange={(e) => setPassword(e.target.value)}/>
                        <span className="text-danger">{errPass}</span>

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