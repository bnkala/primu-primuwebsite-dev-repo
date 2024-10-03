import {
  Controller,
  Post,
  Get,
  Body,
  UseInterceptors,
  UploadedFile,
  Delete,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3FileUploadService } from './s3-file-upload/s3-file-upload.service';
import { Blog } from './entities/blogs.entity';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller('blogs')
export class BlogsController {
  constructor(
    private readonly blogsService: BlogsService,
    private s3FileUpload: S3FileUploadService,
  ) {}

  @Post()
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogsService.createBlog(createBlogDto);
  }

  @Post('upload-file')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    return await this.s3FileUpload.uploadFile(file);
  }

  @Get()
  async findAll() {
    return this.blogsService.findAll();
  }

  @Get(':id')
  async getBlogById(@Param('id') id: string): Promise<Blog> {
    return this.blogsService.getBlogById(Number(id));
  }

  @Delete(':id')
  async deleteBlogById(@Param('id') id: string): Promise<void> {
    return await this.blogsService.deleteBlogById(Number(id));
  }

  @Put(':id')
  async updateBlog(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBlogDto: UpdateBlogDto,
  ): Promise<Blog> {
    return this.blogsService.updateBlog(id, updateBlogDto);
  }
}
