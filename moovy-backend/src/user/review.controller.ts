import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, reviewFileFilter } from './shared/file-upload.utils';
import { UserService } from './shared/user.service';
import { User } from './shared/user';
import { Review } from './shared/review';
import { JwtAuthGuard } from './../auth/shared/jwt-auth.guard';

@Controller('review')
export class ReviewController {

    constructor(private userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(
        FileInterceptor("review", {
            storage: diskStorage({
                destination: './uploads/reviews',
                filename: editFileName,
            }),
            fileFilter: reviewFileFilter
        })
    )
    async uploadSingle(@Body() body: Review, @UploadedFile() file) : Promise<User> {
        //return this.reviewService.fileUpload();
        // const response = { 
        //     originalname: file.originalname,
        //     filename: file.filename
        // };
        return this.userService.fileUpload(body, file.filename);
        //return response;
    }
}
