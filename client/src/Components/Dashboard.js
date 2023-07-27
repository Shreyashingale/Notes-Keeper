import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode"
const Dashboard = () => {
    const navigate = useNavigate();
    const [quote, setQuote] = useState('');
    const [value, setValue] = useState('')
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
        if (data.status = 'ok') {
            setQuote(data.quote);
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
            alert('quote added')
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
            <div>YOUR QUOTE {quote || "No quote"} </div>

            <form onSubmit={handleSubmit}>;

                <input type="text" value={value} onChange={handleQuoteChange} />
                <input type="Submit" value="Add" />
            </form>

        </div>
    )
}

export default Dashboard