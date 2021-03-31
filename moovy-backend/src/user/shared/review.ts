import { Document } from 'mongoose';

export class Review extends Document {
    userId: string;
    movieId: string;
    filename: string;
    }
