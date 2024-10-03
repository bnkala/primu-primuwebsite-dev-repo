import { IsNotEmpty, IsString, IsDate } from 'class-validator';
import { Users } from 'src/user/entities/user.entity';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDate()
  @IsNotEmpty()
  datePosted: Date;

  @IsString()
  @IsNotEmpty()
  author: Users;

  @IsString()
  @IsNotEmpty()
  thumbnail: string;

  @IsString()
  @IsNotEmpty()
  body: string;
}
