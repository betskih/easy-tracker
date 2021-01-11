import express from 'express';
import userLogin from '../services/Login';
import checkToken from '../middlewares/middlewares';
import refreshToken from '../services/refreshToken';

const login = express.Router();
const jsonBodyParser = express.json();
login.use(checkToken(['/login'], true));
login.post('/', jsonBodyParser, userLogin);
login.get('/refresh', refreshToken);
export default login;
