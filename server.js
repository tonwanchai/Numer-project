const express = require('express')

const app = express()
const PORT = 4000
const data = require('./db.json')

app.get('/', (req,res) => {
    res.setHeader("Content-Type",'application/json')
    res.setHeader("Access-Control-Allow-Origin",'*')
    res.send(JSON.stringify(data, null, 4))
})

app.get('/:name', (req,res) => {
    res.setHeader("Content-Type",'application/json')
    res.setHeader("Access-Control-Allow-Origin",'*')
    res.send(JSON.stringify(data[req.params.name], null, 4))
})

app.listen(PORT, ()=>{
    console.log('PORT : '+ PORT)
})