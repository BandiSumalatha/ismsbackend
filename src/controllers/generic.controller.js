import GenericName from "../models/generic_name/generic.name.model.js";
import Message from "../helpers/messages.js";
import Hospital from "../models/hospital/hospital.model.js";
const getGenericNames = async (req, res) => {
    try {
        const genericNames = await GenericName.findAll({
            include: Hospital
        });
        res.status(200).json(genericNames);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: Message.SERVER_ERROR_MESSAGE });
    }
};

export default {
    getGenericNames,
};