import Axios from "axios";
const API =Axios.create({
    baseURL:"http://localhost:300/api"
})
export default API;
