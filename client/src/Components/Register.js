import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navigationbar from './Navigationbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import registerImg from '../assets/images/registerImg.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleNameChange = (e) => {
        setName(e.target.value)
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    async function registerUser(event) {
        event.preventDefault()
        const response = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        }


        )

        const data = await response.json();
        if (data.status == 'ok') {
            navigate("/login", { replace: true })
        }
        else{
            toast.error("Please Enter All Input Fields!");
        }

    }
    return (
        <div>
            <Navigationbar />
            <ToastContainer position="top-center" />
            <div className='mainDiv'>
                <div>
                    <Form onSubmit={registerUser}>
                        <Form.Group className="mb-2 ml-50" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" onChange={handleNameChange} />
                        </Form.Group>
                        <Form.Group className="mb-2 ml-50" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} />
                        </Form.Group>

                        <Button variant="dark" type="submit">
                            Register
                        </Button>
                    </Form>
                </div>
                <div>
                    <img className='imgDiv' src={registerImg} alt="" />
                </div>
            </div>

        </div>
    )
}

export default Register