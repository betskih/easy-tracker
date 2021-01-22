import express from 'express';
import getGeoId from '../services/getGeoId';
import postGeoData from '../services/PostGeoData';
import putPassword from '../services/putPassword';
import { getGeoSchema } from '../models/UserTypes';
import inputValidator from '../middlewares/inputValidator';
import { getGeoIdSchemaDTO, postGeoDataSchemaDTO, putPasswordSchemaDTO } from '../models/outputTypes';
import outputValidator from '../middlewares/outputValidator';
import { EndpointDescription, Methods, ParameterLocation } from '../swagger/swagger';
import openApi from '../initSwagger';
import { postGeoDataSchema, putPasswordSchema } from '../models/GeoTypes';
import checkToken from '../middlewares/middlewares';

const endpoints: EndpointDescription[] = [
  {
    summary: 'Returns geoId by the user Id',
    description: '',
    resultDescription: 'Result: geoId and passwordSet flag',
    mimeTypes: ['application/json'],
    path: '/getGeo/:id',
    swaggerPath: '/getGeo/{id}',
    paramName: 'id',
    paramType: 'string',
    method: Methods.get,
    dtoName: 'getGeoIdSchemaDTO',
    parameterLocation: ParameterLocation.path,
    bodyParser: false,
    service: getGeoId,
    pathSchema: getGeoSchema,
    outputSchema: getGeoIdSchemaDTO,
    auth: true,
  },
  {
    summary: 'Send collected geo data to server',
    description: '',
    resultDescription: 'Result: number of inserted geo points',
    mimeTypes: ['application/json'],
    path: '/geoData',
    swaggerPath: '/geoData',
    method: Methods.post,
    bodySchemaName: 'postGeoDataSchema',
    dtoName: 'postGeoDataSchemaDTO',
    parameterLocation: ParameterLocation.body,
    bodyParser: true,
    service: postGeoData,
    bodySchema: postGeoDataSchema,
    outputSchema: postGeoDataSchemaDTO,
    auth: true,
  },
  {
    summary: 'Set encrypted hash for mobile user account',
    description: '',
    resultDescription: 'Result: geoId for additional control',
    mimeTypes: ['application/json'],
    path: '/password',
    swaggerPath: '/password',
    method: Methods.put,
    bodySchemaName: 'putPasswordSchema',
    dtoName: 'putPasswordSchemaDTO',
    parameterLocation: ParameterLocation.body,
    bodyParser: true,
    service: putPassword,
    bodySchema: putPasswordSchema,
    outputSchema: putPasswordSchemaDTO,
    auth: true,
  },
];

openApi.addRouter({ description: 'Mobile endpoints', basePath: '/api', endpoints });

const router = express.Router();
router.use(checkToken([], false));
const jsonBodyParser = express.json();
endpoints.forEach((endpoint) => {
  if (endpoint.bodyParser) {
    router[endpoint.method](endpoint.path, jsonBodyParser, inputValidator(endpoint));
  } else {
    router[endpoint.method](endpoint.path, inputValidator(endpoint));
  }
});
router.use(outputValidator(endpoints));
export default router;
