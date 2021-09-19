import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    gender: String,
    single: Boolean,
    doubles: Boolean,
    mFirst: String,
    mLast: String,
    mixed: Boolean,
    xFirst: String,
    xLast: String,
    amount: Number,
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var PostPlayer = mongoose.model('PostPlayers', postSchema);

export default PostPlayer;