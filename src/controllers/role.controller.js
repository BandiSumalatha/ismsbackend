import Role from "../models/user/role.model.js";
import Message from "../helpers/messages.js";
import Hospital from "../models/hospital/hospital.model.js";
import { isRoleHasReferences } from "../validations/validation.js";

const createRole = async (req, res) => {
  try {
    const roleData = req.body;
    const newRole = await Role.create(roleData);
    res.status(201).json(newRole);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: Message.ServerMessage.ERROR_MESSAGE });
  }
};

const getRoles = async (req, res) => {
  try {
    const roles = await Role.findAll({ include: Hospital });
    res.status(200).json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: Message.ServerMessage.ERROR_MESSAGE });
  }
};

const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const roleData = req.body;

    const role = await Role.findByPk(id);

    const updatedRole = await role.update(roleData);

    res.status(200).json(updatedRole);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: Message.ServerMessage.ERROR_MESSAGE });
  }
};

const deleteRole = async (req, res) => {
  try {
    const roleId = req.params.id;

    const referencesExist = await isRoleHasReferences(roleId)

    if (referencesExist) {
      return res.status(400).json({ error: Message.RoleMessage.REFERENCE_MESSAGE });
    }

    const role = await Role.findByPk(roleId);

    if (!role) {
      return res.status(404).json({ error: Message.RoleMessage.ID_NOTFOUND_MESSAGE });
    }

    const deletedRole = role.toJSON();
    await role.destroy();

    res.status(200).json({ message: Message.RoleMessage.DELETE_SUCCESS_MESSAGE, deletedRole });
  } catch (error) {
    res.status(500).json({ error: Message.ServerMessage.DELETE_ERROR_MESSAGE });
  }
};

const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id, {
      include: Hospital,
    });

    if (!role) {
      return res.status(404).json({ error: Message.NOT_FOUND_MESSAGE });
    }

    res.status(200).json(role);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: Message.SERVER_ERROR_MESSAGE });
  }
};


export default {
  createRole,
  getRoles,
  updateRole,
  deleteRole,
  getRoleById,
};