import UnitOfMeasure from "../models/unit_of_measure/unitof.measure.model.js";
import Message from "../helpers/messages.js";
const getUom = async (req, res) => {
    try {
        const UomList = await UnitOfMeasure.findAll({});
        res.json(UomList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: Message.SERVER_ERROR_MESSAGE });
    }
};

export default { getUom };