import { logger } from './middlewares';

const errorMessage = (message, path, params) => {
  logger.log({
    level: 'error',
    message,
    label: path,
    params: JSON.stringify(params),
  });
};

const inputValidator = (endpoint: any) => (req, res, next) => {
  const queryValidation = (endpoint.pathSchema && endpoint.pathSchema.validate(req.params)) || {};
  if (queryValidation.error) {
    errorMessage(queryValidation.error.message, req.path, req.params);
    res.status(400).jsend.error({
      message: queryValidation.error.message,
    });
    return;
  }

  const bodyValidation = (endpoint.bodySchema && endpoint.bodySchema.validate(req.body)) || {};

  if (bodyValidation.error) {
    errorMessage(bodyValidation.error.message, req.path, req.body);
    res.status(400).jsend.error({
      message: bodyValidation.error.message,
    });
    return;
  }
  req.endpoint = { path: endpoint.path, method: endpoint.method };
  endpoint.service(req, res, next);
};
export default inputValidator;
