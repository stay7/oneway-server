import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'sangmin',
  password: 'tkdals95',
  database: 'relay',
  autoLoadEntities: true,
  synchronize: true, //TODO: production에서는 false로 할 것
  namingStrategy: new SnakeNamingStrategy(),
  // logging: true,
};

export default config;
