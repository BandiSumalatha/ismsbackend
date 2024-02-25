import Role from "../models/user/role.model.js";
import User from "../models/user/user.model.js";
import UserRole from "../models/user/user.role.model.js";
import Imprest from "../models/imprest/imprest.model.js";
import Message from "../helpers/messages.js";

const createUserRole = async (req, res) => {
  try {
    const { role_id, user_id, imprest_id } = req.body;
    const existingUserRole = await UserRole.findOne({
      where: {
        user_id,
        imprest_id,
      },
    });

    if (existingUserRole) {
      return res.status(400).json({ error: "Duplicate user role not allowed." });
    }

    const newUserRole = await UserRole.create(
      {
        role_id,
        user_id,
        imprest_id,
      },
      {
        include: [
          {
            model: Role,
          },
          {
            model: User,
          },
          {
            model: Imprest,
          },
        ],
      }
    );

    return res.status(201).json(newUserRole);
  } catch (error) {
    console.error("Error creating user role:", error);
    return res.status(500).json({ error: Message.SERVER_ERROR_MESSAGE });
  }
};


const updateUserRole = async (req, res) => {
  try {
    const {
      role,
      user,
      imprest,
    } = req.body;
    const userRoleUpdate = await UserRole.findByPk(req.params.id);

    if (!userRoleUpdate) {
      return res.status(404).json({ error: Message.NOT_FOUND_MESSAGE });
    }

    userRoleUpdate.role_id = role;
    userRoleUpdate.user_id = user;
    userRoleUpdate.imprest_id = imprest;
    await userRoleUpdate.save();
    return res.status(200).json(userRoleUpdate);
  } catch (error) {
    console.error("Error updating user role:", error);
    return res.status(500).json({ error: Message.SERVER_ERROR_MESSAGE });
  }
};

const getAllUserRoles = async (req, res) => {
  try {
    const userRoles = await UserRole.findAll({
      include: [
        {
          model: Role,
        },
        {
          model: User,
        },
        {
          model: Imprest,
        },
      ],
    });

    return res.status(200).json(userRoles);
  } catch (error) {
    console.error("Error fetching user roles:", error);
    return res.status(500).json({ error: Message.SERVER_ERROR_MESSAGE });
  }
};

const getOneUserRole = async (req, res) => {
  try {
    const userRoleId = req.params.id;
    const userRole = await UserRole.findOne({
      where: { id: userRoleId },
      include: [
        {
          model: Role,
        },
        {
          model: User,
        },
        {
          model: Imprest,
        },
      ],
    });

    if (!userRole) {
      return res.status(404).json({ error: Message.NOT_FOUND_MESSAGE });
    }

    return res.status(200).json(userRole);
  } catch (error) {
    console.error("Error fetching user role:", error);
    return res.status(500).json({ error: Message.SERVER_ERROR_MESSAGE });
  }
};

const deleteUserRole = async (req, res) => {
  try {
    const roleId = req.params.id;
    const role = await UserRole.findByPk(roleId);
    if (!role) {
      return res.status(404).json({ error: Message.NOT_FOUND_MESSAGE });
    }

    await UserRole.destroy();

    res.status(204).send({ message: Message.DELETE_SUCCESS_MESSAGE });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: Message.SERVER_ERROR_MESSAGE });
  }
};

export default {
  createUserRole,
  updateUserRole,
  getAllUserRoles,
  getOneUserRole,
  deleteUserRole,
};