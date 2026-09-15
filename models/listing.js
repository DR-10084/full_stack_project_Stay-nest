const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingschema = new Schema({
    title: {
        type: String,
        required: true,
    },

    description: String,

    image: {
        filename: {
            type: String,
            default: "listingimage"
        },
        url: {
            type: String,
            default: "https://unsplash.com/plus"
        }
    },

    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing", listingschema);
module.exports = Listing;