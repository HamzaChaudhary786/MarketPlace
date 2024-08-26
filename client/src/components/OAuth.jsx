import { getAuth, GoogleAuthProvider, signInWithPopup } from '@firebase/auth'
import React from 'react'
import * as Actions from '../store/actions';
import { useDispatch } from 'react-redux'
import { app } from '../firebase'
import { useNavigate } from 'react-router-dom';

const OAuth = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleGoogleClick = async () => {

        try {

            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)

            const result = await signInWithPopup(auth, provider)

            const response = await dispatch(Actions.googleAuthAction(result));

            console.log(result);

            navigate("/")

        } catch (error) {

            console.log('Error signing in with Google:', error);
        }

    }

    return (
        <>

            <button
                type="button"
                className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 '
                onClick={handleGoogleClick}

            >
                Continue with google
            </button>
            {/* <Button sx={{
                variant: 'contained',
                color: 'primary',
                fontSize: '16px',
                fontWeight: 'bold',
                textTransform: 'none',
                '&:hover': {
                    backgroundColor: '#4285F4',
                },

            }}>
                Google Sign In
            </Button> */}
        </>
    )
}

export default OAuth