import { forEach, get, set } from 'lodash';
import { toJson } from 'json-joi-converter';
import Joi, { JoiObject } from 'joi';
import packageJson from '../../package.json';

export enum Methods {
  get = 'get',
  post = 'post',
  put = 'put',
}

export enum ParameterLocation {
  query = 'query',
  header = 'header',
  path = 'path',
  formData = 'formData',
  body = 'body',
}

export type EndpointDescription = {
    summary: string;
    description?: string;
    resultDescription?: string;
    mimeTypes?: string[],
    path: string;
    swaggerPath: string;
    paramName?: string;
    paramType?: 'string' | 'number' | 'boolean';
    method: Methods,
    dtoName: string;
    bodySchemaName?: string;
    parameterLocation: ParameterLocation;
    bodyParser: boolean;
    service: (req: any, res:any, next:any)=>void;
    pathSchema?: JoiObject;
    bodySchema?: JoiObject;
    outputSchema: JoiObject;
    auth: boolean;
};

const apiDoc = {
  swagger: '2.0',
  basePath: '/',
  info: {
    title: packageJson.title,
    version: packageJson.version,
  },
  security: { 'Access token': [] },
  schemes: 'http',
  tags: [],
  definitions: {},
  paths: {},
  securityDefinitions: {},
};

export class OpenApi {
  private apiDoc: any;

  private enableJSend: boolean;

  constructor({ enableJSend, auth }) {
    this.apiDoc = apiDoc;
    this.enableJSend = enableJSend;
    this.apiDoc.securityDefinitions = auth;
    this.apiDoc.security = { ApiKeyAuth: [] };
  }

  getApiDoc() {
    return this.apiDoc;
  }

  addRouter({
    basePath,
    description,
    endpoints,
  }: {
    basePath: string;
    description: string;
    endpoints: any;
  }) {
    this.apiDoc.tags.push({ name: basePath, description });
    forEach(endpoints, (endpoint) => {
      const security = endpoint.auth ? { security: [{ ApiKeyAuth: [] }] } : { security: [] };
      let params;
      switch (endpoint.parameterLocation) {
        case 'path':
          params = endpoint.paramName ? {
            name: endpoint.paramName,
            required: true,
            type: endpoint.paramType,
          } : { required: false };
          break;
        case 'body':
          params = {
            name: 'body',
            required: true,
            schema: { $ref: `#/definitions/${endpoint.bodySchemaName}` },
          };
          break;
        default:
          params = { required: false };
      }
      const schema = this.enableJSend
        ? toJson(
          Joi.object().keys({
            status: Joi.string().required(),
            message: Joi.string(),
            data: endpoint.outputSchema,
          }),
        )
        : toJson(endpoint.outputSchema);

      if (this.enableJSend) {
        set(schema, 'properties.data', {
          $ref: `#/definitions/${endpoint.dtoName}`,
          ...get(schema, 'properties.data'),
        });
      }

      const pathSchema = {
        tags: [basePath],
        summary: endpoint.summary,
        description: endpoint.description || '',
        produces: endpoint.mimeTypes || ['application/json'],
        parameters: [{ ...params, in: endpoint.parameterLocation }],
        responses: {
          200: {
            description: endpoint.resultDescription || '',
            schema,
          },
        },
        ...security,
      };
      set(this.apiDoc, ['paths', `${basePath}${endpoint.swaggerPath}`], {
        [endpoint.method]: pathSchema,
      });
      set(this.apiDoc, `definitions.${endpoint.dtoName}`, toJson(endpoint.outputSchema));
      if (endpoint.bodySchema) {
        set(this.apiDoc, `definitions.${endpoint.bodySchemaName}`, toJson(endpoint.bodySchema));
      }
    });
  }
}
