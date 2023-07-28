import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode"
import Navigationbar from './Navigationbar';
import textField from '../assets/images/textField.png'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Dashboard = () => {
    
    const navigate = useNavigate();
    const [quote, setQuote] = useState('');
    const [value, setValue] = useState('')
    const [userName, setUserName] = useState('')
    const handleQuoteChange = (e) => {
        setValue(e.target.value)
    }
    async function populateQuote() {

        const req = await fetch('http://localhost:5000/api/quote', {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })
        const data = await req.json();
        if (data.status == 'ok') {
            console.log(data.quote)
            setQuote(data.quote);
            setUserName(data.name)
        }
        else {
            alert(data.error);
        }
    }
    async function handleSubmit(event) {
        event.preventDefault()
        const response = await fetch('http://localhost:5000/api/quote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify({
                quote: value,
            })
        }
        )
        const data = await response.json();
        if (data.status == 'ok') {
            setQuote(value);
            setValue('');
            toast.success("Note Added!");
        }
    }
    useEffect(() => {

        const token = localStorage.getItem('token');
        if (token) {
            const user = jwt_decode(token);
            if (!user) {
                localStorage.removeItem(token);
                navigate("/login", { replace: true })
            }
            else {
                populateQuote();
            }
        }
    }, [])

    return (
        <div>
            <Navigationbar />
            <ToastContainer position="top-center" />
            <div className='mainDiv'>
                <div className='textFieldDiv'>
                    <div>
                        <blockquote class="q-card q-card-color-2">
                            <div class="content">{quote || "..."}</div>
                            <div class='author'>{userName}</div>
                        </blockquote>
                    </div>
                    <div>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-2 ml-50" controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="Enter Name" onChange={handleQuoteChange} />
                        </Form.Group>

                        <Button variant="dark" type="submit">
                            + Add Note
                        </Button>
                    </Form>
                        
                    </div>

                </div>
                <div>
                    <img className='imgDiv' src={textField} alt="" />
                </div>
            </div>


        </div>
    )
}

export default Dashboard