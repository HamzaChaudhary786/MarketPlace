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




export const listHomeAction = (formData) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:3001/properties/create', formData);

        } catch (error) {
            if (error instanceof Error) {
                console.log('error', error);
                return error.message;
            }
        }
    };
};




export const getListDataAction = (selectedCategory) => {
    return async (dispatch) => {
        try {
            const response = selectedCategory !== "All"
                ? await axios.get(`http://localhost:3001/properties?category=${selectedCategory}`)
                : await axios.get(`http://localhost:3001/properties`);

            const data = response.data;  // Directly access response.data


            dispatch(
                ReducerActions.setListings({
                    listings: data
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




export const getCategoryDataAction = (category) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:3001/properties?category=${category}`)


            const data = response.data;  // Directly access response.data


            dispatch(
                ReducerActions.setListings({
                    listings: data
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










export const getSingleDataListAction = (listingId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:3001/properties/${listingId}`)


            const data = response.data;  // Directly access response.data


            console.log(data, "data is")


            dispatch(
                ReducerActions.setSingleListings({
                    singleList: data
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





export const getBookingAction = (bookingForm) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`http://localhost:3001/bookings/create`, bookingForm, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log('Booking created:', response.data);
        } catch (error) {
            if (error instanceof Error) {
                console.log('Error:', error);
                return error.message;
            }
        }
    };
};




export const getUserTripListData = (userId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:3001/users/${userId}/trips`)


            const data = response.data;  // Directly access response.data


            console.log(data, "data is")


            dispatch(
                ReducerActions.setTripList({
                    tripList: data
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



export const WishListAction = (userId, listingId) => {
    return async (dispatch) => {
        try {
            const response = await axios.patch(`http://localhost:3001/users/${userId}/${listingId}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            })


            const data = response.data;  // Directly access response.data


            console.log(data, "data is")


            dispatch(
                ReducerActions.setWishList({
                    wishList: data
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







export const getPropertyDataAction = (userId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:3001/users/${userId}/properties`)


            const data = response.data;  // Directly access response.data


            console.log(data, "data is")


            dispatch(
                ReducerActions.setPropertyList({
                    propertyList: data
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



export const getReservationDataAction = (userId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:3001/users/${userId}/reservations`)


            const data = response.data;  // Directly access response.data


            console.log(data, "data is")


            dispatch(
                ReducerActions.setReservationList({
                    reservationList: data
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


export const getSearchDataAction = (search) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:3001/properties/search/${search}`);
            const data = response.data;  // Properly access response.data

            dispatch(
                ReducerActions.setListings({
                    listings: data
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





