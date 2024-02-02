const express = require('express');
const app = express();
const cors = require('cors');
const User = require('./models/userSchema')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();
require('./db/conn');
app.use(cors({
  origin: 'https://notes-keeper-kappa.vercel.app/'
}));

app.use(express.json())
const PORT = process.env.PORT;

app.post('/api/register', async (req, res) => {
    try {
        const hashPassword = await bcrypt.hash(req.body.password, 10)
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
        }) 
        res.json({ status: "ok" });

    }
    catch (error) {
        res.json({ status: "error", error: { error } });
        console.log(error)
    }
})

app.post('/api/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
    })
    if (!user) return ({ status: "error" });
    const matchPassword = await bcrypt.compare(req.body.password, user.password);
    if (matchPassword) {
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

        return res.json({ status: 'ok', quote: user.quote, name: user.name })
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
        await User.updateOne(
            { email: email },
            { $set: { quote: req.body.quote } }
        )
        console.log(req.body.quote)
        return res.json({ status: 'ok' })
    } catch (error) {
        console.log(error);
        res.json({ status: 'error', error: 'invalid token' })
    }
})


app.listen(PORT, () => {
    console.log(`port is running at ${PORT}`);
})
