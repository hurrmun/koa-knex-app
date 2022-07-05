import { IsEmail, Length } from 'class-validator';

export class UserAccount {
  @Length(4, 20)
  username: string;

  @IsEmail()
  email: string;

  @Length(4, 20)
  password: string;
}
