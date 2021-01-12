import express from 'express';
import checkToken from '../middlewares/middlewares';
import getGeoId from '../services/getGeoId';
import postGeoData from '../services/PostGeoData';
import putPassword from '../services/putPassword';

const router = express.Router();
router.use(checkToken([], false));
const jsonBodyParser = express.json();
router.get('/getGeo/:id', getGeoId);
router.post('/geoData', jsonBodyParser, postGeoData);
router.put('/password', jsonBodyParser, putPassword);
export default router;
