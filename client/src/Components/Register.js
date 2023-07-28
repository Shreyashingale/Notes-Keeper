import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navigationbar from './Navigationbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
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
        console.log(data)
        if (data.status == 'ok') {
            navigate("/login", { replace: true })
        }

    }
    return (
        <div>
            <Navigationbar />
            <Form>
                <Form.Group className="mb-3 ml-2" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                    <Form.Control type="email" placeholder="Enter Name" />
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <h1>Register</h1>
            <form onSubmit={registerUser}>

                <label>Name</label>
                <input onChange={handleNameChange} type="text" />
                <label>Email</label>
                <input onChange={handleEmailChange} type="email" />
                <label htmlFor="">Password</label>
                <input onChange={handlePasswordChange} type="password" />
                {console.log(name)}
                <input type="submit" value="Register" />
            </form>
        </div>
    )
}

export default Register