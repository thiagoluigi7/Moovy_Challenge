import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { ReviewController } from './review.controller';
import { MovieController } from './movie.controller';
import { UserService } from './shared/user.service';
import { UserSchema } from './schema/user.schema';
import { ReviewSchema } from './schema/review.schema';
import { MovieSchema } from './schema/movie.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Review', schema: ReviewSchema }]),
    MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema }])
  ],
  controllers: [
    MovieController,
    UserController,
    ReviewController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
