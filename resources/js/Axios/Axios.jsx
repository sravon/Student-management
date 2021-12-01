import axios from 'axios'

const base_url = "http://127.0.0.1:8000/api/";

const Axios = axios.create({
    baseURL: base_url
})

export default Axios;