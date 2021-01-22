import { OpenApi } from './swagger/swagger';

// Bearer authorization
const openApi = new OpenApi({
  enableJSend: true,
  auth: {
    ApiKeyAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
    },
  },
});
export default openApi;
