import * as ReducerActions from '../reducers/user.reducer';
import {API_URL} from '../../constants/index'

import axios from 'axios';







export const registerAction = (userName, email, password) => {
    return async (dispatch) => {
        try {

            const body = {
                username: userName,
                email: email,
                password: password,
            };

            const response = await axios.post(`${API_URL}/api/auth/signup`, body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = response.data;  // No need for response.json() with axios
            console.log(data);

        } catch (error) {
            if (error instanceof Error) {
                console.log('error', error);
                return error.message;
            }
        }
    };
};


export const loginAction = (formData) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:3001/auth/login', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });


            const { user, token } = response.data;

            console.log(user, 'userDate is ')

            localStorage.setItem('token', token);


            dispatch(
                ReducerActions.setLogin({
                    user,
                    token
                }),
            );

            // Handle the response here if needed

        } catch (error) {
            if (error instanceof Error) {
                console.log('error', error);
                return error.message;
            }
        }
    };
};


