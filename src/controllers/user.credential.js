import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import express from 'express';
import UserCredentials from '../models/user/credential.model';
const router = express.Router();

router.post('/login', async (req, res) => {
  const providedUsername = req.body.username;
  const providedPassword = req.body.password;

  try {
    const user = await UserCredentials.findOne({ where: { username: providedUsername } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordCorrect = await bcrypt.compare(providedPassword, user.hashedPassword);

    if (isPasswordCorrect) {
      const token = jwt.sign({ userId: user.id }, 'your-secret-key-here', {
        expiresIn: '1h',
      });

      return res.status(200).json({ token });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
