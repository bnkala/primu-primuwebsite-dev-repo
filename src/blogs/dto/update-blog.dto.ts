import { IsNotEmpty, IsString, IsDate, IsOptional } from 'class-validator';
import { Users } from 'src/user/entities/user.entity';

export class UpdateBlogDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsDate()
  @IsOptional()
  datePosted: Date;

  @IsString()
  @IsOptional()
  author: Users;

  @IsString()
  @IsOptional()
  thumbnail: string;

  @IsString()
  @IsOptional()
  body: string;
}
