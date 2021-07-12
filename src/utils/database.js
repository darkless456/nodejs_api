const mariadb = require('mariadb');

let pool = null;

const createDatabasePool = () => {
  if (!pool) {
    pool = mariadb.createPool({
      host: 'nodejs_mariadb_1',
      user: 'root',
      password: '8PhedppRv+i40ABzd+gg==',
      database: 'nodejs_blog',
      port: 3306,
      connectionLimit: 10,
      multipleStatements: true,
    });
  }
};

const exec = async (statement, ...rest) => {
  let result;
  let connection;
  try {
    connection = await pool.getConnection();
    result = await connection.query(statement, ...rest);
  } catch (error) {
    console.log('database exec query error: ', error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
  return result;
};

module.exports = {
  createDatabasePool,
  exec,
};
