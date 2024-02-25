import UserRole from '../models/user/user.role.model.js';


 const HasRole = async (req, res, next) => {
    const {user_id, role_id} = req.body;

    const roles = await UserRole.findAll({ where: { user_id } });
    const hasRole = roles.some(item => item.role_id === role_id);
    if (hasRole) {
        res.status(200).json(true);
    } else {
        res.status(200).json(false);
    }
  };
  export default HasRole;