import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { BadRequestException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersRepository } from '../users.repository';
import { User } from '../models/user.model';
import { UserMapper } from '../user-mapper';
import * as bcrypt from 'bcrypt';

describe('UsersService', () => {

    let service: UsersService;
    let userRepository: UsersRepository;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          UsersService,
          {
            provide: UsersRepository,
            useValue: {
              findByEmail: jest.fn(),
              create: jest.fn(),
            },
          },
        ],
      }).compile();

      service = module.get<UsersService>(UsersService);
      userRepository = module.get<UsersRepository>(UsersRepository);
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

        jest.spyOn(userRepository, 'findByEmail').mockResolvedValueOnce({} as User);

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

        const hashedPassword = 'hashedPassword';

        const createdUser: User = {
          _id: '123',
          firstName: createUserDto.firstName,
          lastName: createUserDto.lastName,
          email: createUserDto.email,
          passwordHash: hashedPassword,
          address: createUserDto.address,
          ownedBooksList: [],
        } as User;

        jest.spyOn(userRepository, 'findByEmail').mockResolvedValueOnce(null);
        jest.spyOn(userRepository, 'create').mockResolvedValueOnce(createdUser);
        jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce(hashedPassword as never);

        const result = await service.create(createUserDto);

        expect(userRepository.create).toHaveBeenCalledWith({
          firstName: createUserDto.firstName,
          lastName: createUserDto.lastName,
          email: createUserDto.email,
          passwordHash: hashedPassword,
          address: createUserDto.address,
        });

        expect(result).toEqual(
          UserMapper.toUserDto(createdUser),
        );
      });
    });
  });