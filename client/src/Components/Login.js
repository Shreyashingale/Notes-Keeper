import React, { useState } from 'react'
import Navigationbar from './Navigationbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import loginImg from '../assets/images/loginImg.png'
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }


    async function loginUser(event) {
        event.preventDefault()
        const response = await fetch('https://notes-keeper-nine.vercel.app/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            })
        }


        )

        const data = await response.json();
        if (data.user) {
            localStorage.setItem('token', data.user);
            window.location.href = '/dashboard'
        }
        else{
            toast.warn("Please Enter Valid Credentials");
        }

    }
    return (
        <div>
            <Navigationbar />
            <ToastContainer position="top-center" />
            <div className='mainDiv'>
                <div>
                    <Form onSubmit={loginUser}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange} />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} />
                            <Form.Text className="text-muted">
                                Not Register ? <Link to="/" > Register</Link>.
                            </Form.Text>
                        </Form.Group>
                        <Button variant="dark" type="submit">
                            Login
                        </Button>

                    </Form>
                </div>
                <div>
                    <img className='imgDiv' src={loginImg} alt="" />
                </div>
            </div>

        </div >
    )
}

export default Register

//https://stackoverflow.com/questions/63412086/invalid-token-error-invalid-token-specified-cannot-read-property-replace-of