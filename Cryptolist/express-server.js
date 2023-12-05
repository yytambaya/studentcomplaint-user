import express from "express";

const PORT = process.env.PORT || 7000

const app = express()

app.get('/', (req, res) => {
    res.send("Welcome to Cryptolist")
})

app.listen(PORT, () => {
    console.log("Server started at " + PORT)
})