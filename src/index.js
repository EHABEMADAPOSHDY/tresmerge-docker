const express = require('express');
const redis = require('redis');
const {Client} = require('pg');

// init app
const PORT = process.env.PORT || 4000;
const app = express();

// connect to redis
const REDIS_POST = 6379;
const REDIS_HOST = 'redis';
const redisClient=redis.createClient({
  url: `redis://${REDIS_HOST}:${REDIS_POST}`
});
redisClient.on('error' , (err) => console.log('Redeis Client Error' , err));
redisClient.on('connect' , (err) => console.log('connected to redis...' , err));
redisClient.connect();

// connect db
// const DB_USER = 'root';
// const DB_PASSWORD = 'example';
// const DB_PORT = 27017;
// const DB_HOST = 'mongo';

// const URL = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/?authSource=admin`;

// mongoose
//   .connect(URL)
//   .then(() => console.log('✅ connected to db...'))
//   .catch((err) => console.error('❌ failed to connect to db', err));

const { Client } = require('pg');

const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_PORT = 5432;
const DB_HOST = 'postgres';
const DB_NAME = 'mydb';

const URL = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const client = new Client({
  connectionString: URL,
});

client
  .connect()
  .then(() => console.log('✅ connected to postgres db...'))
  .catch((err) => console.error('❌ failed to connect to db', err));

app.get('/', (req, res) =>{
  redisClient.set('products' , 'products....')
  res.send('<h1>Hello Ehab Bebo! hi</h1>');
});

app.get('/data', async (req, res) => {
  const products = await redisClient.get('products');
  res.send(`<h1>Hello Ehab Bebo! hi</h1> <h2>${products}</h2>`);
});

app.listen(PORT, () =>
  console.log(`🚀 app is up running on ${PORT}`)
);
