import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    profilePic: {
        type: String,
        default: "",
    },
    name: {
        type: String,
        required: true,
    },
    resumeUrl: {
        type: String,
        required: true,
    },
    instagramUrl: {
        type: String,
        required: true,
    },
    linkedinUrl: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    experience: {
        type: Number,
        required: true
    },
    company: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        minLenght: 10,
        required: true,
    }
}, { timestamps: true, })

const User = mongoose.model('User', userSchema);

export default User;