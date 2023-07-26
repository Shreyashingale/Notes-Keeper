const express = require('express');
const app = express();
const cors = require('cors');
const User = require('./models/userSchema')
const jwt = require('jsonwebtoken');
require('./db/conn');
app.use(cors())

app.use(express.json())


app.post('/api/register', async (req, res) => {
    console.log(req.body)

    try {
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        res.json({ status: "ok" });

    }
    catch (error) {
        res.json({ status: "error" });
    }
})

app.post('/api/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    })

    if (user) {
        const token = jwt.sign({
            email: user.email,
            password: user.password
        }, 'secret123')
        return res.json({ status: "login", user: token })
    }
    else {
        return res.json({ status: "failed", user: false })
    }
})


app.get('/api/quote', async (req, res) => {
    const token = req.headers['x-access-token'];

    try {
        const decoded = jwt.verify(token, 'secret123');
        const email = decoded.email;
        const user = await User.findOne({ email: email })

        return res.json({ status: 'ok', quote: user.quote })
    } catch (error) {
        console.log(error);
        res.json({ status: 'error', error: 'invalid token' })
    }
})

app.post('/api/quote', async (req, res) => {
    const token = req.headers['x-access-token'];
    try {
        const decoded = jwt.verify(token, 'secret123');
        const email = decoded.email;
        const user = await User.updateOne({ email: email } , {$set : {quote : req.body.quote}})
        console.log(req.body.quote)
        return res.json({ status: 'ok'})
    } catch (error) {
        console.log(error);
        res.json({ status: 'error', error: 'invalid token' })
    }
})


app.listen(5000, () => {
    console.log("Running Server");
})