import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigKey } from './enum/config-key.enum';

require('dotenv').config();

class ConfigManager {
  constructor(private env: { [k: string]: string | undefined }) {}

  getValue(key: ConfigKey, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }
    return value;
  }

  getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'sqlite',
      database: 'task-manager.db',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    };
  }
}

const configManager = new ConfigManager(process.env);
export { configManager };