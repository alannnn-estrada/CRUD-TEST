import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:3001/",
    headers: {
        "Content-type": "application/json"
    }
});
instance.defaults.timeout = 2500;
instance.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
export default instance;