import Listing from "../models/listing.model.js"
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};




export const deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    if (req.user.id !== listing.userRef) {
      return next(errorHandler(401, "You can change own listing"));
    }

    await Listing.findByIdAndDelete(req.params.id);
    
    // Send the deletion success message
    return res.status(200).json({ message: "Listing has been deleted" });
    
  } catch (error) {
    next(error);
  }
};
