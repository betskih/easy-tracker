import jwt from 'jsonwebtoken';

const refreshToken = async (req, res) => {
  const SECRET_KEY = process.env.SecretKey;
  const token = jwt.sign({ id: req.tokenId, type: 'base' }, SECRET_KEY, {
    expiresIn: process.env.tokenExpiresIn,
  });
  const refresh = jwt.sign({ id: req.tokenId, type: 'refresh' }, SECRET_KEY, {
    expiresIn: process.env.refreshTokenExpiresIn,
  });
  res.status(201).jsend.success({
    id: req.tokenId,
    token,
    refreshToken: refresh,
  });
};
export default refreshToken;
