import express from 'express';
import geoTrack from '../services/geoTrack';
import getFirstDate from '../services/getFirstDate';

const webRouter = express.Router();

const jsonBodyParser = express.json();
webRouter.post('/geotrack', jsonBodyParser, geoTrack);
webRouter.get('/firstdate/:id', getFirstDate);

export default webRouter;
