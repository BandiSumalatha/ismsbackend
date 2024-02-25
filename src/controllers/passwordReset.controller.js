import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import UserCredential from "../models/user/credential.model.js";
import User from "../models/user/user.model.js";
import nodemailer from "nodemailer";

const updatePassword = async (req, res) => {
    try {
        const { userId, currentPassword, newPassword } = req.body;
        const userCredential = await UserCredential.findOne({
            where: { user_id: userId },
        });
        if (!userCredential) {
            return res.status(404).json({ error: "User not found" });
        }
        const isCurrentPasswordCorrect = await bcrypt.compare(
            currentPassword,
            userCredential.password
        );

        if (!isCurrentPasswordCorrect) {
            return res.status(400).json({ error: "Current Password is Incorrect" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await userCredential.update({ password: hashedPassword, hash_key: salt });

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_SECURE === "true",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
        const user = await User.findOne({ where: { id: userId } });

        const mailOptions = {
            from: process.env.SMTP_FROM,
            to: user.email,
            subject: "Password Updated",
            html: `
        <H3>Your password has been successfully updated.</H3>
        <p>Logout and Relogin.</p>
        <p>Best regards,<br>Ramesh Ayyala</p>
      `,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error(error);

        res.status(500).json({ error: "Server error" });
    }
};

export default { updatePassword };
