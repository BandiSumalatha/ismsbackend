import Hospital from "../models/hospital/hospital.model.js";
import Message from "../helpers/messages.js";

const getHospitals = async (req, res) => {
    try {
        const Hospitals = await Hospital.findAll({});
        res.status(200).json(Hospitals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: Message.SERVER_ERROR_MESSAGE });
    }
};

export default { getHospitals }; 