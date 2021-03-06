const axios = require('axios')

const api = axios.create({
    baseURL : "http://localhost:4000/"
})

const getAllInterpolation = () => api.get("/interpolation")
const getAllMatrix = () => api.get("/matrix")
const getAllRootOfEquation = () => api.get("/root-of-equation")
const getAllRegression = () => api.get("/regression")
const apis = {
    getAllInterpolation,
    getAllRootOfEquation,
    getAllMatrix,
    getAllRegression
}

export default apis;