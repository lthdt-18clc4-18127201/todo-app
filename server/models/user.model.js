import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true
    }
}, {
    timestamps: true
})

export default mongoose.model('user', UserSchema);