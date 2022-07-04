import bcrypt from 'bcrypt';
import knex from '../db/database';
import { IUserAccount } from '../types/interface';

export const dbCreateUser = async ({
  username,
  email,
  password,
}: IUserAccount) => {
  const hashed_password = bcrypt.hash(password, 20);
  knex('users').insert({ username, email, hashed_password });
};
