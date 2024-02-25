import Email from "../models/email/email.model.js";


const GetEmail=('/emails', async (req, res) => {
    try {
      const emails = await Email.findAll();
      res.status(200).json(emails);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  export default {GetEmail}