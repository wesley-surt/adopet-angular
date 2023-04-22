import express from 'express';
import cors from 'cors';
import userRoutes from './users.js';
import profileRoutes from './profiles.js';
import animalsRoutes from './animals.js';

const routes = (app) => {

const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true,
    optionSuccessStatus: 200,
    header: 'x-access-token'
}

  app.get('/', (req, res) => {
    res.status(200).send('welcome from server...');
  });

  app.use(
    cors(corsOptions),
    express.json(),
    userRoutes,
    profileRoutes,
    animalsRoutes
  );
}

export default routes;
