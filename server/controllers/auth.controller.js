import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'

import { errorHandler } from '../utils/error.js'
import jwt from 'jsonwebtoken'
export const signup = async (req, res, next) => {

    const { username, email, password } = req.body;
    const hashPassword = await bcryptjs.hashSync(password, 10);

    const newUser = new User({ username, email, password: hashPassword });
    const salt = await bcryptjs.genSalt(10);


    try {
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        next(error);
    }
}


export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return next(errorHandler(404, 'User not found'));

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) return next(errorHandler(404, "Invalid user password"));

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY); // Ensure you're using JWT_SECRET_KEY

        console.log(token, "Token Daata s");

        const { password: pass, ...rest } = user._doc;

        res.cookie('access_token', token, {
            httpOnly: true, // Prevents JavaScript access to the cookie
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production (HTTPS only)
            sameSite: 'lax', // Controls if cookies should be sent with cross-origin requests
            maxAge: 24 * 60 * 60 * 1000 // Cookie expiry in milliseconds (e.g., 1 day)
        })
            .status(200)
            .json(rest);

        console.log('User authenticated successfully', user);
    } catch (error) {
        next(error);
    }
};



export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);
            const { password: pass, ...rest } = user._doc;

            res.cookie('access_token', token, { httpOnly: true })
                .status(200)
                .json(rest);  // Include token in the response body

            console.log('User authenticated successfully', user);
        }
        else {

            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

            const hashPassword = bcryptjs.hashSync(generatedPassword, 10)

            const newUser = new User({ username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4), email: req.body.email, password: hashPassword, avatar: req.body.photo });

            await newUser.save();


            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);
            const { password: pass, ...rest } = user._doc;


            res.cookie('access_token', token, {
                httpOnly: true, // Prevents JavaScript access to the cookie
                secure: process.env.NODE_ENV === 'production', // Use secure cookies in production (HTTPS only)
                sameSite: 'lax', // Controls if cookies should be sent with cross-origin requests
                maxAge: 24 * 60 * 60 * 1000 // Cookie expiry in milliseconds (e.g., 1 day)
            })
                .status(200)
                .json(rest);

        }
    } catch (error) {
        next(error);
    }
};




export const signout = async (req, res, next) => {
    try {
        // Clear the cookie with the default path
        res.clearCookie('access_token', {
            path: '/'  // Adjust this if your cookie was set with a different path
        });
        res.status(200).json({ message: "User has been logged out" });
    } catch (error) {
        next(error);
    }
};

