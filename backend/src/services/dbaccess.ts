import bcrypt from 'bcrypt';
import knex from '../db/database';
import { IUserAccount } from '../types/interface';

export const dbCreateUser = async ({
  username,
  email,
  password,
}: IUserAccount) => {};
