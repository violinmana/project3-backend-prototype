//set the development config for knex to connect to pgsql 
module.exports = {
  development: {
    client: 'pg',
    connection: {
      host : 'localhost',
      user : 'postgres',
      password : 'root',
      database : 'beer',
      charset: 'utf8'
    },
    migrations: {
      directory: __dirname + '/knex/migrations',
    },
    seeds: {
      directory: __dirname + '/knex/seeds'
    }
  },
  staging: {
    client: 'pg',
    connection: {
      database: 'beer',
      user:     'bd2e8d2755e5d8',
      password: '30c8b054'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: {
      database: 'beer',
      user:     'bd2e8d2755e5d8',
      password: '30c8b054'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
