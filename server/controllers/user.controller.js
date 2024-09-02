import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import Listing from "../models/listing.model.js"
import bcryptjs from "bcryptjs"
export const test = (req, res) => {

    res.status(200).json({ message: 'Api Route is Working!' });

    console.log('Server is running on port 5000');
}


export const updateUser = async (req, res, next) => {
    try {
        // Ensure the logged-in user matches the ID in the request parameters
        if (req.user.id !== req.params.id) {
            return next(errorHandler(401, "You can only update your own account."));
        }

        // Hash the new password if it is being updated
        if (req.body.password) {
            req.body.password = await bcryptjs.hash(req.body.password, 10);
        }

        // Update user details
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: req.body.avatar
                }
            },
            { new: true }
        );

        if (!updatedUser) {
            return next(errorHandler(404, "User not found."));
        }

        // Remove password from the response
        const { password, ...rest } = updatedUser._doc;

        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};



export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id)
        return next(errorHandler(401, 'You can only delete your own account!'));
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json('User has been deleted!');
    } catch (error) {
        next(error);
    }
};



export const getUserListings = async (req, res, next) => {

    if (req.user.id === req.params.id) {

        try {

            const listings = await Listing.find({ userRef: req.params.id })
            res.status(200).json(listings);

        } catch (error) {

        }

    } else {

        return next(errorHandler(401, "you can view your own listings"))
    }

}