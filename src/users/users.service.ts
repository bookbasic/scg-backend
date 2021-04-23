import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'admin',
      password: 'password',
      role: 'admin',
    },
    {
      userId: 2,
      username: 'staff',
      password: 'password',
      role: 'staff',
    },
    {
      userId: 3,
      username: 'machine',
      password: 'password',
      role: 'machine',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}