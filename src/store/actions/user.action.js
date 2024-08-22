import * as ReducerActions from '../reducers/user.reducer';


import axios from 'axios';







export const registerAction = (formData) => {
    return async (dispatch) => {
        try {


            const response = await axios.post('http://localhost:3001/auth/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });



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


