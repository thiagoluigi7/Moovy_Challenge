import * as mongoose from 'mongoose';

export const ReviewSchema = new mongoose.Schema({
    userId: String,
    movieId: String,
    filename: String
})