import jwt from 'jsonwebtoken';
const secret = 'ASdg84SDF58fds878F6sdfsdf564df45FDS';

export default function checkTonken (req, res, next) {
  const authHeader = req.header('x-access-token');
  const token = authHeader;
  // const token = authHeader && authHeader.split(' ')[1];

  if(!token) {
    return res.status(401).json({message: 'Access denied'});
  };

  try {
    jwt.verify(token, secret);
    next();

  } catch(err) {
    res.status(400).send({message: 'Token invalid'});
  };
};
