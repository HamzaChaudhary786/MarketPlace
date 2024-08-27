import * as ReducerActions from '../reducers/user.reducer';
import { API_URL } from '../../constants/index'

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


export const loginAction = (email, password) => {
    return async (dispatch) => {

        const body = {
            email: email,
            password: password,
        }
        try {
            const response = await axios.post(`${API_URL}/api/auth/signin`, body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const { rest: user, token } = await response.data;

            localStorage.setItem('token', token);

            console.log(user, 'userDate is  ' + token);

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






export const googleAuthAction = (result) => {


    return async (dispatch) => {

        const body = {

            name: result.user.displayName,
            email: result.user.email,
            photo: result.user.photoURL,

        }

        try {
            const response = await axios.post(`${API_URL}/api/auth/google`, body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const { rest: user, token } = await response.data;

            localStorage.setItem('token', token);

            console.log(user, 'userDate is  ' + token);

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

