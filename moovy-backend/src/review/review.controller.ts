import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from './../auth/shared/jwt-auth.guard'

@Controller('user/upload')
export class ReviewController {

    @UseGuards(JwtAuthGuard)
    @Post("review")
    @UseInterceptors(
        FileInterceptor("review", {
            dest: './uploads/reviews',
        })
    )
    uploadSingle(@UploadedFile() file) {
        console.log(file);
    }
}
