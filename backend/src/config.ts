import * as Interface from './types/interface';
import { config as dotenv } from 'dotenv';

dotenv();

export const config: Interface.IConfig = {
  port: process.env.PORT || '3000',
};
