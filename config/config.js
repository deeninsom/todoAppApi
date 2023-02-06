require('dotenv').config()



const {MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST,MYSQL_DBNAME, MYSQL_DIALECT } = process.env

module.exports = {
  "development": {
    "username": MYSQL_USER,
    "password": MYSQL_PASSWORD,
    "database": MYSQL_DBNAME,
    "host": MYSQL_HOST,
    "dialect": MYSQL_DIALECT
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
