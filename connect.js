const { Client } = require('pg');

const client = new Client({
  connectionString:'postgres://jonuokvrkmzssk:41bb3569eeab46f8d457e67b0edc5bb461db3a36012123adaf5f37df38bb33d3@ec2-54-246-105-238.eu-west-1.compute.amazonaws.com:5432/d5kd2i8bb1r8r0',
  ssl: true,
});
const  CTB = 'CREATE TABLE question(id SERIAL PRIMARY KEY,question VARCHAR NOT NULL);'

module.exports= {

  clientDB:client
}