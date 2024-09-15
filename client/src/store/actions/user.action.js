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
                },
                withCredentials: true // Ensure credentials are sent with requests

            });

            const data = response.data;  // No need for response.json() with axios
            console.log(data, "daya is hahah");

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
                },
                withCredentials: true // Ensure credentials are sent with requests

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
                ReducerActions.setLogout({ user }),
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




export const signOutAction = () => {
    return async (dispatch) => {



        try {
            const response = await axios.get(`${API_URL}/api/auth/signout`);


            const user = response.data;

            dispatch(
                ReducerActions.setLogout({ user }),
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





export const createListingAction = (formData, id) => {

    console.log("formdata api function", formData)
    return async (dispatch) => {
        const body = {
            imageUrls: formData.imageUrls,
            name: formData.name,
            description: formData.description,
            address: formData.address,
            type: formData.type,
            bedrooms: formData.bathrooms,
            bathrooms: formData.bathrooms,
            regularPrice: formData.regularPrice,
            discountPrice: formData.discountPrice,
            offer: formData.offer,
            parking: formData.parking,
            furnished: formData.furnished,
            userRef: id,
        };

        try {
            const response = await axios.post(`${API_URL}/api/listing/create`, body, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true // Ensure credentials are sent with requests

            });

            const listings = response.data;

            console.log(listings, "listings data")
            dispatch(
                ReducerActions.setListings({
                    listings,
                })
            );
        } catch (error) {
            if (error instanceof Error) {
                console.log('error', error);
                return error.message;
            }
        }

    };
};









export const listingDeleteAction = (id) => {


    return async (dispatch) => {



        try {
            const response = await axios.delete(`${API_URL}/api/listing/delete/${id}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true // Ensure credentials are sent with requests

            }
            );

            const userListingData = await response.data;

        } catch (error) {
            if (error instanceof Error) {
                console.log('error', error);
                return error.message;
            }
        }
    };

}



export const UserListingsAction = (id) => {


    return async (dispatch) => {



        try {
            const response = await axios.get(`${API_URL}/api/user/listings/${id}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            const userListingData = await response.data;


            console.log(userListingData, "list");

            dispatch(
                ReducerActions.setUserListingData({
                    userListingData
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

}


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


export const singleListingAction = (id) => {

    return async (dispatch) => {

        try {
            const response = await axios.get(`${API_URL}/api/listing/get/${id}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            const singleList = await response.data;

            dispatch(
                ReducerActions.setSingleListData({
                    singleList
                }),
            );


            // Handle the response here if needed

        } catch (error) {
            if (error instanceof Error) {
                console.log('error', error);
                return error.message;
            }
        }


    }
}






export const updateListingAction = (formData, id, userid) => {

    console.log("formdata api function", formData)
    return async (dispatch) => {
        const body = {
            imageUrls: formData.imageUrls,
            name: formData.name,
            description: formData.description,
            address: formData.address,
            type: formData.type,
            bedrooms: formData.bathrooms,
            bathrooms: formData.bathrooms,
            regularPrice: formData.regularPrice,
            discountPrice: formData.discountPrice,
            offer: formData.offer,
            parking: formData.parking,
            furnished: formData.furnished,
            userRef: userid,
        };

        try {
            const response = await axios.post(`${API_URL}/api/listing/update/${id}`, body, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true // Ensure credentials are sent with requests

            });

            const listings = response.data;

            console.log(listings, "listings data")
            dispatch(
                ReducerActions.setListings({
                    listings,
                })
            );
        } catch (error) {
            if (error instanceof Error) {
                console.log('error', error);
                return error.message;
            }
        }

    };
};







export const ContactAction = (id) => {

    return async (dispatch) => {

        try {
            const response = await axios.get(`${API_URL}/api/user/${id}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            const getUser = await response.data;


            console.log(getUser, "contact data")

            dispatch(
                ReducerActions.setContactUser({
                    getUser
                }),
            );


            // Handle the response here if needed

        } catch (error) {
            if (error instanceof Error) {
                console.log('error', error);
                return error.message;
            }
        }


    }
}







export const getSearchDataAction = (searchTerm) => {

    return async (dispatch) => {

        try {
            const response = await axios.get(`${API_URL}/api/listing/get?${searchTerm}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            const searchList = await response.data;


            console.log(searchList, "search List  Data")

            dispatch(
                ReducerActions.setSearchList({
                    searchList
                }),
            );
            return { searchList };

            // Handle the response here if needed

        } catch (error) {
            if (error instanceof Error) {
                console.log('error', error);
                return error.message;
            }
        }


    }
}