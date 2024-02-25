import jwt from 'jsonwebtoken';
import UserRole from '../models/user/user.role.model.js';
import Role_Enum from './role_enums.js';
const SECRET_KEY = 'MySecret@123';

export const validate = ((req, res, next) => {
  const token = req.header('auth_header');
  const decodedToken = jwt.verify(token, SECRET_KEY);

  if (!decodedToken) {
    res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    req.user = decodedToken.userdata;

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
});

export const IsAdmin = async (req, res, next) => {
  const user_id = req.user.id;
  const roles = await UserRole.findAll({ where: { user_id } });
  const hasRole = roles.some(item => item.role_id === Role_Enum.ADMIN);
  if (hasRole) {
    next();
  } else {
    return res.status(403).send("Access Denied");
  }
};

export default validate;