import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { map, switchMap } from 'rxjs/operators';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './models/users.entity';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './models/dto/CreateUser.dto';
import { LoginUserDto } from './models/dto/LoginUser.dto';
import { UserI } from './models/users.interface';

/*
@Injectable()
export class UsersService {}*/

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
    private authService: AuthService,
  ) {}

  create(createdUserDto: CreateUserDto): Observable<UserI> {
    return this.mailExists(createdUserDto.email).pipe(
      switchMap((exists: boolean) => {
        if (!exists) {
          return this.authService.hashPassword(createdUserDto.password).pipe(
            switchMap((passwordHash: string) => {
              // Overwrite the user password with the hash, to store it in the db
              createdUserDto.password = passwordHash;
              return from(this.userRepository.save(createdUserDto)).pipe(
                map((savedUser: UserI) => {
                  const { password, ...user } = savedUser;
                  return user;
                }),
              );
            }),
          );
        } else {
          throw new HttpException('Email already in use', HttpStatus.CONFLICT);
        }
      }),
    );
  }


  findAll(): Observable<UserI[]> {
    return from(this.userRepository.find());
  }

  findOne(UserID: number): Observable<UserI> {
    return from(this.userRepository.findOne({ UserID }));
  }

  private findUserByEmail(email: string): Observable<UserI> {
    return from(this.userRepository.findOne({ email }, { select: ['UserID', 'name', 'email', 'password'] }));
  }

  private validatePassword(password: string, storedPasswordHash: string): Observable<boolean> {
    return this.authService.comparePasswords(password, storedPasswordHash);
  }

  private mailExists(email: string): Observable<boolean> {
    return from(this.userRepository.findOne({ email })).pipe(
      map((user: UserI) => {
        if (user) {
          return true;
        } else {
          return false;
        }
      })
    )
  }

  login(loginUserDto: LoginUserDto): Observable<string> {
    return this.findUserByEmail(loginUserDto.email).pipe(
      switchMap((user: UserI) => {
          if (user) {
            return this.validatePassword(loginUserDto.password, user.password).pipe(
              switchMap((passwordsMatches: boolean) => {
                if (passwordsMatches) {
                  return this.findOne(user.UserID).pipe(
                    switchMap((user: UserI) => this.authService.generateJwt(user))
                  )
                } else {
                  throw new HttpException('Login was not Successfulll', HttpStatus.UNAUTHORIZED);
                }
              })
            )
          } else {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
          }
        }
      )
    )
  }

}