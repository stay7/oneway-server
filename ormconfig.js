const SnakeNamingStrategy =
  require('typeorm-naming-strategies').SnakeNamingStrategy;

module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'sangmin',
  password: 'tkdals95',
  database: 'relay',
  entities: ['./dist/**/*.entity{.ts,.js}'],
  synchronize: true, //TODO: production에서는 false로 할 것
  namingStrategy: new SnakeNamingStrategy(),
};
