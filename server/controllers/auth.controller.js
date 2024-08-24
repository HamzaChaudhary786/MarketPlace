import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'

import { errorHandler } from '../utils/error.js'
import jwt from 'jsonwebtoken'
export const signup = async (req, res, next) => {

    const { username, email, password } = req.body;
    const hashPassword = await bcryptjs.hashSync(password, 10);

    const newUser = new User({ username, email, password: hashPassword });
    const salt = await bcryptjs.genSalt(10);

    console.log(newUser);

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
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);

        const { password: pass, ...rest } = user._doc;
        res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
        console.log('User authenticated successfully', user);



    } catch (error) {

        next(error);

    }



}