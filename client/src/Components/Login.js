import React, { useState } from 'react'

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
      const response= await fetch('http://localhost:5000/api/login', {
            method : 'POST',
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
        if(data.user){
            localStorage.setItem('token' , data.user);
            alert("user login");
            window.location.href = '/dashboard'
        }
        console.log(data)
    }
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={loginUser}>
                <label>Email</label>
                <input onChange={handleEmailChange} type="email" />
                <label htmlFor="">Password</label>
                <input onChange={handlePasswordChange} type="password" />
                <input type="submit" value="Login" />
            </form>
        </div>
    )
}

export default Register

//https://stackoverflow.com/questions/63412086/invalid-token-error-invalid-token-specified-cannot-read-property-replace-of