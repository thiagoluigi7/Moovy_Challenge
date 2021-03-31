import { Injectable } from '@nestjs/common';
import { User } from './user';
import { Review } from './review';
import { Movie } from './movie';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }
        // @InjectModel('Review') private readonly reviewModel: Model<Review>,
        // @InjectModel('Movie') private readonly movieModel: Model<Movie>) { }

    async getAll() {
        return await this.userModel.find().exec();
    }

    async getById(id: string) {
        return await this.userModel.findById(id).exec();
    }

    async getByEmail(email: string) {
        return await this.userModel.findOne({ email }).exec();
    }

    async create(user: User) {
        const createdUser = new this.userModel(user);
        return await createdUser.save();
    }

    async update(id: string, user: User) {
        await this.userModel.updateOne({ _id: id }, user).exec();
        return await this.getById(id);
    }

    async delete(id: string) {
        return await this.userModel.deleteOne({ _id: id }).exec();
    }



    async getMovies(id: string) {
        const user = await this.userModel.findById(id).exec();
        // var movies: Movie[];
        // var i;
        // for (i = 0; i < user.movies.length; i++) {
        //     const movie = new Movie (
        //         {userId: user._id, 
        //         movieId: user.movies[i]
        //     }
        //     );
        //     movies.push(movie);
        // }
        return await user.movies;
    }

    // async getMovieById(body: <Movie>) {
    //     return await this.userModel.findById(id).exec();
    // }

    async addMovie(body: Movie) {

        const user = await this.userModel.findById(body.userId).exec();

        await this.userModel.updateOne(
            { _id: user._id },
            { $push: { movies: body.movieId}}
        );

        await this.userModel.updateOne(
            { _id: user._id },
            { $push: { reviews: `{'movieId':'${body.movieId}', 'review':''}`}}
        );
        
        return await this.userModel.findById(user._id);
        
    }

    
    async removeMovie(body: Movie) {
        
        const user = await this.userModel.findById(body.userId).exec();

        await this.userModel.updateOne(
            { _id: user._id },
            { $pull: { movies: body.movieId}}
        );

        await this.userModel.updateOne(
            { _id: user._id },
            { $pull: { reviews: {"reviews.movieId": body.movieId}}}
        );
        
        return await this.userModel.find().exec();
    }


    async fileUpload(body: Review, filename: string) {

        const user = await this.getById(body.userId);

        if ( user.movies.indexOf(body.movieId) != -1 ) {
            await this.userModel.updateOne(
                { 
                    _id: user._id, 
                    'reviews.movieId': body.movieId 
                }, 
                { $set: {'reviews.$.review': filename }}
            );
            return await this.getById(user._id);
        } else {
            // movie not added to library
        } 
        return user;
        
    }

}
