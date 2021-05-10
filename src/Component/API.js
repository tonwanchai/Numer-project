const axios = require('axios')

const api = axios.create({
    baseURL : "https://my-json-server.typicode.com/tonwanchai/numeric-project/"
})

const getAllInterpolation = () => api.get("/interpolation")

const apis = {
    getAllInterpolation
}

export default apis;