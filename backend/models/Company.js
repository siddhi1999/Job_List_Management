import mongoose from "mongoose";

const companyschema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true   //It means this field must be provided when creating a document is not then it will give an wrror like ValidationError
    },
    positionName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Applied"
    }
});

const Compnay = mongoose.model("Company", companyschema);   //This means create a collection called Company in MongoDB using this schema