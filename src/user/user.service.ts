import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
// import { privateDecrypt } from 'crypto';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
  ) {}

  // this is function is used to create User in User Entity.

  createUser(createUserDto: CreateUserDto): Promise<Users> {
    const user: Users = new Users();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    return this.userRepository.save(user);
  }

  findAllUser(): Promise<Users[]> {
    return this.userRepository.find();
  }

  viewUser(id: number): Promise<Users> {
    return this.userRepository.findOneBy({ id });
  }

  // this function is used to updated specific user whose id is passed in
  //  * parameter along with passed updated data
  updateUser(id: number, updateUserDto: UpdateUserDto): Promise<Users> {
    const user: Users = new Users();
    user.name = updateUserDto.name;
    user.email = updateUserDto.email;
    return this.userRepository.save(user);
  }
  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  removeUser(id: number): Promise<{ affected?: number }> {
    return this.userRepository.delete(id);
  }
}
