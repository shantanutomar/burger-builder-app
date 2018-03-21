import axios from "axios";

var AxiosOrders = axios.create({
    baseURL : "https://burger-builder-app-back.firebaseio.com/"
});

export default AxiosOrders;
