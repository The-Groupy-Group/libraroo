import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { UsersRepository } from '../../users/users.repository';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/login.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { UserDocument } from '../../users/models/user.model';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  let usersRepository: jest.Mocked<UsersRepository>;

  beforeEach(async () => {
    const repositoryMock: Partial<jest.Mocked<UsersRepository>> = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersRepository,
          useValue: repositoryMock,
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersRepository = module.get<UsersRepository, jest.Mocked<UsersRepository>>(
      UsersRepository,
    );
  });

  describe('authenticate', () => {
    it('should authenticate the user and return an access token', async () => {
      const loginDto: LoginDto = {
        email: 'Donfil@gmail.com',
        password: 'DonTheGreat',
      } as LoginDto;

      const existingUser: UserDocument = {
        email: 'Donfil@gmail.com',
        passwordHash: '123421',
        id: 123,
        firstName: 'don',
        lastName: 'fil',
        address: 'Haondfil13',
        ownedBooksList: [],
      } as UserDocument;

      usersRepository.findByEmail.mockResolvedValueOnce(existingUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);
      const result: LoginResponseDto = await authService.authenticate(loginDto);
      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('id');
    });
  });

  it('wrong password and throws BadRequestException', async () => {
    const loginDto: LoginDto = {
      email: 'Donfil@gmail.com',
      password: 'DonTheGreat',
    } as LoginDto;

    const existingUser: UserDocument = {
      email: 'Donfil@gmail.com',
      passwordHash: '123421',
      id: 123,
      firstName: 'don',
      lastName: 'fil',
      address: 'Haondfil13',
      ownedBooksList: [],
    } as UserDocument;

    usersRepository.findByEmail.mockResolvedValueOnce(existingUser);
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);
    await expect(authService.authenticate(loginDto)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('wrong email and throws BadRequestException', async () => {
    const loginDto: LoginDto = {
      email: 'Donfil@gmail.com',
      password: 'DonTheGreat',
    } as LoginDto;

    usersRepository.findByEmail.mockResolvedValueOnce(null);
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);
    await expect(authService.authenticate(loginDto)).rejects.toThrow(
      BadRequestException,
    );
  });
});
