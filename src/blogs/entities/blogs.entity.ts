import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Users } from '../../user/entities/user.entity';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  thumbnail: string;

  @Column('text')
  body: string;

  @Column()
  datePosted: Date;

  @ManyToOne(() => Users, (user) => user.blogs)
  author: Users;
}
