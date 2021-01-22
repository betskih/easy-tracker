import jwt from 'jsonwebtoken';

const refreshToken = async (req, res, next) => {
  const SECRET_KEY = process.env.SecretKey;
  const token = jwt.sign({ id: req.tokenId, type: 'base' }, SECRET_KEY, {
    expiresIn: process.env.tokenExpiresIn,
  });
  const refresh = jwt.sign({ id: req.tokenId, type: 'refresh' }, SECRET_KEY, {
    expiresIn: process.env.refreshTokenExpiresIn,
  });
  res.response = {
    status: 201,
    data: {
      id: req.tokenId,
      token,
      refreshToken: refresh,
    },
  };
  next();
};
export default refreshToken;
