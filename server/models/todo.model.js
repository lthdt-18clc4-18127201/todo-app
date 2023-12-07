import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    }
}, {
    timestamps: true
})

export default mongoose.model('todo', TodoSchema);