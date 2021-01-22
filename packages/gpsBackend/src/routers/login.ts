import express from 'express';
import userLogin from '../services/Login';
import inputValidator from '../middlewares/inputValidator';
import { Methods, ParameterLocation } from '../swagger/swagger';
import { userLoginSchema } from '../models/UserTypes';
import { userLoginSchemaDTO } from '../models/outputTypes';
import outputValidator from '../middlewares/outputValidator';
import refreshToken from '../services/refreshToken';
import checkToken from '../middlewares/middlewares';
import openApi from '../initSwagger';

const login = express.Router();
const jsonBodyParser = express.json();

const endpoints = [
  {
    summary: 'Fetch tokens by mobile device ID',
    description: '',
    resultDescription: 'Result: User ID and pair of tokens',
    mimeTypes: ['application/json'],
    path: '/',
    swaggerPath: '',
    method: Methods.post,
    bodySchemaName: 'userLoginSchema',
    dtoName: 'userLoginSchemaDTO',
    parameterLocation: ParameterLocation.body,
    bodyParser: true,
    service: userLogin,
    bodySchema: userLoginSchema,
    outputSchema: userLoginSchemaDTO,
    auth: false,
  },
  {
    summary: 'Fetch tokens by refresh token',
    description: '',
    resultDescription: 'Result: User ID and pair of tokens',
    mimeTypes: ['application/json'],
    path: '/refresh',
    swaggerPath: '/refresh',
    method: Methods.get,
    dtoName: 'userLoginSchemaDTO',
    parameterLocation: ParameterLocation.path,
    bodyParser: false,
    service: refreshToken,
    outputSchema: userLoginSchemaDTO,
    auth: true,
  },
];

openApi.addRouter({ description: 'Token manipulation', basePath: '/login', endpoints });

login.use(checkToken(['/login'], true));

endpoints.forEach((endpoint) => {
  if (endpoint.bodyParser) {
    login[endpoint.method](endpoint.path, jsonBodyParser, inputValidator(endpoint));
  } else {
    login[endpoint.method](endpoint.path, inputValidator(endpoint));
  }
});

login.use(outputValidator(endpoints));

export default login;
