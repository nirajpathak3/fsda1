const express = require('express')
const axios = require('axios');
const cors = require('cors');
const { connectMongoDB } = require('./src/mongo');
const users = require('./src/usersMongo');
const posts = require('./src/posts');

require('dotenv').config()
const app = express();
app.use(express.json());
app.use(cors());

/// Logger Middleware is defined here
const loggerMiddleware = (req, res, next) => {
  console.log(`${req.method}`);
  next();
}
app.use(loggerMiddleware);

//// Routes are defined here
app.get('/', function (req, res) {
  res.send('Hello World')
})

connectMongoDB()
  .then(db => {
    // Pass the MongoDB database object to the route handlers
    app.get('/api/users', async (req, res) => {
      const userdata = await users.getUsers(db);
      res.json(userdata);
    });
    app.get('/api/users/:id', async (req, res) => {
      console.log(req.params.id);
      const userdata = await users.getUserById(db, req.params.id);
      res.json(userdata);
    });

    app.post('/api/user', async (req, res) => {
      try {
        const userdata = await users.createUser(db, req.body);
        res.status(201).json({ message: 'User created successfully.' });
      } catch (error) {
        res.json({message: error.message, })
      }      
    });
    app.post('/api/user/:id', async (req, res) => {
      try {
        const userdata = await users.updateUser(db, req.params.id, req.body);
        res.status(200).json({ message: 'User updated successfully.' });
      } catch (error) {
        res.json({message: error.message, })
      }      
    });

    app.listen(process.env.PORT || 3000, () => {
      console.log("Listening port...", process.env.PORT || 3000)
    });
  })
  .catch(error => {
    console.error('Failed to connect to MongoDB:', error);
  });