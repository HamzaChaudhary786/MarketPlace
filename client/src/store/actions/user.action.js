import * as ReducerActions from '../reducers/user.reducer';
import { API_URL } from '../../constants/index'

import axios from 'axios';

axios.defaults.withCredentials = true;





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
        };
        try {
            const response = await axios.post(`${API_URL}/api/auth/signin`, body, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true // Ensure credentials are sent with requests
            });

            const user = await response.data;

            dispatch(
                ReducerActions.setLogin({
                    user,
                }),
            );

        } catch (error) {
            if (error instanceof Error) {
                console.log('error', error);
                return error.message;
            }
        }
    };
};




export const updateUserAction = (id, username, email, password, avatar) => {
    return async (dispatch) => {

        const body = {
            username,
            email,
            password,
            avatar
        }

        try {
            const response = await axios.post(`${API_URL}/api/user/update/${id}`, body, {


                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const user = await response.data;


            dispatch(
                ReducerActions.setLogin({
                    user,
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





export const deleteUserAction = (id) => {
    return async (dispatch) => {



        try {
            const response = await axios.delete(`${API_URL}/api/user/delete/${id}`);


            const user = response.data;

            dispatch(
                ReducerActions.setLogout({user}),
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
                },
                withCredentials: true
            });

            const user = await response.data;

            console.log(user, "google data");
            dispatch(
                ReducerActions.setLogin({
                    user
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

