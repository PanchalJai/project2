const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middlewere.js");

const listingController = require("../controllers/listings.js");
const multer = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage })

// index route
// create route 
router
    .route("/")
    .get( wrapAsync(listingController.index))
    .post(
        isLoggedIn,
        validateListing,
        upload.single('listing[image]'),
        wrapAsync(listingController.createListing));
   

//new route 
router.get("/new", isLoggedIn, listingController.renderNewForm);


// show route
// update route
// Delete route
router
    .route("/:id")
    .get( wrapAsync(listingController.showListing))
    .put(
        isLoggedIn,
        isOwner,
        validateListing,
        wrapAsync(listingController.updateListing)
    )
    .delete(
        isLoggedIn,
        isOwner,
        wrapAsync(listingController.destroyListing));    


// edit route
router.get( "/:id/edit",
     isLoggedIn,
     isOwner,
    wrapAsync(listingController.renderEditForm));

    
module.exports = router;