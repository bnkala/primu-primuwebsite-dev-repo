import { Blog } from 'src/blogs/entities/blogs.entity';
import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';


@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 40 })
  email: string;

  @OneToMany(() => Blog, (blog) => blog.author)
  blogs: Blog[];
}
