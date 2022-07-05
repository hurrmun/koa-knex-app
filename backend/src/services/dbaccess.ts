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

export const dbCheckUserByEmail = async (email: string) => {
  try {
    const getUser = await knex('users').where('email', email);
    const user = getUser[0];
    return user;
  } catch (error) {
    console.error(error);
    process.exit();
  }
};

export const dbCheckUserByUsername = async (username: string) => {
  try {
    const getUser = await knex('users').where('username', username);
    const user = getUser[0];
    return user;
  } catch (error) {
    console.error(error);
    process.exit();
  }
};
