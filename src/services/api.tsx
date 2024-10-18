
import axios from 'axios';

const API = axios.create({
    baseURL: 'https://reqres.in/api',
});

export const login = async (email: string, password: string) => {
    const response = await API.post('/login', { email, password });
    return response.data;
};

export const register = async (email: string, password: string) => {
    const response = await API.post('/register', { email, password });
    console.log(response.status);
    console.log(response);

    return response.data;
};

export const getUserData = async (id: string) => {
    const response = await API.get('/users/2');
    return response.data;
};
