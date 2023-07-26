import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

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
      const response= await fetch('http://localhost:5000/api/register', {
            method : 'POST',
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
        if(data.status=='ok'){
            navigate("/login", { replace: true })
        }
        
    }
    return (
        <div>
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