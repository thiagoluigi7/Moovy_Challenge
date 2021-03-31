import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './shared/user.service';
import { User } from './shared/user';
import { Movie } from './shared/movie';
import { JwtAuthGuard } from './../auth/shared/jwt-auth.guard';

@Controller('movies')
export class MovieController {

    constructor(private userService: UserService) {}

    // User ID to search for his movies
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getMovies(@Param('id') id: string)  : Promise<string[]> {
        return this.userService.getMovies(id);
    }

    // @UseGuards(JwtAuthGuard)
    // @Get(':id')
    // async getMovieById(@Param('id') id: string)  : Promise<Movie> {
    //     return this.userService.getMovieById(id);
    // }

    @UseGuards(JwtAuthGuard)
    @Post()
    async addMovie(@Body() movie: Movie): Promise<User> {
        return this.userService.addMovie(movie);
    }

    // @UseGuards(JwtAuthGuard)
    // @Put(':id')
    // async update(@Param('id') id: string, @Body() user: User): Promise<User> {
    //     return this.userService.update(id, user);
    // }

    @UseGuards(JwtAuthGuard)
    @Delete()
    async removeMovie(@Body() movie: Movie) {
        this.userService.removeMovie(movie);
    }

}