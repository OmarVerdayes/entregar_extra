import axios from "axios";

//generar url base
const SERVER_URL ="http://192.168.56.1:3000/api/"

//crear instancia de axios
const AxiosInstance = axios.create({
	baseURL: SERVER_URL, //url base
	timeout: 5000, //si se demora mas de 5 segundos, se cancela la peticion
});

export default AxiosInstance;
