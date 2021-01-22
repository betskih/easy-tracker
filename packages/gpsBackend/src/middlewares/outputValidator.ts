const outputValidator = (endpoints: any) => (req, res, next) => {
  const { path, method } = req.endpoint;
  const { response } = res;
  const { outputSchema } = endpoints.find((item) => item.path === path && item.method === method);
  const validation = outputSchema.validate(response.data);
  if (validation.error) {
    res.status(500).jsend.error('Error response validation');
  } else {
    switch (response.status) {
      case 200:
        res.jsend.success(response.data);
        break;
      case 201:
        res.status(201).jsend.success(response.data);
        break;
      case 404:
        res.status(404).jsend.error(response.message);
        break;
      case 403:
        res.status(403).jsend.error(response.message);
        break;
      case 500:
        res.status(500).jsend.error(response.message);
        break;
      default: next();
    }
  }
  next();
};

export default outputValidator;
