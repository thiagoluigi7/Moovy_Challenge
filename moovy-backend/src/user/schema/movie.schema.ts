import * as mongoose from 'mongoose';

export const MovieSchema = new mongoose.Schema({
    userId: String,
    movieId: String,
})