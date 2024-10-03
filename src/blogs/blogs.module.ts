import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './entities/blogs.entity';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { UserModule } from 'src/user/user.module';
import { S3FileUploadService } from './s3-file-upload/s3-file-upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([Blog]), UserModule],
  providers: [BlogsService, S3FileUploadService],
  controllers: [BlogsController],
})
export class BlogsModule {}
