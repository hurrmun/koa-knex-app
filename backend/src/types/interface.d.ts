import { IsFullWidth } from 'class-validator';

export interface IConfig {
  port: string;
}

export interface IUserAccount {
  username: string;
  email: string;
  password: string;
}

export interface IUserProfile {
  id: string;
  email: string;
  username: string;
}

export interface IFullUserProfile extends IUserProfile {
  password: string;
}
