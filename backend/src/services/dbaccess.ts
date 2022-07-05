import bcrypt from 'bcrypt';
import knex from '../db/database';
import { IUserAccount } from '../types/interface';

export const dbCreateUser = async ({
  username,
  email,
  password,
}: IUserAccount) => {
  try {
    const hashed_password = await bcrypt.hash(password, 10);
    return knex('users').insert({
      username: username,
      email: email,
      password: hashed_password,
    });
  } catch (error) {
    console.error(error);
    process.exit();
  }
};
