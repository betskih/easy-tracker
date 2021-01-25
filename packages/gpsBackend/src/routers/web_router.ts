import express from 'express';
import openApi from '../initSwagger';
import geoTrack from '../services/geoTrack';
import { EndpointDescription, Methods, ParameterLocation } from '../swagger/swagger';
import { getFirstDateSchemaDTO, postGeoTrackSchemaDTO } from '../models/outputTypes';
import inputValidator from '../middlewares/inputValidator';
import outputValidator from '../middlewares/outputValidator';
import { getFirstDateValidationSchema, postGeoTrackSchema } from '../models/TrackTypes';
import getFirstDate from '../services/getFirstDate';

const router = express.Router();

const jsonBodyParser = express.json();

const endpoints: EndpointDescription[] = [
  {
    summary: 'Fetch geo track by the geo Id',
    resultDescription: 'Result: an array of geo points',
    mimeTypes: ['application/json'],
    path: '/geotrack',
    swaggerPath: '/geotrack',
    method: Methods.POST,
    bodySchemaName: 'postGeoTrackSchema',
    dtoName: 'postGeoTrackSchemaDTO',
    parameterLocation: ParameterLocation.body,
    bodyParser: true,
    service: geoTrack,
    bodySchema: postGeoTrackSchema,
    outputSchema: postGeoTrackSchemaDTO,
    auth: false,
  },
  {
    summary: 'Fetch first Record Date by geoId',
    description: '',
    resultDescription: 'Result: geoId and first Record Date',
    mimeTypes: ['application/json'],
    path: '/firstdate/:geoid',
    swaggerPath: '/firstdate/{geoid}',
    paramName: 'geoid',
    paramType: 'string',
    method: Methods.GET,
    dtoName: 'getFirstDateSchemaDTO',
    parameterLocation: ParameterLocation.path,
    bodyParser: false,
    service: getFirstDate,
    pathSchema: getFirstDateValidationSchema,
    outputSchema: getFirstDateSchemaDTO,
    auth: false,
  },
];

openApi.addRouter({ description: 'Web endpoints', basePath: '/web', endpoints });

endpoints.forEach((endpoint) => {
  if (endpoint.bodyParser) {
    router[endpoint.method](endpoint.path, jsonBodyParser, inputValidator(endpoint));
  } else {
    router[endpoint.method](endpoint.path, inputValidator(endpoint));
  }
});
router.use(outputValidator(endpoints));

export default router;
