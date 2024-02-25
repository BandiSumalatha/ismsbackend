import Message from "../helpers/messages.js";
import UserModel from "../models/user/user.model.js";
import { isUserHasReferences } from "../validations/validation.js";
import { isValidEmail, isValidUsername } from "../validations/validation.js";
import UserCredentials from "../models/user/credential.model.js";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

const createUser = async (req, res) => {
  try {
    const userData = req.body;
    userData.active = true;

    if (!isValidEmail(userData.email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    const temporaryPassword = generateTemporaryPassword();
    const newUser = await UserModel.create(userData);
    const hashKey = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(temporaryPassword, hashKey);

    await UserCredentials.create({
      user_id: newUser.id,
      password: hashedPassword,
      hash_key: hashKey,
      locked: false,
    });

    const userCredentials = await UserCredentials.findOne({
      where: { user_id: newUser.id },
    });

    if (!userCredentials) {
      return res.status(404).json({ error: 'User credentials not found' });
    }

    console.log(newUser, 'newUser');
    sendEmail(
      newUser.user_name,
      userData.email,
      'Welcome to Imprest Stock Management',
      `Your username: ${newUser.user_name}\nYour password: ${temporaryPassword}`
    );

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: Message.ServerMessage.ERROR_MESSAGE });
  }
};


const sendEmail = (user_name, toEmail, subject, text) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: toEmail,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

function generateTemporaryPassword() {
  const temporaryPassword = Math.random().toString(36).substring(7);
  return temporaryPassword;
}


const getUser = async (req, res) => {
  try {
    const users = await UserModel.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: Message.ServerMessage.ERROR_MESSAGE });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = req.body;

    const user = await UserModel.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: Message.UserMessage.ID_NOTFOUND_MESSAGE });
    }

    const updatedUser = await user.update(userData);

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: Message.ServerMessage.ERROR_MESSAGE });
  }
};


const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const hasReferences = await isUserHasReferences(userId);
    if (hasReferences) {
      return res.status(400).json({ error: Message.UserMessage.REFERENCE_MESSAGE });
    }

    const user = await UserModel.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: Message.UserMessage.ID_NOTFOUND_MESSAGE });
    }
    await UserCredentials.destroy({
      where: { user_id: userId },
    });

    await user.destroy();
    res.status(204).send(Message.UserMessage.DELETE_SUCCESS_MESSAGE);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: Message.ServerMessage.DELETE_ERROR_MESSAGE });
  }
};



const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const User = await UserModel.findByPk(id);
    if (!User) {
      return res.status(404).json({ error: Message.UserMessage.ID_NOTFOUND_MESSAGE });
    }
    res.status(200).json(User);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: Message.ServerMessage.ERROR_MESSAGE });
  }
};

export default {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getUserById,
};