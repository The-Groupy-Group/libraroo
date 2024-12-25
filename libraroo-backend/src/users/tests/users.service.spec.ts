import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { BadRequestException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersRepository } from '../users.repository';
import { User } from '../models/user.model';
import { UserMapper } from '../user-mapper';
import mongoose from 'mongoose';

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: jest.Mocked<UsersRepository>;

  beforeEach(async () => {
    const repositoryMock: Partial<jest.Mocked<UsersRepository>> = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: repositoryMock,
        },
        UserMapper,
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    usersRepository = module.get<UsersRepository, jest.Mocked<UsersRepository>>(
      UsersRepository,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should throw BadRequestException if email is already in use', async () => {
      const createUserDto: CreateUserDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'test@example.com',
        password: 'password',
        address: '123 Main St',
      };

      usersRepository.findByEmail.mockResolvedValue({} as User);

      await expect(service.create(createUserDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should hash the password and save the user if email is not in use', async () => {
      const createUserDto: CreateUserDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'test@example.com',
        password: 'password',
        address: '123 Main St',
      };

      const createdUser: User = {
        _id: new mongoose.Types.ObjectId(),
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
        passwordHash: 'hashedPassword',
        address: createUserDto.address,
        ownedBooksList: [],
      };

      usersRepository.findByEmail.mockResolvedValueOnce(null);
      usersRepository.create.mockResolvedValueOnce(createdUser);

      const result = await service.create(createUserDto);

      expect(usersRepository.create).toHaveBeenCalledWith({
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
        passwordHash: expect.any(String),
        address: createUserDto.address,
      });

      expect(result).toEqual(UserMapper.toUserDto(createdUser));
    });
  });
});
