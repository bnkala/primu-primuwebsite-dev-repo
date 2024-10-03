import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';
import { Repository } from 'typeorm';
import { Blog } from './entities/blogs.entity';
import { S3FileUploadService } from './s3-file-upload/s3-file-upload.service';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private blogsRepository: Repository<Blog>,
  ) {}

  // async create(blogData: Partial<Blog>, author: User): Promise<Blog> {
  //   const newBlog = this.blogsRepository.create({ ...blogData, author });
  //   return this.blogsRepository.save(newBlog);
  // }

  async createBlog(createBlogDto: CreateBlogDto): Promise<Blog> {
    console.log(createBlogDto);

    const blog: Blog = new Blog();
    blog.title = createBlogDto.title;
    blog.thumbnail = createBlogDto.thumbnail;
    blog.body = createBlogDto.body;
    blog.datePosted = createBlogDto.datePosted;
    blog.author = createBlogDto.author;
    // blog.images = createBlogDto.password;
    return await this.blogsRepository.save(blog);
  }

  async findAll(): Promise<Blog[]> {
    return this.blogsRepository.find({ relations: ['author'],order: {datePosted: 'DESC'}  });
  }
  async getBlogById(id: number): Promise<Blog> {
    const blog = await this.blogsRepository.findOne({ where: { id } });
    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return blog;
  }

  async deleteBlogById(id: number): Promise<any> {
    const result = await this.blogsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return {  message: "successfully deleted"};
  }

  async updateBlog(id: number, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    const blog = await this.blogsRepository.findOne({ where: { id } });
    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }

    Object.assign(blog, updateBlogDto);  // Merge the updated fields

    return this.blogsRepository.save(blog);  // Save the updated blog
  }

}
